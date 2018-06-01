import { Contributor } from '@/app/models/github/Contributor';

export interface GithubState {
  contributors: Contributor[];
  isInitialized: boolean;
  isFetching: boolean;
  error: any;
}

export const initialState: GithubState = {
  contributors: [],
  isInitialized: false,
  isFetching: false,
  error: undefined,
};
