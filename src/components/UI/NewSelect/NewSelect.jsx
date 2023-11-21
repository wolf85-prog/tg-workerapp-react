import React, { useState, useRef, useEffect } from 'react';
import classes from './NewSelect.module.css';
import tringlDown from "../../../image/newspec/tringl_down.png"

import specData from "../../../data/specData"

import Sound from "../../../image/spec/1_sound2.png";
import Riggers from "../../../image/spec/2_riggers.png";
import Production from "../../../image/spec/3_production.png";
import StageGround from "../../../image/spec/4_stage_ground.png";
import Video from "../../../image/spec/5_video.png";
import Light from "../../../image/spec/6_light2.png";
import Stagehands from "../../../image/spec/7_stagehands.png";
import Trucks from "../../../image/spec/8_trucks.png";
import Catering from "../../../image/spec/9_catering.png";
import Photo from "../../../image/spec/10_photo.png";
import Party from "../../../image/spec/11_party.png";


const NewSelect = ({id, options, title, onChange, selectedElement, disabled}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const options2 = ["options1", "options2", "options3", "options4", "options2", "options3", "options4", "options2", "options3", "options4"];
    const [state, setState] = useState({
        cursor: 0,
    });
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

    useEffect(()=> {
        console.log("options: ", options)
        //options.map((item)=>{
            specData.map((item)=> {
                //item.models.map((model)=> {
                    //if (model.name === item.name) {
                        let image
                        if (item.icon === 'Sound') {
                            image = Sound;
                        } else if (item.icon === 'Riggers') {
                            image = Riggers;
                        } else if (item.icon === 'Production') {
                            image = Production;
                        } else if (item.icon === 'Stage Ground') {
                            image = StageGround;
                        } else if (item.icon === 'Video') {
                            image = Video;
                        } else if (item.icon === 'Light') {
                            image = Light;
                        } else if (item.icon === 'Stagehands') {
                            image = Stagehands;
                        } else if (item.icon === 'Trucks') {
                            image = Trucks;
                        } else if (item.icon === 'Catering') {
                            image = Catering;
                        } else if (item.icon === 'Photo') {
                            image = Photo;
                        } else if (item.icon === 'Party') {
                            image = Party;
                        }

                        const newObj = {
                            icon: image,
                            name: item.name
                        }
                        arraySpec.push(newObj)
                    //}
                //})
            })
            console.log(arraySpec)
            setImage(arraySpec)
        //})
    },[specData])

    const menuRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
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
                                className={classes.listyle}
                            >
                                <img className={option.icon ? classes.imageCat : ""} src={option.icon ? image[index].icon : ""} alt=""/>
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