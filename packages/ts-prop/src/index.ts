import { Prop, StyleValue, VNode } from 'vue';
import { RequiredProp, PropOptions, useProp } from './prop';

export { PropFactory, useProp } from './prop';
export type {
  VuePropType,
  DefaultFactory,
  DefaultType,
  RequiredProp,
  PropOptions,
} from './prop';

export class DefineProp {
  static get string() {
    return useProp<string>(String);
  }

  static literalType<T extends string>(type: PropOptions<string, string>) {
    return type as unknown as Prop<T>;
  }

  static requiredLiteralType<T extends string>(
    type: RequiredProp<string, string>,
  ) {
    return type as unknown as Prop<T> & { required: true };
  }

  static get number() {
    return useProp<number>(Number);
  }

  static get stringNumber() {
    return useProp<number | string>([String, Number]);
  }

  static get boolean() {
    return useProp<boolean>(Boolean);
  }

  static get stringBool() {
    return useProp<string | boolean>([String, Boolean]);
  }

  static get numberBool() {
    return useProp<number | boolean>([Number, Boolean]);
  }

  static get symbol() {
    return useProp<symbol>(Symbol);
  }

  static get date() {
    return useProp<Date>(Date);
  }

  static get vNode() {
    return useProp<VNode | string | null>([String, Object]);
  }

  static get css() {
    return useProp<StyleValue>(Object);
  }

  static object<T = Record<string, unknown>>() {
    return useProp<T>(Object);
  }

  static array<T = Record<string, unknown>>() {
    return useProp<Array<T>>(Array);
  }

  static func<T = () => void>() {
    return { type: Function as Prop<T> };
  }

  static emit<T = () => void>() {
    return Function as unknown as T;
  }
}

export default DefineProp;
