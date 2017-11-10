import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GMapsCoreConfig } from './gmaps-core.config';
import { GMapsApiLoaderService } from './services/gmaps-api-loader.service';
import { GMapsHelperService } from './services/gmaps-helper.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    GMapsApiLoaderService,
    GMapsHelperService,
  ],
})
export class GMapsCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: GMapsCoreModule) {
    if (parentModule) {
      throw new Error('GMapsCoreModule is already loaded. Import it in the root module only');
    }
  }

  static forRoot(config: GMapsCoreConfig): ModuleWithProviders {
    return {
      ngModule: GMapsCoreModule,
      providers: [
        {provide: GMapsCoreConfig, useValue: config}
      ]
    };
  }
}
