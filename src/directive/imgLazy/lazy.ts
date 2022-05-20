/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-12-14 13:52:40
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-05-14 16:50:26
 */
import { ImageManager, loadImage } from "./ImageManager";

const State = {
  loading: 0,
  loaded: 1,
  error: 2,
};
const DEFAULT_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default class Lazy {
  [x: string]: any;
  cache: Set<unknown>;
  managerQueue: any[];
  loading: boolean;
  error: any;
  observer: any;
  state: any;

  constructor(options: AnyObject) {
    this.cache = new Set();
    this.managerQueue = [];
    this.initIntersectionObserver();

    this.loading = options.loading || DEFAULT_URL;
    this.error = options.error || DEFAULT_URL;
  }

  add(el: any, binding: any) {
    const src = binding.value;

    const manager = new ImageManager({
      el,
      src,
      loading: this.loading,
      error: this.error,
      cache: this.cache,
    });

    this.managerQueue.push(manager);

    this.observer.observe(el);
  }

  initIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const manager = this.managerQueue.find((managerEl) => {
              return managerEl.el === entry.target;
            });
            if (manager) {
              if (manager.state === State.loaded) {
                this.removeManager(manager);
                return;
              }
              manager.load();
            }
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0,
      }
    );
  }

  update(el: any, binding: any) {
    const src = binding.value;
    const manager = this.managerQueue.find((managerEl) => {
      return managerEl.el === el;
    });
    if (manager) {
      manager.update(src);
    }
  }

  removeManager(manager: any) {
    const index = this.managerQueue.indexOf(manager);
    if (index > -1) {
      this.managerQueue.splice(index, 1);
    }
    if (this.observer) {
      this.observer.unobserve(manager.el);
    }
  }

  /**
   * @description: 及时删除
   * @param {*} el
   * @return {*}
   * @example:
   * @author: zhj1214
   */
  remove(el: any) {
    const manager = this.managerQueue.find((managerEl) => {
      return managerEl.el === el;
    });
    if (manager) {
      this.removeManager(manager);
    }
  }

  /**
   * @description: 缓存优化
   * @param {*} next
   * @return {*}
   * @example:
   * @author: zhj1214
   */
  load(next: any) {
    if (this.state > State.loading) {
      return;
    }
    if (this.cache.has(this.src)) {
      this.state = State.loaded;
      this.render(this.src);
      return;
    }
    this.renderSrc(next);
  }

  renderSrc(next: any) {
    loadImage(this.src)
      .then(() => {
        this.state = State.loaded;
        this.render(this.src);
        next && next();
      })
      .catch((e) => {
        this.state = State.error;
        this.cache.add(this.src);
        this.render(this.error);
        console.warn(
          `load failed with src image(${this.src}) and the error msg is ${e.message}`
        );
        next && next();
      });
  }
}
