export interface ErrorResponse {
  message: string;
  errors?: [];
}

export interface AccessTokenResponse {
  readonly accessToken: string;
}
