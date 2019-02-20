import React from 'react';
import {connect} from 'react-redux'
import {updateFormState, checkUsernameExists} from '../../actions/registration-actions'
import FieldError from './FieldError'
import NO_ERROR from '../../constants/NoError'
export const UsernameField = ({ onChange, usernameFromLocal=null }) => {
    if (usernameFromLocal === null) usernameFromLocal='';
    return (
        <div className="username-container">
            <label>Username:
                <input
                    type="text"
                    onChange={onChange}
                    onFocus={(e)=>{e.target.placeholder =usernameFromLocal}}
                    placeholder={usernameFromLocal?usernameFromLocal:"username"}
                    
                ></input>
            </label>
        </div>
    );
};

const SimilarUsernameList = ({similarUsernames,handleClick}) => {
    let listElements =  similarUsernames.map((username) => <li onClick={handleClick}>{username}</li>) 
    return(
        <ul className="similar-username-list">
            {listElements}
        </ul>
    
    )
}


function makeLengthValidator(minLen, maxLen = -1) {

    if (maxLen < 0) {
        if (minLen < 0) throw Error("minLen must be positive");
        else return function (input) {
            return { value: input, isValid: minLen <= input.length };
        };
    }
    else {
        if (maxLen <= minLen) throw Error("Argument minLen is greater than argument maxLen")
        else return function (input) {
            return { value: input, isValid: minLen <= input.length && input.length <= maxLen }
        };
    }
}

class RegisterUsernameField extends React.Component{ 
    constructor(props){
        super(props)
        this.validator = makeLengthValidator(8)
        this.handleUsernameClick = this.handleUsernameClick.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        this.state= {viewError: NO_ERROR}
    }

    handleUsernameClick(e) {
        this.setState({...this.state, viewError:NO_ERROR})
        this.props.updateFormState(e.target.value)
    }

    handleUsernameChange(e) {
        let error = this.validator(e.target.value).isValid ? NO_ERROR : {
            showError:true, 
            errorMessage: "Username must be at least 8 characters long"
        }
        if (error == NO_ERROR)
            this.props.checkUsernameExists(e.target.value)
        this.setState({...this.state, viewError:error})
    }

    handleOnBlur(e){
        if(e.target.value.length===0){
            this.setState({...this.state, error:{showError:true,errorMessage:"Username Required"}})
        }
        if (this.state.viewError == NO_ERROR)
            this.props.updateFormState(e.target.value)
        else this.props.updateFormState('')
    }
    

    render() {
        return (
            <div className="register-username-container">
                <label>Username:
                    <input
                        type="text"
                        onChange={this.handleUsernameChange}
                        onBlur={this.handleOnBlur}
                    >
                    </input>
                </label>
                <FieldError 
                    viewError={this.state.viewError}
                    serverError={this.props.serverError}
                />
                <SimilarUsernameList
                    similarUsernames={this.props.similarUsernames}
                    handleClick={this.handleUsernameClick}
                />
            </div>

        )
    }
}



export default connect(
    (state)=> {
    return {
        similarUsernames: state.registrationReducer.similarUsernames,
        serverError: state.registrationReducer.serverError
    }},
    dispatch => {
        return {
            updateFormState: (value) => {dispatch(updateFormState('username',value))},
            checkUsernameExists: (username) =>{dispatch(checkUsernameExists(username))}
        }})(RegisterUsernameField)
