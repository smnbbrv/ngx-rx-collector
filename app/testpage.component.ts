import { Component } from '@angular/core';
import { Collected, CollectorEvent } from './src';
import { timer } from './timer';

@Component({
  template: 'Ticking'
})
export class TestpageComponent {

  @Collected() private collected: CollectorEvent;

  public ngOnInit() {
    timer.takeUntil(this.collected)
         .subscribe(console.log.bind(console));
  }

  public ngOnDestroy() {
    console.log('unnecessary destroy works, subscription is still killed');
  }

}
