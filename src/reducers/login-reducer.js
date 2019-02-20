import { LoginTypes, ValidationTypes, RegistrationTypes } from '../constants/ActionTypes'
import NO_ERROR from '../constants/NoError'
// Reducers

//TODO: Place the login reducer in own file. Use the to combineReducers
const MESSAGE_USERNAME_INVALID = "Please enter a valid username"
const MESSAGE_PASSWORD_INVALID = "Please enter a password!"
// initial state
export const loginInitialState = {
    usernameValid: false,        // Username has correct length
    passwordValid: false,       // Password field not empy
    loginValid: false,           // Both username & password are valid
    storeUser: false,            // Store user check box is selected
    loginState: {
        awaitingLogin: false,        // Login request has been sent to server
        loggedIn: false
    },            // Server has excepted user's login request
    serverError: NO_ERROR         // Error in client side validation or server 
}

function currentLoginError(usernameValid, passwordValid) {
    if (!usernameValid)
        return { showError: true, errorMessage: MESSAGE_USERNAME_INVALID };
    else if (!passwordValid)
        return { showError: false, errorMessage: MESSAGE_PASSWORD_INVALID };
    else
        return NO_ERROR;
}

// Reducer for actions on the login screen
export default function loginReducer(state = loginInitialState, action) {
    console.log(state, action)
    switch (action.type) {
        // Server accepted login. This will trigger rendering of
        // the loading screen
        case LoginTypes.LOGIN_SUCCESS: {
            let storedUN = localStorage.getItem('username');
            if (state.storeUser && !storedUN)
                localStorage.setItem('username', action.payload.username);
            else if (!state.storeUser && storedUN)
                localStorage.removeItem('username')


            return {
                ...state,
                loginState: {
                    awaitingLogin: false,
                    loggedIn: true
                },
                serverError: NO_ERROR
            };
        }
        // Server responded with an error. awaitingLogin set to
        // false. Login error the currently visible error 
        case LoginTypes.LOGIN_FAILED:
            return {
                ...state,
                loginState: {
                    awaitingLogin: false,
                    loggedIn: false
                },
                serverError: action.errorInfo
            };
        // awaitingLogin true. Waiting for response from server.
        // Intercepted by the login Saga
        case LoginTypes.LOGIN_SUBMITTED:
            return {
                ...state,
                loginState: {
                    awaitingLogin: true,
                    loggedIn: false
                },
                serverError: { showError: true, errorMessage: state.serverError.errorMessage }
            };
        // Sets usernameValid "",he error state
        case ValidationTypes.USERNAME_VALID:
            return {
                ...state,
                usernameValid: action.isValid,
                loginValid: state.passwordValid && action.isValid,
                serverError: currentLoginError(action.isValid, state.passwordValid)
            };
        // Sets passwordValid and loginValid. Sets the error state
        case ValidationTypes.PASSWORD_VALID:
            return {
                ...state,
                passwordValid: action.isValid,
                loginValid: state.usernameValid && action.isValid,
                serverError: currentLoginError(state.usernameValid, action.isValid)
            };

        case ValidationTypes.STORE_USER_TOGGLED:
            return {
                ...state,
                storeUser: !state.storeUser
            };
        default:
            return state;
    }
}