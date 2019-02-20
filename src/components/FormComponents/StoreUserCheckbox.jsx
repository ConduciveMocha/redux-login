import React from 'react';
import '../../App.css'

export const StoreUserCheckbox = ({ isChecked, onChecked=()=>{console.log('Clicked')} }) => {
    return (
        <div className="store-user-container">
            <label>Remember Username?
                <input 
                type="checkbox" 
                className="store-user-checkbox" 
                checked={isChecked} 
                onChange={onChecked}>
                </input>
            </label>
        </div>
    )
}