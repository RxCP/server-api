export interface StandardError {
  message: string;
  errors?: [];
}

export interface AccessTokenResponse {
  readonly accessToken: string;
}
