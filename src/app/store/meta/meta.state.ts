import { plainToClass } from 'class-transformer';
import { Package } from '@/app/models/Package';

import * as pkg from '../../../../package.json';

export interface MetaState {
  package: Package;
}

export const initialState: MetaState = {
  package: plainToClass(Package, pkg),
};
