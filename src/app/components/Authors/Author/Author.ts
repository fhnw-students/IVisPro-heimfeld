import { Component, Prop, Vue } from 'vue-property-decorator';

import { Contributor } from '@/app/models/github/Contributor';
import { User } from '@/app/models/github/User';
import * as githubApi from '@/app/services/api/github.api';

@Component
export default class Author extends Vue {

  @Prop()
  public author: Contributor;

  public user: User = new User();

  public mounted(): void {
    this.loadAuthor(this.author.login);
  }

  public async loadAuthor(username: string): Promise<void> {
    this.user = await githubApi.getUserByUsername(username);
  }

}
