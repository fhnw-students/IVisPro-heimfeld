import { MetaState } from './meta.state';
import { Package } from '@/app/models/Package';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const PACKAGE = 'PACKAGE';

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [PACKAGE](state: MetaState): Package {
    return state.package;
  },
};
