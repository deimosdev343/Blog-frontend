export interface UserData {
  email: string,
  username: string,
  avatar_url?: string,
  loggedIn: boolean
}

export interface UserDataPayload {
  email: string,
  username: string,
  avatar_url?: string,
}

export interface UserProfileData {
  username: string,
  avatar_url?: string,
  descrption: string
}