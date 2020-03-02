import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    // $log is both global and per-instance
    $log: {
      debug(...args: any[]): void;
      info(...args: any[]): void;
      warn(...args: any[]): void;
      error(...args: any[]): void;
      fatal(...args: any[]): void;
    };
  }
}
