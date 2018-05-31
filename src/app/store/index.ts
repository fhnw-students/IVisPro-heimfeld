/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { GithubState, github } from './github';
import { TennisState, tennis } from './tennis';
import { MetaState, meta } from './meta';

/**
 * Define your Store here
 */
export interface Store {
  github: GithubState;
  tennis: TennisState;
  meta: MetaState;
}

const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store<Store>({
  /**
   * Assign the modules to the store.
   */
  modules: {
    github: github as any,
    tennis: tennis as any,
    meta: meta as any,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger({})] : [],
});
