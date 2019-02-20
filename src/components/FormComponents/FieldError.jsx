import React from 'react';
import NO_ERROR from '../../constants/NoError'
import PropTypes from 'prop-types'

const FieldError = ({ viewError, serverError  }) => {
    const error = viewError !== NO_ERROR ? viewError : serverError;

    return (
        <div className="field-error-container">
            <p className="field-error">{error.showError ? error.errorMessage : ''}</p> 
        </div>
    )
};
FieldError.proptypes = {
    viewError: PropTypes.shape({
        showError: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired
    }).isRequired,
    serverError: PropTypes.shape({
        showError: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired
    })
}
export default FieldError;