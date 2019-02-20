import React from 'react';
import  FieldError  from './FieldError';
import NO_ERROR from '../../constants/NoError'
import {updateFormState} from '../../actions/registration-actions'
import {connect } from 'react-redux'
import './StrengthIndicator.css'
// PasswordField for the LoginScreen
const passwordDefaultValue = '_____________'
const onFocusPasswordDefault = (e) => { 
    e.target.value = e.target.value === passwordDefaultValue ? '' : e.target.value 
} 
export const PasswordField = ({ onChange, label = "Password:", 
onBlur = () => { console.log('b') }, 
onFocus = onFocusPasswordDefault}) => {
    const defaultValue = "_____________";
    return (
        <div className="password-container">
            <label>{label}
                <input
                    type="password"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    defaultValue={defaultValue}>
                </input>
            </label>
        </div>
    )

}



const StrengthIndicator = ({strength}) =>{
    
    return (
      <div id="strength-indicator-container" >
        <div id="password-strength-indicator" className={strength}>
          <div id="password-poor"  />
          <div id="password-moderate"  />
          <div id="password-strong" />
        </div>
        <p id="strength-indicator-text" className={strength}>
        {"Password Strength: " + strength.charAt(0).toUpperCase() + strength.slice(1)}
        </p>
      </div>
    );
}

const STRENGTHS = ['error','empty', 'poor','moderate', 'strong'];
export class RegisterPasswordField extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.onChangePassword = this.handleChangeFunction(0).bind(this)
        this.onChangeConfirm = this.handleChangeFunction(1).bind(this)
        this.state = {
            passwordFields:['', ''],
            viewError:NO_ERROR,
            strength:'empty',
            hasFocused:[false,false]
        }
    }

    handleOnBlur(e) {
        switch (this.state.strength){
            case STRENGTHS[0]:
                this.props.updateFormState('')
                break;
            case STRENGTHS[1]:{
                this.props.updateFormState('')
                this.setState({ ...this.state, viewError: { showError: true, errorMessage: "Please Enter Password" } })
                break;
            }
            case STRENGTHS[2]: {
                this.props.updateFormState('')
                this.setState({ 
                    ...this.state, 
                    viewError: { 
                        showError: 
                        this.state.hasFocused[0] && this.state.hasFocused[1], errorMessage: "Password Too Weak" 
                    } 
                });    
                break;
            }
            default: {
                if (this.state.passwordFields[0] === this.state.passwordFields[1] || !(this.state.hasFocused[0] && this.state.hasFocused[1])) {
                    this.setState({ ...this.state,  viewError: NO_ERROR })
                    this.props.updateFormState(this.state.passwordFields[0])
                }
                else {
                    this.props.updateFormState('')
                    this.setState({
                        ...this.state,
                        viewError: {
                            showError: true,
                            errorMessage: "Passwords do not match"
                        }
                    })
                }
            }
        }
    } 
    static passwordStrength(pw) {
        const containsNumber =  /[0-9]/g
        const containsUpperLower = /((?<=[a-z])\S*[A-Z])|((?<=[A-Z])\S*[a-z])/g
        const containsSpecialChar = /[^a-zA-Z0-9\s]/

        if (pw.match(/[\s]/g))
            return STRENGTHS[0]
        

        if (pw.length=== 0) return STRENGTHS[1];

        if(pw.length < 7 || !pw.match(containsUpperLower)) return STRENGTHS[2];
        if(pw.match(containsUpperLower) && (!pw.match(containsNumber) || !pw.match(containsSpecialChar)) ) return STRENGTHS[3];
        
        if ((pw.match(containsNumber).length + pw.match(containsSpecialChar).length < 3)) return STRENGTHS[4];
    
        
        return STRENGTHS[4]
    }

    handleChangeFunction(field) {
        return function handleChange(e) {
            let error;
            let newFieldArr = this.state.passwordFields.slice(0),
            newFocusArr= this.state.hasFocused.slice(0)
            
            
            
            newFieldArr[field] = e.target.value
            newFocusArr[field] = true
            if (newFieldArr[0].match(/\s/g)) 
                error = {showError:true,errorMessage: "Password cannot contain whitespace character" }            
            else if(newFieldArr[0] === newFieldArr[1] || !(newFocusArr[0] && newFocusArr[1]))
                error = NO_ERROR;
            
            else 
                error={showError:true, errorMessage:"Passwords do no match"}
            this.setState({
                ...this.state,
                passwordFields:newFieldArr,
                hasFocused:newFocusArr,
                viewError:error, 
                strength:RegisterPasswordField.passwordStrength(newFieldArr[0] ? newFieldArr[0]:e.target.value)
            })
        }
    }
   
    render() {
        return (
          <div className="register-password-container">
            <div className="password-field-container">
              <PasswordField
                        onBlur={this.handleOnBlur }
                onChange={this.onChangePassword}
                label="Enter Password"
              />
              <PasswordField
                onBlur={this.handleOnBlur}
                onChange={this.onChangeConfirm}
                label="Re-Enter Password:"
              />

              <StrengthIndicator strength={this.state.strength} />
            </div>
            <FieldError
              viewError={this.state.viewError}
              serverError={this.props.serverError}
            />
          </div>
        );
    }
}

export default connect(
    (state) => {
        return{
            serverError: state.registrationReducer.serverError
        }
    },
    (dispatch) => {
        return {
            updateFormState: password => {dispatch(updateFormState('password', password))}
        }
        
    }
)(RegisterPasswordField)