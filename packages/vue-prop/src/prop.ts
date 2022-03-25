import { Prop, PropType } from 'vue';

export type VuePropType<T> = PropType<T> | true | null;

export type DefaultFactory<T> = (
  props: Record<string, unknown> | T,
) => T | null | undefined;

export type DefaultType<T> = T | DefaultFactory<T> | null | undefined | object;

export type RequiredProp<T, D> = Prop<T, D> & { required: true };

export type PropOptions<T, D> = Prop<T, D> & {
  def(value: D): PropOptions<T, D>;
  valid(validator: (value: D) => boolean): PropOptions<T, D>;
  get isRequired(): RequiredProp<T, D>;
};

export type LiteralPropOptions<T> = Prop<T, T> & {
  def(value: T): LiteralPropOptions<T>;
  valid(validator: (value: T) => boolean): LiteralPropOptions<T>;
  get isRequired(): RequiredProp<T, T>;
};

export class PropFactory<T = any, D = T> {
  type?: VuePropType<T>;

  required?: boolean;

  default?: DefaultType<D>;

  validator?(value: D): boolean;

  constructor(type: VuePropType<T>) {
    this.type = type;
  }

  def(value?: D): PropOptions<T, D> {
    this.default = value;
    return this;
  }

  valid(validator: (value: D) => boolean): PropOptions<T, D> {
    this.validator = validator;
    return this;
  }

  get isRequired() {
    this.required = true;
    return this as RequiredProp<T, D>;
  }
}

export function useProp<T, D = T>(type: VuePropType<T>): PropOptions<T, D> {
  return new PropFactory<T, D>(type);
}
