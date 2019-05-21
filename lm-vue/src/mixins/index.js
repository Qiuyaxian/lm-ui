import { mapState, mapActions } from 'vuex'
import { loading, Router, getUUID, hasClass, removeClass, addClass, querySelector } from '@/utils'
/**
 * [broadcast 广播函数]
 * @param  {[type]} componentName [description]
 * @param  {[type]} eventName     [description]
 * @param  {[type]} params        [description]
 * @return {[type]}               [description]
 */
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export const uuidMixin = {
  created () {
    this.uuid = getUUID()
  }
}
/**
 * [dispatchMixin 触发函数]
 * @type {Object}
 */
export const dispatchMixin = {
  methods: {
    dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};

/**
 * [commom 共有]
 * @type {Object}
 */
export const commomMixin = {
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path
    })
  }
};
/**
 * [order 订单管理]
 * @type {Object}
 */
export const orderMixin = {
  computed: {
    ...mapState({
      order: state => state.order.order
    })
  },
  methods: {
    ...mapActions('order', {
      'updataOrder': 'updata'
    })
  }
};
export const browseMixin = {
  computed: {
    ...mapState({
      browse: state => state.browse.browse
    })
  },
  methods: {
    ...mapActions('browse', {
      'updataBrowse': 'updataBrowse'
    })
  }
}

/**
 * [memberOrder 个人中心订单]
 * @type {Object}
 */
export const memberOrderMixin = {
  computed: {
    ...mapState({
      order: state => state.member.order
    })
  },
  methods: {
    /**
     * 更新vuex中的订单数据
     */
    ...mapActions('member', {
      'updataOrder': 'updataOrder'
    })
  }
}

export const loadingStateMixin = {
  data () {
    return {
      loadingState: false
    }
  },
  computed: {
    ...mapState({
      sysMessage: state => state.sys.sysMessage,
      sys: state => state.sys.sysMessage
    })
  },
  methods: {
    /**
     * 更新vuex中的loadingState数据
     */
    ...mapActions('sys', {
      'updateSysMessage': 'updateSysMessage'
    }),
    updataLoadingState (val) {
      this.loadingState = val
    }
  },
  watch: {
    'loadingState': {
      handler (val) {
        if (!val) {
          loading.show('加载中...')
        } else {
          loading.hide()
        }
      },
      immediate: true
    }
  }
}
/**
 * [payMixin 订单支付]
 * @type {Object}
 */
export const payMixin = {
  computed: {
    ...mapState({
      payInfo: state => state.pay.payInfo
    })
  },
  methods: {
    /**
     * 更新vuex中的支付信息
     */
    ...mapActions('pay', {
      'updatePayInfo': 'updatePayInfo'
    })
  }
}

/*  -------------- */
export const parentMixin = {
  mounted () {
    this.$nextTick(() => {
      if (this.value >= 0) {
        this.currentIndex = this.value
      }
      this.updateIndex()
    })
  },
  methods: {
    /**
     * [updateIndex 更新索引值]
     * @return {[type]} [description]
     */
    updateIndex () {
      if (!this.$children || !this.$children.length) return;
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].currentIndex = i
        if (children[i].currentSelected) {
          this.index = i
        }
      }
    }
  },
  props: {
    value: Number
  },
  watch: {
    currentIndex (val, oldVal) {
      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false)
      val > -1 && this.$children[val] && (this.$children[val].currentSelected = true)
      this.$emit('input', val)
      this.$emit('on-index-change', val, oldVal)
    },
    index (val) {
      this.currentIndex = val
    },
    value (val) {
      this.index = val
    }
  },
  data () {
    return {
      index: -1,
      currentIndex: this.index,
      number: this.$children.length
    }
  }
}

export const childMixin = {
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$parent.updateIndex()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  methods: {
    /**
     * [onItemClick 子项绑定click事件]
     * @param  {Boolean} hasLink [description]
     * @return {[type]}          [description]
     */
    onItemClick (hasLink) {
      if (this.$parent.preventDefault) {
        this.$parent.$emit('on-before-index-change', this.currentIndex)
        return
      }
      if (typeof this.disabled === 'undefined' || this.disabled === false) {
        this.currentSelected = true
        this.$parent.currentIndex = this.currentIndex
        this.$nextTick(() => {
          this.$emit('on-item-click', this.currentIndex)
        })
      }
      if (hasLink === true) {
        Router.go(this.link, this.$router)
      }
    }
  },
  watch: {
    /**
     * [currentSelected 更新父组件的索引]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    currentSelected (val) {
      if (val) {
        this.$parent.index = this.currentIndex
      }
    },
    /**
     * [selected 更新当前组件的索引]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    selected (val) {
      this.currentSelected = val
    }
  },
  data () {
    return {
      currentIndex: -1,
      currentSelected: this.selected
    }
  }
}

const BODY_CLASS_NAME = 'page-modal-open'
const CONTAINER_CLASS_NAME = 'page-modal-open-for-container'
const VUP_VIEW_BOX_ELEMENT = '#page-template'

export const preventBodyScrollMixin = {
  methods: {
    // some plugin may be imported before configPlugin, so we cannot get gloal config when component is created
    getLayout () {
      if (typeof window !== 'undefined') {
        if (window.VUP_CONFIG && window.VUP_CONFIG.$layout === 'VIEW_BOX') {
          return 'VIEW_BOX'
        }
      }
      return ''
    },
    addModalClassName () {
      if (typeof this.shouldPreventScroll === 'function' && this.shouldPreventScroll()) {
        return
      }
      if (this.getLayout() === 'VIEW_BOX') {
        addClass(document.body, BODY_CLASS_NAME)
        addClass(querySelector(VUP_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME)
      }
    },
    removeModalClassName () {
      if (this.getLayout() === 'VIEW_BOX') {
        removeClass(document.body, BODY_CLASS_NAME)
        removeClass(querySelector(VUP_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME)
      }
    }
  },
  beforeDestroy () {
    this.removeModalClassName()
  },
  deactivated () {
    this.removeModalClassName()
  }
}

export const safariFixMixin = {
  mounted () {
    this.$overflowScrollingList = document.querySelectorAll('.vup-fix-safari-overflow-scrolling')
  },
  methods: {
    fixSafariOverflowScrolling (type) {
      if (!this.$overflowScrollingList.length) return
      // if (!/iphone/i.test(navigator.userAgent)) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    }
  }
}
