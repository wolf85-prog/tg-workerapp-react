import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect.module.css';
import tringlDown from "../../../image/newspec/tringl_down.png"


const NewSelect = ({id, options, title, onChange, selectedElement, disabled}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const options2 = ["options1", "options2", "options3", "options4", "options2", "options3", "options4", "options2", "options3", "options4"];
    const [state, setState] = useState({
        cursor: 0,
    });

    useEffect(() => {
        let handler = (e) => {
          if (!menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      }, []);

    const menuRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    return (
        <div>
            {/* <label htmlFor={id}>
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
                <img src={tringlDown} className={'chevron-new'} alt=''/>
            </label> */}

            <div className={classes.dropdown}>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
                            // onChange={onChange}
                        >
                            <div className={classes.dropdownTitle}>
                                {selected ? selected : ""}
                            </div>
                            <img src={tringlDown} className={'chevron-new'} alt=''/>
                        </div>
                    </div>
                    {open && (
                        <ul className={classes.listitem}>
                        {options.map((option, index) =>
                            <li 
                                key={id + index} 
                                value={option.id} 
                                // onClick={() => {
                                //     setSelected(option.name);
                                //     console.log(option.name)
                                //     setOpen(false);
                                // }}
                                onClick={(e)=> {
                                        onChange(e)
                                        setSelected(option.name);
                                        setOpen(false);
                                    }
                                }
                                className={state.cursor === index ? classes.activeList : ""}
                            >
                                {option.name}
                            </li>
                        )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewSelect;