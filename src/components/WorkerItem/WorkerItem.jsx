import React from 'react';
import Sound from "../../image/spec/1_sound.svg";
import Riggers from "../../image/spec/2_riggers.svg";
import Production from "../../image/spec/3_production.svg";
import StageGround from "../../image/spec/4_stage_ground.svg";
import Video from "../../image/spec/5_video.svg";
import Light from "../../image/spec/6_light.svg";
import Stagehands from "../../image/spec/7_stagehands.svg";
import Trucks from "../../image/spec/8_trucks.svg";
import Catering from "../../image/spec/9_catering.svg";
import Photo from "../../image/spec/10_photo.svg";
import Party from "../../image/spec/11_party.svg";

import {FormControl, InputBase, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {alpha, styled} from "@mui/material/styles";
import './WorkerItem.css'

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
            <img src={image} alt='icon'/>

            <FormControl sx={{marginLeft: '7px', marginBottom: '20px', width: '75%'}} style={{border: '2px, solid, #76A9FF'}} variant="standard">
                <InputLabel shrink htmlFor="bootstrap-input" style={{color: '#76A9FF'}}>
                    {props.worker.cat}
                </InputLabel>
                <BootstrapInput
                    defaultValue=""
                    id="bootstrap-input"
                    value={props.worker.spec}
                />
            </FormControl>

            <DeleteIcon
                style={{marginLeft: "5px", color: '#76A9FF', position: 'relative'}}
                onClick={() => props.remove(props.worker)}
            />
        </div>
    );
};

export default WorkerItem;