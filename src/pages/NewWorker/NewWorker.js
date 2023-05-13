import React from 'react';
import Header from "../../components/Header/Header";
import './NewWorker.css';

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const NewWorker = () => {
    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            <form>
                {/*Имя*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Имя"
                                     id="worker_name"
                                     variant="filled"

                    />
                </div>

                {/*Фамилия*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Фамилия"
                                     id="worker_name"
                                     variant="filled"

                    />
                </div>

                {/*Сколько лет*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Сколько тебе полных лет"
                                     id="project_name"
                                     variant="filled"
                    />
                </div>

                {/*Сколько лет*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Номер телефона"
                                     id="project_name"
                                     variant="filled"
                    />
                </div>
            </form>
            
        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '2px solid #76A9FF',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default NewWorker;