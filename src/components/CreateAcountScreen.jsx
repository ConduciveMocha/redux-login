import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import RegisterUsernameField from './FormComponents/UsernameField'
import RegisterPasswordField from './FormComponents/PasswordField'
import RegisterEmailField from './FormComponents/EmailField'
import RegisterDOBField from './FormComponents/DOBField'
import Button from './FormComponents/Button'
import { submitForm , updateFormState} from '../actions/registration-actions'
import NO_ERROR from '../constants/NoError'

class CreateAccountScreen extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this)

    }

    

    handleSubmitRegistration(e) {

        if (!Object.values(this.props.formState).includes(''))
            this.props.submitForm(this.props.formState)
    }


    render() {
        console.log(this.state)
        return (
          <div id="create-account-screen">
            <form>
                    <RegisterUsernameField serverError={this.props.serverError}/>
                    <RegisterEmailField serverError={this.props.serverError}/>
                    <RegisterPasswordField serverError={this.props.serverError}/>
                    <RegisterDOBField serverError={this.props.serverError} />


            </form>
                <div>

                    <div className="back-button">
                        <Link to="">Back</Link>
                    </div>
                    <Button title={'submit'} action={this.handleSubmitRegistration} />

                </div>
          </div>
        );
    }
}




export default connect(
    (state) => {return{formState: state.registrationReducer.formState, serverError:state.registrationReducer.serverError}},
    (dispatch) => {
        return {
            submitForm: (formState) => {dispatch(submitForm(formState))},
            updateFormState: (key,value) => {dispatch(updateFormState(key,value))}
        }
    }
 )(CreateAccountScreen);