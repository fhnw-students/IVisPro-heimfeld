/* ============
 * Font Awesome
 * ============
 *
 * Icon library.
 *
 * https://fontawesome.com/
 */

import Vue from 'vue';

import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

fontawesome.library.add(fontawesomeSolid);

Vue.component('font-awesome-icon', FontAwesomeIcon);
