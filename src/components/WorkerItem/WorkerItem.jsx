import React from 'react';

import Sound from "../../image/layers/icons/SOUND.png";
import Riggers from "../../image/layers/icons/RIGGERS.png";
import Production from "../../image/layers/icons/PRODUCTION.png"
import StageGround from "../../image/layers/icons/STAGEGROUND.png";
import Video from "../../image/layers/icons/VIDEO.png";
import Light from "../../image/layers/icons/LIGHT.png";
import Stagehands from "../../image/layers/icons/STAGEHANDS.png";
import Trucks from "../../image/layers/icons/TRUCKS.png";
import Catering from "../../image/layers/icons/CATERING.png";
import Photo from "../../image/layers/icons/PHOTO.png";
import Party from "../../image/layers/icons/PARTY.png";

import {FormControl, InputBase, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {alpha, styled} from "@mui/material/styles";
import './WorkerItem.css'

import formSpec from "../../image/newspec/form_spec.png"
import iconDel from "../../image/newspec/icon_del.png"
import iconSound from "../../image/newspec/icon_sound.png"

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '21px',//theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 10,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        border: '2px solid #76A9FF',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


const WorkerItem = (props) => {
    let image;

    if (props.worker.icon === 'Sound') {
        image = Sound;
    } else if (props.worker.icon === 'Riggers') {
        image = Riggers;
    } else if (props.worker.icon === 'Production') {
        image = Production;
    } else if (props.worker.icon === 'Stage Ground') {
        image = StageGround;
    } else if (props.worker.icon === 'Video') {
        image = Video;
    } else if (props.worker.icon === 'Light') {
        image = Light;
    } else if (props.worker.icon === 'Stagehands') {
        image = Stagehands;
    } else if (props.worker.icon === 'Trucks') {
        image = Trucks;
    } else if (props.worker.icon === 'Catering') {
        image = Catering;
    } else if (props.worker.icon === 'Photo') {
        image = Photo;
    } else if (props.worker.icon === 'Party') {
        image = Party;
    }

    return (
        <div className="list_spec">

            <div className='form-new-spec'>
                <img src={image} alt='icon' style={{ marginLeft: '-55px', marginRight: '5px', width: '40px'}}/>
                {props.worker.spec}</div>

            <img src={iconDel} alt='icon' onClick={() => props.remove(props.worker)} style={{marginLeft: '5px', width: '5%'}}/>
        </div>
    );
};

export default WorkerItem;