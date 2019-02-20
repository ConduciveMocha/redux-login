import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import  Button  from './FormComponents/Button';
import  FieldError  from './FormComponents/FieldError'
import { PasswordField } from './FormComponents/PasswordField';
import { UsernameField } from './FormComponents/UsernameField';
import { StoreUserCheckbox } from './FormComponents/StoreUserCheckbox'
import {makeLengthValidator} from '../utils/input-utils'
import { loginSubmitted } from '../actions/login-actions'
import { usernameValid, passwordValid, storeUserToggled  }  from '../actions/validation-actions'
import loginReducer from '../reducers';
import NO_ERROR from '../constants/NoError';






class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.usernameFromLocal = localStorage.getItem('username');
        
        // Binding child event handlers
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePassswordChange = this.handlePassswordChange.bind(this)
        this.onLoginPressed = this.onLoginPressed.bind(this)
        
        // Creates field validation functions
        this.validateUsername = makeLengthValidator(8,17);
        this.validatePassword = makeLengthValidator(1);
        
        // LoginScreen temporarily stores username/password fields so
        //      a) They are not commited to the store
        //      b) An action doesn't have to be sent every time the
        //         field changes.
        // This might not be worth the complication...
        this.state = {
            usernameField: {
                value: '',
                isValid: false
            },
            passwordField: {
                value: '',
                isValid: false
            },
            viewError: NO_ERROR
        }
    }
    // User clicked login button
    onLoginPressed(e) {
        e.preventDefault()
        this.props.loginSubmitted({
            username:this.state.usernameField.value, password:this.state.passwordField.value
        });

    }
    // User toggled the store user checkbox
    toggleStoreUser(e) {
        this.props.storeUserToggled()
    }
    
    // Username field onChange function
    handleUsernameChange(e) {
        const unf = this.validateUsername(e.target.value);
        // Only dispatches action if the action changes the field
        if (this.state.usernameField.isValid != unf.isValid) {
            if (unf.isValid) this.props.usernameValid(true);
                
            else this.props.usernameValid(false)
        }
        this.setState({ ...this.state, usernameField: unf });    
    }
    //TODO: This is nearly idendtical to handleUsernameChange. Make the core logic a single function
    handlePassswordChange(e) {
        const pwf = this.validatePassword(e.target.value);
        if (this.state.passwordField.isValid !== pwf.isValid){
            if (pwf.isValid) this.props.passwordValid(true);
            else this.props.passwordValid(false)
        }
        this.setState({...this.state, passwordField: pwf })

    }

    //TODO: Place validators in their own file
    // Length validation function factory


    //TODO: Ask if its ok to have the form submission handled by react/redux
    render() {
        

        return (
          <div className="login-form-container">
            <form className="login-form">
                <UsernameField 
                onChange={this.handleUsernameChange}
                usernameFromLocal={this.usernameFromLocal}
                />
                <PasswordField onChange={this.handlePassswordChange} />
              

              <StoreUserCheckbox
                isChecked={this.props.storeUser}
                onChecked={this.props.storeUserToggled}
              />
              <FieldError
                viewError={this.state.viewError}
                serverError={this.props.serverError}
              />
              <div className="login-register-buttons">
              <Button
                action={this.onLoginPressed}
                title="Sign In"
                disabled={this.props.loginDisabled}
              />

              <Link to="register">Create Account</Link>
              </div>
            </form>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storeUser: state.loginReducer.storeUser, // Sets the checkbox state
        serverError: state.loginReducer.serverError, // Passed to field error. Will display if showError is true
        loginDisabled: !state.loginReducer.loginValid,// Disables login button if minimum length requirement not met
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        //Used by handleUsernameChange
        usernameValid: (isValid) => { dispatch(usernameValid(isValid)) },
        //Used by handlePasswordChange
        passwordValid: (isValid) => { dispatch(passwordValid(isValid)) },
        // Used by Button.onClick
        loginSubmitted: (credentials) => { dispatch(loginSubmitted(credentials)) },
        // Used by StoreUserCheckbox.onClick
        storeUserToggled: () => { dispatch(storeUserToggled()) }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);