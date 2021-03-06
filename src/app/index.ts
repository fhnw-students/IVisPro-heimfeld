/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 * The order is important!
 */

import '@/app/plugins/bootstrap.plugin';
import '@/app/plugins/flag-icon-css.plugin';
import '@/app/plugins/fontawesome.plugin';
import '@/app/plugins/logger.plugin';
import '@/app/plugins/vuex.plugin';
import '@/app/plugins/axios.plugin';
import '@/app/plugins/noty.plugin';
import '@/app/plugins/vee-validate.plugin';
import '@/app/plugins/vue-event-bus.plugin';
import '@/app/plugins/vue-worker.plugin';
import { i18n } from '@/app/plugins/i18n.plugin';

/* ============
 * Filters
 * ============
 *
 * TODO: Describe
 */

import '@/app/filters/format-date.filter';

/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Sass is used for this boilerplate.
 *
 * https://sass-lang.com/
 */

import '@/styles/main.scss';

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */

import App from '@/app/App.vue';
import { store } from '@/app/store/index';
import { appConfig } from '@/config/app.config';
import { TennisActions } from '@/app/store/tennis';
import { GithubActions } from '@/app/store/github';

Vue.config.productionTip = appConfig.env !== 'Production';

import { Player } from '@/app/models/Player';
import { plainToClass } from 'class-transformer';

/**
 * Bootstrap the Vue.js framework
 */
new Vue({

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: (h) => h(App),
})
  /**
   * Bind the Vue instance to the HTML.
   */
  .$mount('#app');

const log = Vue.$createLogger('main');
log.info(`The environment is ${appConfig.env}.`);
log.info(`The language is set to ${i18n.locale}.`);

/**
 * Load initial data into the store
 */
store.dispatch(GithubActions.GetContributors);
store.dispatch(TennisActions.Init);
