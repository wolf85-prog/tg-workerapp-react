import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect3.module.css';
import tringlDown from "../../../image/newspec/tringl_down.png"


const NewSelect3 = ({id, options, titleSpec, setTitleSpec, onChange, disabled}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [image, setImage] = useState([]);
    let arraySpec = []

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
        if (!disabled) {
           setOpen(!open); 
        }
        
    };

    return (
        <div>
            <div className={classes.dropdown}>
                <div className={classes.dropdownWrapper} ref={menuRef}>
                    <div className={classes.dropdownContainer}>
                        <div
                            className={classes.dropdownHeader}
                            onClick={handleClick}
                            tabIndex="0"
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
                                onClick={(e)=> {
                                        onChange(e)
                                        setSelected(option.name);
                                        //setTitleSpec(option.name)
                                        setOpen(false);
                                    }
                                }
                                className={classes.listyle}
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

export default NewSelect3;