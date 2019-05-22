import Vue from 'vue'

/** ElementUI component common definition */
export declare class VupComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type VupComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type VupHorizontalAlignment = 'left' | 'center' | 'right'
