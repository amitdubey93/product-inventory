import {
  Directive,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';
@Directive({
  selector: '[focusedRow]',
})
export class RowDirective implements OnInit {
  ngOnInit() {
    // Focus on the first Form Element
    this.elm.nativeElement.querySelector('input').focus();
  }

  static tabindex = 1;
  static currentFocus:any = null;

  timer: any = null;

  @HostBinding('tabindex') public tabIndex: number = 0;

  @Input('formGroupName') public rowNumber!: number;

  @Output('focus') public onFocus: EventEmitter<number> =
    new EventEmitter<number>();
  @Output('blur') public onBlur: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(private elm: ElementRef) {
    this.tabIndex = RowDirective.tabindex++;
  }

  @HostListener('focusin', ['$event'])
  public focusHandler(event: any) {
    // When we're not the current focus.
    if (RowDirective.currentFocus !== this) {
      this.onFocus.emit(event);

      RowDirective.currentFocus = this;
    } else {
      // Stop our blur from happening since it's the same row
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
  @HostListener('focusout', ['$event'])
  public blurHandler(event: any) {
    this.timer = window.setTimeout(() => {
      // If our row has changed, then we have blurred.
      this.onBlur.emit(event);

      // Clear if this is still listed as the Focused Row.
      if (RowDirective.currentFocus === this) {
        RowDirective.currentFocus = null;
      }
    }, 200);
  }
}
