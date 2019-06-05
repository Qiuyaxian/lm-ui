import {
  Input,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'lm-slot',
  templateUrl: './slot.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmSlot {
  // props
  @Input() name: string
  @Input() scope: any 
}