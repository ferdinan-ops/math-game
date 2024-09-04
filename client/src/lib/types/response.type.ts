export type AuthResponseType = {
  access_token: string
  role: 'teacher' | 'student'
}

export type ErrorResponseType = {
  error: string
}
