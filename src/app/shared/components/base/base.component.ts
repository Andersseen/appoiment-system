import { Subject } from 'rxjs';
import { OnDestroy, Component } from '@angular/core';

@Component({ template: '' })
export abstract class BaseComponent implements OnDestroy {
  protected isDestroyed$ = new Subject<void>();

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}
