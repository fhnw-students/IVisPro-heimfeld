import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { GithubGetters } from '@/app/store/github';
import { Contributor } from '@/app/models/github/Contributor';
import Author from '@/app/components/Authors/Author/Author';

@Component({
  components: {
    Author,
  },
})
export default class Authors extends Vue {

  @Getter(GithubGetters.Contributors)
  public contributors: Contributor[];

}
