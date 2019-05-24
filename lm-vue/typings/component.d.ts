import Vue from 'vue'

/** ElementUI component common definition */
export declare class LmComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type LmComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type LmHorizontalAlignment = 'left' | 'center' | 'right'
