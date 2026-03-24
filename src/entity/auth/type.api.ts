import { type UserType } from './data'

export type AuthUserType = Pick<UserType, 'email' | 'password'>
export type AuthSession = Omit<UserType, 'password'>
