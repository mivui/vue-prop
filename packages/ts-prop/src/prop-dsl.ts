import { Prop } from 'vue';
import { Validator, VueProp, VuePropType } from './prop';

export class PropDsl<T = any> {
  private readonly prop: VueProp<T, T>;

  constructor(type: VuePropType<T>) {
    this.prop = new VueProp<T, T>(type);
  }

  default(value?: T): PropDsl<T> {
    this.prop.default = value;
    return this;
  }

  validator(validator: Validator<T>): PropDsl<T> {
    this.prop.validator = validator;
    return this;
  }

  get type(): Prop<T, T> {
    return this.prop as Prop<T, T>;
  }

  get required(): Prop<T, T> & { required: true } {
    this.prop.required = true;
    return this.prop as Prop<T, T> & { required: true };
  }
}

export function useProp<T>(type: VuePropType<T>): PropDsl<T> {
  return new PropDsl<T>(type);
}
