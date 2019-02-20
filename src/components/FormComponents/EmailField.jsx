import React from 'react';
import FieldError from './FieldError'
import NO_ERROR from '../../constants/NoError'
import {makeRegexValidator} from '../../utils/input-utils'
import {updateFormState} from '../../actions/registration-actions'
import { connect} from 'react-redux'


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export class RegisterEmailField extends React.Component {
    
    constructor(props) {
        super(props);
        this.validator = makeRegexValidator(EMAIL_REGEX)
        this.handleChange= this.handleChange.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.state = {viewError:NO_ERROR}
        
    }

    handleChange(e) {
        let email = e.target.value;
        let err = this.validator(email) ? NO_ERROR : {showError:true, errorMessage:"invalid email"}
        this.setState({...this.state, viewError:err})
    }

    handleOnBlur(e) {
        console.log(this.state.viewError)
        if(this.state.viewError === NO_ERROR) 
            this.props.updateFormState(e.target.value)
        
    }



    render() { 
        return (
            <div className="register-email-field">
                <label>Email Address:
                    <input 
                    type="email"
                    placeholder="example@email.com"
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    >
                    </input>
                </label>
                <FieldError 
                    viewError={this.state.viewError}
                    serverError={this.props.serverError}
                />
            </div>
        )
    }
}



export default connect(
    (state) => {
        return {
            serverError: state.registrationReducer.serverError
        }
    },
    (dispatch) => {
        return {
            updateFormState: (value) => {dispatch(updateFormState('email', value))}
        }
    }

)(RegisterEmailField);