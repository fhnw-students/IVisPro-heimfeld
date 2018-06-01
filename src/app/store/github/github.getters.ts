import { Contributor } from '@/app/models/github/Contributor';
import { GithubState } from './github.state';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  CONTRIBUTORS: 'CONTRIBUTORS',
  IS_INITIALIZED: 'IS_INITIALIZED',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.CONTRIBUTORS](state: GithubState): Contributor[] {
    return state.contributors;
  },
  [getterTypes.IS_INITIALIZED](state: GithubState): boolean {
    return state.isInitialized;
  },
};
