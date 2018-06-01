import Vue, { PluginFunction, PluginObject } from 'vue';
import moment from 'moment';

Vue.filter('formatDate', (value: string | undefined) => {
  if (value) {
    return moment(new Date(String(value))).format('MMMM Do YYYY');
  }
  return '';
});
