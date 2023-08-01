export declare module "@supaur/qdjk-web"; // declare module "第三方库"

import { init, SDK_VERSION, SDK_NAME, log } from "@supaur/qdjk-browser";
import { MitoVue } from "@supaur/qdjk-vue";
import { errorBoundaryReport } from "@supaur/qdjk-react";
export { init, SDK_VERSION, SDK_NAME, MitoVue, log, errorBoundaryReport };

//
import { IAnyObject } from "@supaur/qdjk-types";
export interface VueInstance {
  config?: VueConfiguration;
  mixin(hooks: { [key: string]: () => void }): void;
  util: {
    warn(...input: any): void;
  };
  version: string;
}
export interface VueConfiguration {
  silent: boolean;
  errorHandler(err: Error, vm: ViewModel, info: string): void;
  warnHandler(msg: string, vm: ViewModel, trace: string): void;
  ignoredElements: (string | RegExp)[];
  keyCodes: {
    [key: string]: number | number[];
  };
  async: boolean;
}
export interface ViewModel {
  [key: string]: any;
  $root: Record<string, unknown>;
  $options: {
    [key: string]: any;
    name?: string;
    propsData?: IAnyObject;
    _componentTag?: string;
    __file?: string;
    props?: IAnyObject;
  };
  $props: Record<string, unknown>;
}
//

interface Date {
  Format(fmt: string): string;
}
interface Array {
  idx(val: any): any | string;
  remove(val: any): void;
}

interface Function {
  before(beforefn: any): any;
  after(afterfn: any): any;
}

interface String {
  dateFormat(format: any): any;
  deleteCharAt(index: any): any;
  deleteString(start: any, end: any): any;
}

interface window {
  uni: AnyObject;
}

declare const MitoVue: {
  install(Vue: VueInstance): void;
};
export { MitoVue };
