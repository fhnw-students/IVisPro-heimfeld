import { actions } from './meta.actions';
import { getters, PACKAGE } from './meta.getters';
import { mutations } from './meta.mutations';
import { initialState } from './meta.state';

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './meta.state';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const MetaDataNamespace = 'meta';

export const MetaDataActions = {
};

export const MetaDataGetters = {
  Package: `${MetaDataNamespace}/${PACKAGE}`,
};

// -------------------------------------------------------------------------
// Export Store
// -------------------------------------------------------------------------

export const meta = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
