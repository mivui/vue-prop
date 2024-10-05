import { type Prop, type PropType } from 'vue';

export type TypeProp<T> = PropType<T> | true | null;

export type DefaultFactory<T> = (props: Record<string, unknown> | T) => T | null | undefined;

export type DefaultType<T> = DefaultFactory<T> | T | object | null | undefined;

export type ExtractRequired<T, D> = Prop<T, D> & { required: true };

export type ExtractDefault<T, D> = PropOptions<T, D> & { default: DefaultType<D> };

export type PropOptions<T, D> = Prop<T, D> & {
  def: (value: D) => ExtractDefault<T, D>;
  valid: (validator: (value: D) => boolean) => PropOptions<T, D>;
  get isRequired(): ExtractRequired<T, D>;
};

export class PropFactory<T = any, D = T> {
  public type?: TypeProp<T>;

  public required?: boolean;

  public default?: DefaultType<D>;

  public validator?(value: D): boolean;

  constructor(type: TypeProp<T>) {
    this.type = type;
  }

  public def(value?: D): ExtractDefault<T, D> {
    if (value instanceof Object || Array.isArray(value)) {
      this.default = () => value;
    } else {
      this.default = value;
    }
    return this as ExtractDefault<T, D>;
  }

  public valid(validator: (value: D) => boolean): PropOptions<T, D> {
    this.validator = validator;
    return this;
  }

  public get isRequired(): ExtractRequired<T, D> {
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
