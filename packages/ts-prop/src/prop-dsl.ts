import { Prop } from 'vue';
import { Validator, VueProp, VuePropType } from './prop';

export type PropDslType<T, D = T> = Omit<PropDsl<T, D>, 'prop'>;

export class PropDsl<T = any, D = T> {
  prop: VueProp<T, D>;

  constructor(type: VuePropType<T>) {
    this.prop = new VueProp<T, D>(type);
  }

  default(value?: D) {
    this.prop.default = value;
    return this as PropDslType<T, D>;
  }

  validator(validator: Validator<D>) {
    this.prop.validator = validator;
    return this as PropDslType<T, D>;
  }

  get type() {
    return this.prop as Prop<T, T> & { required: false };
  }

  get required() {
    this.prop.required = true;
    return this.prop as Prop<T, T> & { required: true };
  }
}

export function useProp<T>(type: VuePropType<T>) {
  return new PropDsl<T>(type) as PropDslType<T>;
}
