import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { Contributor } from '@/app/models/github/Contributor';
import { User } from '@/app/models/github/User';

export const baseConfig = {
  baseURL: 'https://api.github.com',
};

/**
 * @name getContributors
 * @description Gets all the contributors of this repository.
 * @returns List of contributors.
 */
export async function getContributors(): Promise<Contributor[]> {
  // return [];
  const response = await Vue.$http.get('/repos/fhnw-students/IVisPro-heimfeld/contributors', Object.assign(baseConfig, {}));
  return plainToClass<Contributor, Contributor[]>(Contributor, response.data);
}

/**
 * @name getUserByUsername
 * @description Gets all the contributors of this repository.
 * @param String of username.
 * @returns User.
 */
export async function getUserByUsername(username: string): Promise<User> {
  const response = await Vue.$http.get(`/users/${username}`, Object.assign(baseConfig, {}));
  return plainToClass<User, User>(User, response.data);
}
