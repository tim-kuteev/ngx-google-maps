import { AfterContentInit } from '@angular/core';
import { ComponentBase } from './component-base';
import { GMapsApiLoaderService } from '../../core/services/gmaps-api-loader.service';

export abstract class ApiReady<T, O> extends ComponentBase<T, O> implements AfterContentInit {

  constructor(
      private loader: GMapsApiLoaderService) {
    super();
  }

  ngAfterContentInit(): void {
    this.loader.load.then(() => this.ready());
  }

  protected abstract ready(): void;
}
