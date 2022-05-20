interface AnyObject {
  [key: string]: any;
}

interface FunctionConstructor {
  /**
   * Creates a new function.
   * @param args A list of arguments the function accepts.
   */
  new (...args: string[]): Function;
  (...args: string[]): Function;
  readonly prototype: Function;
}

declare let Function: FunctionConstructor;
