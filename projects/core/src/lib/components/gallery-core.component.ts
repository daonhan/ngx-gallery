import { Component, Input, HostBinding, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GalleryConfig, GalleryState } from '../models';

@Component({
  selector: 'gallery-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <gallery-thumbs *ngIf="config.thumb"
                   [state]="state"
                   [config]="config"
                   (action)="action.emit($event)"
                   (thumbClick)="thumbClick.emit($event)">
    </gallery-thumbs>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (action)="action.emit($event)"
                      (itemClick)="itemClick.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config"
                     (action)="action.emit($event)">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    (action)="action.emit($event)">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>
    </div>
  `
})
export class GalleryCoreComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() action = new EventEmitter<string | number>();
  @Output() itemClick = new EventEmitter<number>();
  @Output() thumbClick = new EventEmitter<number>();

  /** Set thumbnails position */
  @HostBinding('attr.thumbPosition') get thumbPosition(): 'top' | 'left' | 'right' | 'bottom' {
    return this.config.thumbPosition;
  }

  /** Set thumbnails position */
  @HostBinding('attr.slidingDirection') get slidingDirection(): 'horizontal' | 'vertical' {
    return this.config.slidingDirection;
  }

}
