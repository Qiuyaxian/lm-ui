/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import requestAnimationFrame from 'raf';
import { ComponentProps } from '../props'
declare let window: any

interface TransitionProps extends ComponentProps {
  name: string;
  onEnter?: Function;
  onAfterEnter?: Function;
  onLeave?: Function;
  onAfterLeave?: Function;
};

export class Transition extends React.Component<TransitionProps, any> {
  public el: any;
  public timeout: any;
  constructor(props) {

    super(props);

    const { children } = props;

    this.state = {
      children: children && this.enhanceChildren(children)
    }

    this.didEnter = this.didEnter.bind(this);
    this.didLeave = this.didLeave.bind(this);
  }

  componentWillReceiveProps(nextProps: TransitionProps) {
    const children: React.ReactElement<any> = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const nextChildren: React.ReactElement<any> = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children);

    if (!nextProps.name) {
      this.setState({
        children: nextChildren
      });
      return;
    }

    if (this.isViewComponent(nextChildren)) {
      this.setState({
        children: this.enhanceChildren(nextChildren, { show: children ? (children.props as any).show : true } as any)
      })
    } else {
      if (nextChildren) {
        this.setState({
          children: this.enhanceChildren(nextChildren)
        })
      }
    }
  }

  componentDidUpdate(preProps: TransitionProps): any {
    if (!this.props.name) return;
    const children: React.ReactElement<any> = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const preChildren: React.ReactElement<any> = React.isValidElement(preProps.children) && React.Children.only(preProps.children);
    if (this.isViewComponent(children)) {
      if ((!preChildren || !preChildren.props.show) && children.props.show) {
        this.toggleVisible();
      } else if (preChildren && preChildren.props.show && !children.props.show) {
        this.toggleHidden();
      }
    } else {
      if (!preChildren && children) {
        this.toggleVisible();
      } else if (preChildren && !children) {
        this.toggleHidden();
      }
    }
  }

  private enhanceChildren(children: React.ReactElement<any>, props?: any): any {
    return React.cloneElement(children,
      Object.assign({
        ref: (el) => {
          this.el = el
        }
      }, props))
  }

  get transitionClass() {
    const { name } = this.props;
    return {
      enter: `${name}-enter`,
      enterActive: `${name}-enter-active`,
      enterTo: `${name}-enter-to`,
      leave: `${name}-leave`,
      leaveActive: `${name}-leave-active`,
      leaveTo: `${name}-leave-to`,
    }
  }

  private isViewComponent(element: any): boolean {
    return element && element.type._typeName === 'View';
  }

  /* css animation fix when animation applyied to .{action} instanceof .{action}-active */

  private animateElement(element: any, action: string, active: string, fn: Function) {
    element.classList.add(active);

    const styles = getComputedStyle(element);
    const duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);

    element.classList.add(action);

    if (duration === 0) {
      const styles = getComputedStyle(element);
      const duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        fn();
      }, duration * 1000)
    }

    element.classList.remove(action, active);
  }

  private didEnter(e: TransitionEvent): any {

    const childDOM: any = ReactDOM.findDOMNode(this.el);

    if (!e || e.target !== childDOM) return;

    const { onAfterEnter } = this.props;
    const { enterActive, enterTo } = this.transitionClass;

    (childDOM.classList as any).remove(enterActive, enterTo);

    childDOM.removeEventListener('transitionend', this.didEnter);
    childDOM.removeEventListener('animationend', this.didEnter);

    onAfterEnter && onAfterEnter();
  }

  private didLeave(e: TransitionEvent): any {
    const childDOM: any = ReactDOM.findDOMNode(this.el);

    if (!e || e.target !== childDOM) return;

    const { onAfterLeave, children } = this.props;
    const { leaveActive, leaveTo } = this.transitionClass;

    new Promise((resolve) => {
      if (this.isViewComponent(children)) {
        childDOM.removeEventListener('transitionend', this.didLeave);
        childDOM.removeEventListener('animationend', this.didLeave);

        requestAnimationFrame(() => {
          childDOM.style.display = 'none';
          childDOM.classList.remove(leaveActive, leaveTo);
          requestAnimationFrame(resolve);
        })
      } else {
        this.setState({ children: null }, resolve);
      }
    }).then(() => {
      onAfterLeave && onAfterLeave()
    })
  }

  private toggleVisible(): any {
    const { onEnter } = this.props;
    const { enter, enterActive, enterTo, leaveActive, leaveTo } = this.transitionClass;
    const childDOM: any = ReactDOM.findDOMNode(this.el);

    if (!childDOM) return;

    childDOM.addEventListener('transitionend', this.didEnter);
    childDOM.addEventListener('animationend', this.didEnter);

    // this.animateElement(childDOM, enter, enterActive, this.didEnter);

    requestAnimationFrame(() => {
      // when hidden transition not end
      let classList: any = childDOM.classList;
      if (classList.contains(leaveActive)) {
        classList.remove(leaveActive, leaveTo);

        childDOM.removeEventListener('transitionend', this.didLeave);
        childDOM.removeEventListener('animationend', this.didLeave);
      }

      childDOM.style.display = '';
      classList.add(enter, enterActive);

      onEnter && onEnter();

      requestAnimationFrame(() => {
        classList.remove(enter);
        classList.add(enterTo);
      })
    })
  }

  private toggleHidden(): any {
    const { onLeave } = this.props;
    const { leave, leaveActive, leaveTo, enterActive, enterTo } = this.transitionClass;
    const childDOM: any = ReactDOM.findDOMNode(this.el);
    if (!childDOM) return;
    childDOM.addEventListener('transitionend', this.didLeave);
    childDOM.addEventListener('animationend', this.didLeave);

    // this.animateElement(childDOM, leave, leaveActive, this.didLeave);

    requestAnimationFrame(() => {
      // when enter transition not end
      let classList: any = childDOM.classList;
      if (classList.contains(enterActive)) {
        classList.remove(enterActive, enterTo);

        childDOM.removeEventListener('transitionend', this.didEnter);
        childDOM.removeEventListener('animationend', this.didEnter);
      }

      classList.add(leave, leaveActive);

      onLeave && onLeave();

      requestAnimationFrame(() => {
        classList.remove(leave);
        classList.add(leaveTo);
      })
    })
  }

  render() {
    return this.state.children || null;
  }
}
