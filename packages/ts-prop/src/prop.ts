import { PropType } from 'vue';

export type DefaultType<T> =
  | T
  | (() => T | null | undefined)
  | null
  | undefined
  | Record<string, unknown>;

export type VuePropType<T> = PropType<T> | true | null;

export class VueProp<T = any, D = T> {
  type?: VuePropType<T>;

  required?: boolean;

  default?: DefaultType<D>;

  validator?(value: unknown): boolean;

  constructor(type: VuePropType<T>) {
    this.type = type;
  }
}
