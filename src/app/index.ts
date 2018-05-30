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
import { i18n } from '@/app/plugins/i18n.plugin';

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

Vue.config.productionTip = appConfig.env !== 'Production';

import { Player } from '@/app/models/Player';
import { plainToClass } from 'class-transformer';
import fedJsonData from '@/mock/players/fed.json';
import nadJsonData from '@/mock/players/nad.json';

/**
 * Start with federer vs nadal
 */
store.dispatch(TennisActions.LoadHead2HeadStat, {
  player: plainToClass(Player, fedJsonData),
  opponent: plainToClass(Player, nadJsonData),
});

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
