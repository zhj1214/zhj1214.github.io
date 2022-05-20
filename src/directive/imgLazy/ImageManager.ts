/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-14 13:51:34
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-14 16:50:03
 */
const State = {
  loading: 0,
  loaded: 1,
  error: 2,
};

export class ImageManager {
  [x: string]: any;

  constructor(options: any) {
    this.el = options.el;
    this.src = options.src;
    this.state = State.loading;
    this.loading = options.loading;
    this.error = options.error;

    this.render();
  }

  render() {
    this.el.setAttribute("src", this.src);
  }

  /**
   * @description: 指令变更
   * @param {*} src
   * @return {*}
   * @example:
   * @author: zhj1214
   */
  update(src: any) {
    const currentSrc = this.src;
    if (src !== currentSrc) {
      this.src = src;
      this.state = State.loading;
    }
  }

  /**
   * @description: 优化
   * @param {*} next
   * @return {*}
   * @example:
   * @author: zhj1214
   */
  load(next: any) {
    if (this.state > State.loading) {
      return;
    }
    this.renderSrc(next);
  }

  renderSrc(next: any) {
    loadImage(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render();
        next && next();
      })
      .catch((e) => {
        this.state = State.error;
        this.render();
        console.warn(
          `load failed with src image(${this.src}) and the error msg is ${e.message}`
        );
        next && next();
      });
  }
}

export function loadImage(src: any) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      resolve();
      dispose();
    };

    image.onerror = function (e) {
      reject(e);
      dispose();
    };

    image.src = src;

    function dispose() {
      image.onload = null;
      image.onerror = null;
    }
  });
}
