import React from 'react';
import FieldError from './FieldError';
import NO_ERROR from '../../constants/NoError';
import { updateFormState} from '../../actions/registration-actions'
import {connect} from 'react-redux'
import registrationReducer from '../../reducers/registration-reuducer'
class RegisterDOBField extends React.Component {    
constructor(props) {
        super(props)
        this.onChangeDOB = this.onChangeDOB.bind(this)
        this.state = { viewError:  NO_ERROR  ,  now: new Date(Date.now())}
    }
     checkAge(dob){
        const now = new Date(Date.now())
        const [curYear, curMonth, curDay] = now.toJSON().slice(0, 10).split('-')
        const [year, month, day] = dob.split('-')
        if (curYear - year < 18) return false;
        else if (curYear - year > 18) return true;
        else {
            if (month > curMonth) return true;
            else if (curMonth > month) return false;
            else {
                if (day > curDay) return true;
                else if (curDay > day) return false;
                else return true;
            }
        }
    }

    onChangeDOB(e) {
        console.log(e.target.value)

        

        if (this.checkAge(e.target.value)) {
            this.props.updateFormState('dob', e.target.value)
            this.setState({ ...this.state, viewError: NO_ERROR } )
        }
        else {
            if (this.state.viewError == NO_ERROR) {
                this.props.updateFormState('dob', '')
                this.setState({
                    ...this.state, viewError: {
                        showError: true,
                        errorMessage: "Must be 18 or over"
                    }
                })

            }
        }
    }


    render() {
        return (
          <div className="register-dob-field">
            
              <input
                type="date"
                
                onChange={this.onChangeDOB}
                // min="1900-01-01"
                // max={this.state.now.toJSON().slice(0,10)}
              />
            <FieldError viewError={this.state.viewError} serverError={this.props.serverError}/>
            

          </div>
        );
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
            
            updateFormState: (key, value) => { dispatch(updateFormState(key, value)) }
        }
    }
)(RegisterDOBField);