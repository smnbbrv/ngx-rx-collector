import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { TestpageComponent } from 'testpage.component';
import { Testpage2Component } from 'testpage2.component';

@NgModule({
  declarations: [ AppComponent, TestpageComponent, Testpage2Component ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/test', pathMatch: 'full' },
      { path: 'test', component: TestpageComponent },
      { path: 'test2', component: Testpage2Component },
    ])
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
