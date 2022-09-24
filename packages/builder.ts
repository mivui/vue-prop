import { PropType, StyleValue, VNode } from 'vue';
import { propType } from './prop';

export class Builder {
  static get string() {
    return propType<string>(String);
  }

  static get number() {
    return propType<number>(Number);
  }

  static get stringNumber() {
    return propType<number | string>([String, Number]);
  }

  static get boolean() {
    return propType<boolean>(Boolean);
  }

  static get symbol() {
    return propType<symbol>(Symbol);
  }

  static get date() {
    return propType<Date>(Date);
  }

  static get vNode() {
    return propType<VNode | string>([String, Object]);
  }

  static get css() {
    return propType<StyleValue>(Object);
  }

  static object<T = Record<string, any>>() {
    return propType<T>(Object);
  }

  static array<T = Record<string, any>>() {
    return propType<Array<T>>(Array);
  }

  static function<T = () => void>() {
    return propType<T>(Function as PropType<T>);
  }

  static literal<T>() {
    return propType<string | number | boolean, T>([String, Number, Boolean]);
  }
}
