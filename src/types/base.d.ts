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
