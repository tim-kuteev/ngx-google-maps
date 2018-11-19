import { EventEmitter, Input, Output } from '@angular/core';

export abstract class ComponentBase<T, O> {

  @Input() options: O;
  @Output() init = new EventEmitter<T>();
  private _model: T;

  get model(): T {
    return this._model;
  }

  set model(value: T) {
    this._model = value;
    this.init.emit(value);
  }
}
