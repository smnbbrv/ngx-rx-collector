import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <a routerLink="/test">Test</a>
    <a routerLink="/test2">Test2</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
