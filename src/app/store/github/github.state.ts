import { Contributor } from '@/app/models/github/Contributor';

export interface GithubState {
  contributors: Contributor[];
  isFetching: boolean;
  error: any;
}

export const initialState: GithubState = {
  contributors: [],
  isFetching: false,
  error: undefined,
};
