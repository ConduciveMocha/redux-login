import * as LoginTypes from "./login-types";
import * as ValidationTypes from "./validation-types";
import * as RegistrationTypes from "./registration-types";
export {LoginTypes,
    ValidationTypes,
    RegistrationTypes,
};
export default {    ...LoginTypes,
    ...ValidationTypes,
    ...RegistrationTypes,
};
