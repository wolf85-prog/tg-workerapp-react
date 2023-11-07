import React from 'react';
import classes from './NewSelect.module.css';
import {BsChevronDown} from "react-icons/bs";
import tringlDown from "../../../image/newspec/tringl_down.png"


const NewSelect = ({id, options, title, onChange, selectedElement, disabled}) => {

    return (
        <div>
            <label htmlFor={id}>
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
                {/* <BsChevronDown className={'chevron'}/> */}
                <img src={tringlDown} className={'chevron-new'} alt=''/>
            </label>
        </div>
    );
};

export default NewSelect;