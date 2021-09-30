import { PropType, StyleValue, VNode } from 'vue';
import { useProp } from './prop-dsl';

export { VueProp, DefaultType, VuePropType, Validator } from './prop';
export { useProp, PropDsl } from './prop-dsl';

export class DefineProp {
  static get string() {
    return useProp<string>(String);
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
    return useProp<string | boolean>([String, Boolean]);
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
    return { type: Function as PropType<T> };
  }

  static emit<T = () => void>() {
    return Function as unknown as T;
  }
}

export default DefineProp;
