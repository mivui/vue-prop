/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type PropType, type StyleValue, type VNode } from 'vue';

import { propType } from './prop';

export class Builder {
  public static get string() {
    return propType<string>(String);
  }

  public static get number() {
    return propType<number>(Number);
  }

  public static get stringNumber() {
    return propType<number | string>([String, Number]);
  }

  public static get boolean() {
    return propType<boolean>(Boolean);
  }

  public static get symbol() {
    return propType<symbol>(Symbol);
  }

  public static get date() {
    return propType<Date>(Date);
  }

  public static get vNode() {
    return propType<VNode | string>([String, Object]);
  }

  public static get css() {
    return propType<StyleValue>(Object);
  }

  public static object<T = Record<string, any>>() {
    return propType<T>(Object);
  }

  public static array<T = Record<string, any>>() {
    return propType<T[]>(Array);
  }

  public static function<T = () => void>() {
    return propType<T>(Function as PropType<T>);
  }

  public static literal<T>() {
    return propType<boolean | number | string, T>([String, Number, Boolean]);
  }
}
