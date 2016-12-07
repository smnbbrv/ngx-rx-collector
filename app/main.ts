require('rxjs/Rx');
require('reflect-metadata/Reflect');
require('ts-helpers');
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
