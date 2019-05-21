/**
 * vue-hoc 高阶函数
 */
import Vue from 'vue';
import { isFunction, isArray, isObject, extend } from './tools';
const CURRIED = '@@VUE_HOC/CURRIED';
const defaultStrategy = (parent, child) => child;
const hocComponent = (Component, options, renderOptions) => {
  const target = getComponentOptions(Component);

  const hoc = {
    props: getProps(target),
    mixins: [],
    name: `${target.name || 'Anonymous'}`,
    render: createRenderFnc(renderOptions),
  };

  if (options){
    // merge options into the hoc
    // we piggyback off Vue's optionMergeStrategies so we get the same
    // merging behavior as with mixins
    Object.keys(options).forEach((key) => {
      let child = options && options[key];
      const parent = hoc[key];
      const strategy = Vue.config.optionMergeStrategies[key] || defaultStrategy;

      // props are unique as we have a specific normaliser
      if (key === 'props') {
        child = getProps(options);
      }

      hoc[key] = strategy(parent, child);
    });
  }

  hoc.mixins && hoc.mixins.push({
    created(){
      this.$createElement = this.$vnode.context.$createElement;
      this._c = this.$vnode.context._c;
    }
  });

  if (hoc.render && hoc.render[CURRIED]){ 
    hoc.render = hoc.render(Component);
  }
  return hoc;
}; 
/*   getProps start     */
const normalize = (props) => {
  if (!props) {
    return {};
  }
  if (isArray(props)) {
    const result = {};
    props.forEach((key) => {
      if (typeof key === 'string') {
        result[key] = {};
      }
    });
    return result;
  }
  return extend({}, props);
};

const mergeMixinProps = (mixins, initial = {}) => {
  if (!mixins || !mixins.length) {
    return initial;
  }

  return mixins.reduce((result, mixin) => {
    const props = extend(
      {},
      mergeMixinProps(mixin.mixins, result),
      normalize(mixin.props),
    );

    return extend({}, result, props);
  }, initial);
};

const getProps = (Component) => {
  const options = getComponentOptions(Component);
  const props = normalize(options.props);
  const mixinProps = mergeMixinProps(options.mixins);
  return extend({}, mixinProps, props);
};
/*   getProps end     */
/* getComponentOptions start  */
const getComponentOptions = (Component) => (isFunction(Component)) ? Component.options : Component;
/* getComponentOptions end  */

/* normalizeSlots start */
    
const normalizeSlots = (slots, context) => Object.keys(slots)
  .reduce((arr, key) => {
    slots[key].forEach((vnode) => {
      if (!vnode.context) {
        slots[key].context = context;
      }
      if (!vnode.data) {
        vnode.data = {};
      }
      vnode.data.slot = key;
    });
    return arr.concat(slots[key]);
  }, []);

/* normalizeSlots end */

/* createRenderFn start */

const justBindOptions = [
  'listeners',
  'nativeOn',
  'scopedSlots',
];

const justBindFn = (key) => justBindOptions.indexOf(key) > -1;

// ensures the keys always contain listeners/props/attrs
const getOptionsKeys = (options) => Object
  .keys(options)
  .concat(['listeners', 'props', 'attrs'])
  .filter((option, i, arr) => arr.indexOf(option) === i);

// for every option, we want to have a factory function that returns
// the actual result
const createOptionHandlers = (originalOptions, keys) => {
  const options = {};

  keys.forEach((key) => {
    const option = originalOptions[key];

    // if option is not provided, default to returning the initial value
    if (!option){
      options[key] = (owner) => owner;
      return;
    }

    // option is a factory function
    if (isFunction(option)){
      options[key] = option;
      return;
    }

    // option is an object, we need to handle each property directly
    if (isObject(option)){
      const optionKeys = Object.keys(option);
      const hasFactories = optionKeys.some((key) => isFunction(option[key]));

      // no factory functions, just merge the parent/child property
      if (!hasFactories){
        options[key] = (owner) => extend({}, owner, option);
        return;
      }

      options[key] = function(owner) {
        const result = extend({}, owner);
        const justBind = justBindFn(key);

        optionKeys.forEach((key) => {
          let value = option && option[key];

          if (isFunction(value)){
            // some properties expect functions
            if (justBind){
              value = value.bind(this);
            // for everything else, invoke the function to get the value
            }else{
              value = value.call(this, owner);
            }
          }
          result[key] = value;
        });
        return result;
      };
      return;
    }

    // for anything else, just return the option value
    options[key] = () => option;
  });

  return options;
};

// prepares the options so during render, we can quickly process them
const preprocessOptions = (originalOptions) => {
  const keys = getOptionsKeys(originalOptions);
  const options = createOptionHandlers(originalOptions, keys);

  return (context, isFunctional) => {
    const result = {
      on: {},
      props: {},
      attrs: {},
    };

    keys.forEach((key) => {
      // get this component's value
      const owner = isFunctional ?
        context[key] || context.data[key] :
        context[`$${key}`];

      // call the option handler
      const value = options[key].call(context, owner);

      // listeners has to be awkward and be renamed to on
      if (key === 'listeners'){
        key = 'on';
      }

      result[key] = value;
    });

    return result;
  };
};

// any unknown props need to be passed through as attrs
const getUnusedProps = (Component, props) => {
  const result = {};
  const target = getProps(Component);

  Object.keys(props).forEach((prop) => {
    if (target[prop] === undefined) {
      result[prop] = props[prop];
    }
  });

  return result;
};

const statelessRenderFn = (Component, getData, h, context) => {
  const data = getData(context, true);
  const scopedSlots = context.data.scopedSlots;
  const slots = context.children || [];
  const unusedProps = getUnusedProps(Component, data.props);

  data.scopedSlots = data.scopedSlots || scopedSlots;
  data.attrs = extend({}, unusedProps, data.attrs);

  return h(Component, data, slots);
};
const statefulRenderFn = (Component, getData, h, context) => {
  const data = getData(context, false);
  const scopedSlots = context.$scopedSlots;
  const slots = normalizeSlots(context.$slots, context.$vnode.context) || [];
  const unusedProps = getUnusedProps(Component, data.props);

  data.scopedSlots = data.scopedSlots || scopedSlots;
  data.attrs = extend({}, unusedProps, data.attrs);

  return h(Component, data, slots);
};

export const createRenderFn = (Component, options) => {
  const getData = preprocessOptions(options || {});
  return function renderHoc(h, context) {
    return context ?
      statelessRenderFn(Component, getData, h, context) :
      statefulRenderFn(Component, getData, h, this);
  };
};
export const createRenderFnc = (options) => {
  const curried = (Component) => createRenderFn(Component, options); 
  curried[CURRIED] = true; 
  return curried;
};
/* createRenderFn end */
export default hocComponent;