import { PropType } from 'vue';

export type DefaultType<T> =
  | T
  | (() => T | null | undefined)
  | null
  | undefined
  | Record<string, unknown>;

export type VuePropType<T> = PropType<T> | true | null;

export type Validator<T> = (value: T) => boolean;

export class VueProp<T = any, D = T> {
  type?: VuePropType<T>;

  required?: boolean;

  default?: DefaultType<D>;

  validator?: Validator<D>;

  constructor(type: VuePropType<T>) {
    this.type = type;
  }
}
