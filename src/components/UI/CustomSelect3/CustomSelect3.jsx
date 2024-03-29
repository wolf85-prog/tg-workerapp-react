import React from 'react';
import classes from './CustomSelect3.module.css';
import {BsChevronDown} from "react-icons/bs";



const CustomSelect = ({id, options, title, onChange, selectedElement, disabled}) => {

    return (
        <div>
            <label htmlFor={id} style={{position: 'relative'}}>
                <select 
                    disabled={disabled} 
                    className={classes.mySelect} 
                    id={id} 
                    value={selectedElement} 
                    onChange={onChange}
                >
                    <option disabled value="">{title}</option>
                    { options.map((option, index) =>
                            <option key={id + index} value={option.id} >
                                {option.name}
                            </option>
                        )}
                </select>
                <BsChevronDown className={'chevron3'}/>
            </label>
        </div>
    );
};

export default CustomSelect;