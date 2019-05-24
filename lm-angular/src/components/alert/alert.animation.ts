import { 
  AnimationTriggerMetadata, 
  trigger, 
  state, 
  style, 
  animate, 
  transition 
} from '@angular/animations'

// 弹窗内容
export const DialogAnimation: AnimationTriggerMetadata = trigger(
'DialogAnimation', [
  state('*', style({
    opacity: 0,
    display: 'none',
    transform: 'scale(1)'
  })),
  state('false', style({
    opacity: 0,
    display: 'none',
    transform: 'scale(0.85)'
  })),
  state('true', style({
    opacity: 1,
    display: 'block',
    transform: 'scale(1.185)'
  })),
  transition('* <=> *', animate(`200ms linear`)),
])

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