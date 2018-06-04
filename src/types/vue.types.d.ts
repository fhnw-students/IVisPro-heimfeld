import Vue from 'vue';

import Noty from 'noty';
import { AxiosInstance } from "axios";

declare module 'vue/types/vue' {

  interface VueWebWorker {
    run<T>(worker: (...a: any[]) => any, args: any[]): Promise<T>
  }

  interface INoty {
    alert: (translationKey: string) => Noty;
    success: (translationKey: string) => Noty;
    warning: (translationKey: string) => Noty;
    error: (translationKey: string) => Noty;
    info: (translationKey: string) => Noty;
  }

  interface VueConstructor {
    $createLogger: (channelOrClass: string | any) => ILogger;
    $http: AxiosInstance;
    $worker: VueWebWorker;
  }

  interface Vue {
    $createLogger: (channelOrClass: string | any) => ILogger;
    $noty: INoty;
    $http: AxiosInstance;
    $worker: VueWebWorker;
  }
}
