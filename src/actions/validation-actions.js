import ValidationTypes from '../constants/validation-types';
import  NO_ERROR  from '../constants/NoError';
export const usernameValid = (valid) => {
    return {
        type: ValidationTypes.USERNAME_VALID,
        isValid: valid,
    }
}

export const passwordValid = (valid) => {
    return {
        type: ValidationTypes.PASSWORD_VALID,
        isValid: valid,
    }
}

export const storeUserToggled = () => {
    return {
        type: ValidationTypes.STORE_USER_TOGGLED
    }    
}