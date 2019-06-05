import { 
  AnimationTriggerMetadata, 
  trigger, 
  state, 
  style, 
  animate, 
  keyframes,
  transition 
} from '@angular/animations'
// actionsheet 
export const ActionsheetAnimation: AnimationTriggerMetadata = trigger(
'ActionsheetAnimation', [
  state('false', style({
    opacity: 0,
    transform: 'translate(0, 100%)'
  })),
  state('true', style({
    opacity: 1,
    transform: 'translate(0, 0)'
  })),
  transition('false => true', animate('0ms', keyframes([
    style({
      transform: 'translate(0, 100%)',
      offset: 0
    }),
    style({
      transform: 'translate(0, 0)',
      offset: 1.0
    })
  ]))),
  transition('true => false', animate('200ms', keyframes([
    style({ 
      transform: 'translate(0, 0)',
      offset: 0
    }),
    style({
      transform: 'translate(0, 100%)',
      offset: 1.0
    })
  ]))),
])

export const ActionsheetMaskAnimation: AnimationTriggerMetadata = trigger(
'ActionsheetMaskAnimation', [
  state('*', style({
    opacity: 0,
    display: 'none'
  })),
  state('false', style({
    opacity: 0,
    display: 'none'
  })),
  state('true', style({
    opacity: 1,
    display: 'block'
  })),
  transition('* <=> *', animate(`300ms ease-out`))
])

// popup动画
export const PopupAnimation: AnimationTriggerMetadata = trigger(
'PopupAnimation', [
  state('false', style({
    opacity: 0,
    display: 'none',
    transform: 'translate3d(0, 100%, 0)'
  })),
  state('true', style({
    opacity: 1,
    display: 'block',
    transform: 'translate3d(0, 0, 0)'
  })),
  transition('false => true', animate('300ms ease-in', keyframes([
    style({
      transform: 'translate3d(0, 100%, 0)',
      display: 'none',
      offset: 0
    }),
    style({
      transform: 'translate3d(0, 0, 0)',
      display: 'block',
      offset: 1.0
    })
  ]))),
  transition('true => false', animate('300ms ease-out', keyframes([
    style({ 
      transform: 'translate3d(0, 0, 0)',
      display: 'block',
      offset: 0
    }),
    style({
      transform: 'translate3d(0, 100%, 0)',
      display: 'none',
      offset: 1.0
    })
  ]))),
])

// 弹窗内容 使用关键帧动画
export const DialogAnimation: AnimationTriggerMetadata = trigger(
'DialogAnimation', [
  state('false', style({
    opacity: 0,
    display: 'none',
    transform: 'scale(1.185)'
  })),
  state('true', style({
    opacity: 1,
    display: 'table',
    transform: 'scale(1)'
  })),
  transition('false => true', animate('500ms', keyframes([
    style({
      transform: 'scale(1.185)',
      opacity: 0,
      display: 'none',
      offset: 0
    }),
    style({
      transform: 'scale(1)',
      opacity: 1,
      display: 'table',
      offset: 1.0
    })
  ]))),
  transition('true => false', animate('300ms', keyframes([
    style({ 
      transform: 'scale(1)',
      opacity: 1,
      display: 'table',
      offset: 0
    }),
    style({
      transform: 'scale(0.85)',
      opacity: 0,
      display: 'none',
      offset: 1.0
    })
  ]))),
])
// 背景部分
export const MaskAnimation: AnimationTriggerMetadata = trigger(
'MaskAnimation', [
  state('*', style({
    opacity: 0,
    display: 'none'
  })),
  state('false', style({
    opacity: 0,
    display: 'none'
  })),
  state('true', style({
    opacity: 1,
    display: 'block'
  })),
  transition('* <=> *', animate(`300ms ease-out`)),
])