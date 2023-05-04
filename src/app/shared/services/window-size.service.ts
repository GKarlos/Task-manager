import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class WindowSizeService implements OnDestroy {
  private windowSize$ = new BehaviorSubject<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  private resizeSubscription: Subscription;

  constructor() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.updateWindowDimensions());
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private updateWindowDimensions() {
    this.windowSize$.next({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  getWindowSize() {
    return this.windowSize$.asObservable();
  }
}
