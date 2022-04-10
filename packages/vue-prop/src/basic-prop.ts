import { PropType, StyleValue, VNode } from 'vue';
import { defineProp } from './prop';

export class BasicProp {
  static get string() {
    return defineProp<string>(String);
  }

  static get number() {
    return defineProp<number>(Number);
  }

  static get stringNumber() {
    return defineProp<number | string>([String, Number]);
  }

  static get boolean() {
    return defineProp<boolean>(Boolean);
  }

  static get symbol() {
    return defineProp<symbol>(Symbol);
  }

  static get date() {
    return defineProp<Date>(Date);
  }

  static get vNode() {
    return defineProp<VNode | string | null>([String, Object]);
  }

  static get css() {
    return defineProp<StyleValue>(Object);
  }

  static object<T = Record<string, any>>() {
    return defineProp<T>(Object);
  }

  static array<T = Record<string, any>>() {
    return defineProp<Array<T>>(Array);
  }

  static function<T = () => void>() {
    return { type: Function as PropType<T> };
  }
}
