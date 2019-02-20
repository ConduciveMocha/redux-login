import {
  LoginTypes,
  ValidationTypes,
  RegistrationTypes
} from "../constants/ActionTypes";
import NO_ERROR from "../constants/NoError";



export const registrationInitialState = {
    formState: {
        username: '',
        password: '',
        email: '',
        dob: ''
    },
    userExist: '',
    similarUsernames: [],
    serverError: NO_ERROR


}

export default function registrationReducer(state = registrationInitialState, action) {
    console.log("state:", state)
    console.log("action: ",action)
    
    switch (action.type) {
        case RegistrationTypes.USERNAME_EXISTS:
            return {
                ...state

            };
        case RegistrationTypes.EMAIL_EXISTS:
            return {
                ...state

            };
        case RegistrationTypes.UPDATE_FORM_STATE:
            let newObj = {...state.formState}
            newObj[action.key] = action.value
            return {
                ...state,
                formState:newObj
            }
        default:
            return state;
    }

}