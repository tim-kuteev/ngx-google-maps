import { EventEmitter, Input, Output } from '@angular/core';

export abstract class ComponentBase<T, O> {

  @Input() options: O;
  @Output() model = new EventEmitter<T>();
  private _id = Math.random().toString(36).substring(2);

  get id(): string {
    return this._id;
  }

  onModelInit(model: T) {
    this.model.emit(model);
  }
}
