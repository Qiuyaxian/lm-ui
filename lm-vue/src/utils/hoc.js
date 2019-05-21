/**
 * vue hoc 高阶函数
 */
export default (options) => { 
  let hoc = {
    props: { },
    name: 'page-div',
    render (createElement) {  
      let slots = Object.keys(this.$slots).reduce((arr, key) => arr.concat(this.$slots[key]), []).map(vnode => {
          vnode.context = this._self;
          return vnode;
        }); 
      return createElement('div', { 
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
        attrs: this.$attrs,
        props: this.$props
      }, slots); 
    }
  };
  for(let key in options){
    if(key === 'render'){
      hoc.render = function (h) {
        let slots = Object.keys(this.$slots).reduce((arr, key) => arr.concat(this.$slots[key]), []).map(vnode => {
            vnode.context = this._self;
            return vnode;
          });  
        let data = { 
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
          attrs: this.$attrs,
          props: this.$props
        };    
        return options['components'] ?
        options['render'](options['components'], data, slots, h, this) :
        h('div', { 
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
          attrs: this.$attrs,
          props: this.$props
        }, slots);
      }
    }else{
      hoc[key] = options[key];
    }
  } 
  return hoc;
};