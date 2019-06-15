import { ComponentProps } from '@src/core';

export interface pullDownRefreshThresholdProps {
  threshold: number
  stop: number
}

export interface PullUpLoadConfigProps {
  threshold: number
}

export interface BounceProps {
  top: boolean
  bottom: boolean
  left: boolean
  right: boolean
}

export interface ScrollState {
  pullDownStyle: string
  beforePullDown: boolean
  isPullingDown: boolean
  pullUpDirty: boolean
  isPullUpLoad: boolean
  isTouchEnd: boolean
  scrollY: number
  scrollWrapperHeight: number
  pullDownStyleHeight: number
  pullDownInitTop: number
  isRebounding: boolean
  upLoadThreshold: number
  downRefreshThreshold: number
  downRefreshStop: number
  downInitTopConfig: number
}
export interface posProps {
  y: number
  x: number
  directionY: number
}
export interface ScrollComponentProps extends ComponentProps {
  wrapper?: string
  disabled?: boolean
  data?: any
  probeType?: number
  direction?: string
  pullDownRefreshAnimation?: string
  pullDownRefreshThreshold?: number
  pullDownRefreshStop?: number
  pullDownRefreshStopTime?: number
  pullUpLoadType?: string
  pullUpLoadThreshold?: number
  startY?: number
  refreshDelay?: number
  bounce?: Object
  pullDownInitTopConfig?: number
  isClick?: boolean
  isDblclick?: boolean
  isListenScrollStart?: boolean
  isListenScroll?: boolean
  isListenBeforeScroll?: boolean
  isListenScrollEnd?: boolean
  isZoom?: boolean
  isStopPropagation?: boolean
  isUseTransition?: boolean
  isFreeScroll?: boolean
  isMouseWheel?: boolean
  isPullUpLoadRefresh?: boolean
  isPullUpLoadScroll?: boolean
  isScrollbar?: boolean
  isPullDownRefresh?: boolean

  inlineDescSlot?: any
  isPullUpLoadRefreshSlot?: any,
  beforeTriggerSlot?: any
  afterTriggerSlot?: any
};
