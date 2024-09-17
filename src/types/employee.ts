interface UserAttributes {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: boolean;
}

export type UserResponse = {
  id: string
  attributes: UserAttributes
}

export type UserRequest = {
  user: Omit<UserAttributes, "status">
}