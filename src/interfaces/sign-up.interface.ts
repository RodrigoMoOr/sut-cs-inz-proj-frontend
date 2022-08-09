export interface SignUpRequest {
  name: string;
  surname: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  id: string
  name: string
  surname: string
  username: string
  joinedAt: string
  lastUpdated: string
}
