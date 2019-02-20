import LoginTypes from '../constants/login-types';

export function loginSuccess(payload) {
    return {
        type:LoginTypes.LOGIN_SUCCESS, 
        payload    
    }
}


export function loginFailed(serverError) {
    return {
        type: LoginTypes.LOGIN_FAILED,
        serverError: serverError
    }
}

export function loginSubmitted(credentials) {
    return {
        type: LoginTypes.LOGIN_SUBMITTED,
        credentials:credentials
    }
}