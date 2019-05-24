const ColorDirective = {
  // inserted (el, node) {
  //   if (node.value) {
  //     el.style.backgroundColor = node.value.backgroundColor;
  //     el.style.color = node.value.color;
  //   }
  //   if (node.modifiers.color) {
  //     el.style.color = node.value;
  //   }
  //   if (node.modifiers.backgroundColor) {
  //     el.style.backgroundColor = node.value;
  //   }
  // }
  bind () {
    // 当指令绑定到 HTML 元素上时触发.**只调用一次**
    console.log('bind triggerd');
  },
  inserted (el, bind) {
    // 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 `div#app`)**.但不保证,父元素已经插入了 DOM 文档.**
    console.log('inserted triggerd');
    let { value, modifiers } = bind;
    if (modifiers.color) {
      el.style.color = value;
    }
    if (modifiers.backgroundColor) {
      el.style.backgroundColor = value;
    }
  },
  updated () {
    // 所在组件的`VNode`更新时调用.
    console.log('updated triggerd');
  },
  componentUpdated () {
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    console.log('componentUpdated triggerd');
  },
  unbind () {
    // 只调用一次，指令与元素解绑时调用.
    console.log('unbind triggerd');
  }
};

export default ColorDirective;
