import { Prop, PropType } from 'vue';

export type Data = Record<string, unknown>;

export type DefaultFactory<T> = (props: Data) => T | null | undefined;

export type RequiredProp<T, D> = Prop<T, D> & { required: true };

export type PropOptions<T, D> = Prop<T, D> & {
  def(value?: D): PropOptions<T, D>;
  valid(validator: (value: D) => boolean): PropOptions<T, D>;
  get isRequired(): RequiredProp<T, D>;
};

export class VueProp<T = any, D = T> {
  type?: PropType<T> | true | null;

  required?: boolean;

  default?: D | DefaultFactory<D> | null | undefined | object;

  validator?(value: D): boolean;

  constructor(type: PropType<T> | true | null) {
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

  get isRequired(): RequiredProp<T, D> {
    this.required = true;
    return this as RequiredProp<T, D>;
  }
}

export function useProp<T = any, D = T>(
  type: PropType<T> | true | null,
): PropOptions<T, D> {
  return new VueProp<T, D>(type);
}
