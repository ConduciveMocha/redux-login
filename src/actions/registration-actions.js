import RegistrationTypes from '../constants/ActionTypes';


export const checkUsernameExists = (username) =>{
    return {
        type: RegistrationTypes.CHECK_USERNAME_EXISTS,
        username: username
    }
}

export const checkEmailExists = (email) => {
    return {
        type: RegistrationTypes.CHECK_EMAIL_EXISTS,
        email:email
    }
}

export const passwordsMatch = (doMatch) => {
    return {
        type: RegistrationTypes.PASSWORDS_MATCH,
        doMath: doMatch
    }
}

export const submitForm = (form) => {
    return {
        type: RegistrationTypes.SUBMIT_FORM,
        form
    }
}

export const registrationSucess = (resp) => {
    return {
        type: RegistrationTypes.REGISTRATION_SUCCESS,
        resp
    }
}

export const registrationFailed = (err) => {
    return {
        type: RegistrationTypes.REGISTRATION_FAILED,
        err
    }
}

export const usernameExists = (exists, similarUsernames=[]) => {
    return {
        type: RegistrationTypes.USERNAME_EXISTS,
        exists:exists,
        similarUsernames:similarUsernames
    }
}


export const emailExists = (exists) => {
    return {
        type: RegistrationTypes.EMAIL_EXISTS,
        exists: exists
    }
}

export const updateFormState = (key, value) => {
    return {
        type: RegistrationTypes.UPDATE_FORM_STATE,
        key:key,
        value:value
    }
}