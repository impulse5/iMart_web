export interface EmployeeInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

export interface userEmployeeInfo {
  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role: string;
  }
}
