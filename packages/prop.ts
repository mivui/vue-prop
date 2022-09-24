import { Prop, PropType } from 'vue';

export type TypeProp<T> = PropType<T> | true | null;

export type DefaultFactory<T> = (props: Record<string, unknown> | T) => T | null | undefined;

export type DefaultType<T> = T | DefaultFactory<T> | null | undefined | object;

export type RequiredProp<T, D> = Prop<T, D> & { required: true };

export type PropOptions<T, D> = Prop<T, D> & {
  def(value: D): PropOptions<T, D>;
  valid(validator: (value: D) => boolean): PropOptions<T, D>;
  get isRequired(): RequiredProp<T, D>;
};

export class PropFactory<T = any, D = T> {
  type?: TypeProp<T>;

  required?: boolean;

  default?: DefaultType<D>;

  validator?(value: D): boolean;

  constructor(type: TypeProp<T>) {
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

export function propType<T, D = T>(type: TypeProp<T>) {
  return new PropFactory<T, D>(type) as PropOptions<D, D>;
}

export function emitType<T = () => void>() {
  return null as unknown as T;
}
