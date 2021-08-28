import { StyleValue, VNode, PropType } from 'vue';
import { useProp } from './prop-dsl';

export class DefineProp {
  static get string() {
    return useProp<string>(String);
  }

  static get number() {
    return useProp<number>(Number);
  }

  static get stringNumber() {
    return useProp<number | string>([Number, String]);
  }

  static get boolean() {
    return useProp<boolean>(Boolean);
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

  static get object() {
    return useProp<Record<string, unknown>>(Object);
  }

  static get array() {
    return useProp<Array<Record<string, unknown>>>(Array);
  }

  static get func() {
    return Function as PropType<() => void>;
  }
}

export function defineObject<T>() {
  return useProp<T>(Object);
}

export function defineArray<T>() {
  return useProp<Array<T>>(Array);
}

export function defineFun<T>() {
  return Function as PropType<T>;
}

export function defineEmit<T = () => void>() {
  return Function as unknown as T;
}
