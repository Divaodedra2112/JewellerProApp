export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

export interface AuthLoadingAction {
  type: typeof AUTH_LOADING;
}

export interface AuthSuccessAction {
  type: typeof AUTH_SUCCESS;
  payload: string; // token
}

export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: string; // error message
}

export type AuthActionTypes = AuthLoadingAction | AuthSuccessAction | AuthErrorAction;
