import { Prop, PropType } from 'vue';

export type TypeProp<T> = PropType<T> | true | null;

export type DefaultFactory<T> = (props: Record<string, unknown> | T) => T | null | undefined;

export type DefaultType<T> = T | DefaultFactory<T> | null | undefined | object;

export type ExtractRequired<T, D> = Prop<T, D> & { required: true };

export type ExtractDefault<T, D> = PropOptions<T, D> & { default: DefaultType<D> };

export type PropOptions<T, D> = Prop<T, D> & {
  def(value: D): ExtractDefault<T, D>;
  valid(validator: (value: D) => boolean): PropOptions<T, D>;
  get isRequired(): ExtractRequired<T, D>;
};

export class PropFactory<T = any, D = T> {
  type?: TypeProp<T>;

  required?: boolean;

  default?: DefaultType<D>;

  validator?(value: D): boolean;

  constructor(type: TypeProp<T>) {
    this.type = type;
  }

  def(value?: D): ExtractDefault<T, D> {
    if (typeof value === 'object' || Array.isArray(value)) {
      this.default = () => value;
    } else {
      this.default = value;
    }
    return this as ExtractDefault<T, D>;
  }

  valid(validator: (value: D) => boolean): PropOptions<T, D> {
    this.validator = validator;
    return this;
  }

  get isRequired(): ExtractRequired<T, D> {
    this.required = true;
    return this as ExtractRequired<T, D>;
  }
}

export function propType<T, D = T>(type: TypeProp<T>) {
  return new PropFactory<T, D>(type) as PropOptions<D, D>;
}

export function emitType<T = () => void>() {
  return null as unknown as T;
}
