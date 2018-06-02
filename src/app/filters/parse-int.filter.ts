import Vue, { PluginFunction, PluginObject } from 'vue';
import moment from 'moment';

Vue.filter('parseInt', (value: any) => {
  return parseInt(value, 10);
});
