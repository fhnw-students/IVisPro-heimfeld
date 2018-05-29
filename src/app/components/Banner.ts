import { Component, Prop, Vue } from 'vue-property-decorator';

import Spinner from '@/app/components/Spinner/Spinner.vue';

@Component({
  components: {
    Spinner,
  },
})
export default class Banner extends Vue { }
