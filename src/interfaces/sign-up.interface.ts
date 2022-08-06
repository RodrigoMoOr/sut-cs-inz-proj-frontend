export interface SignUpRequest {
  name: string | undefined
  surname: string | undefined
  username: string | undefined
  password: string | undefined
}

export interface SignUpResponse {
  id: number
  name: string
  surname: string
  username: string
  joinedAt: string
  lastUpdated: string
}
