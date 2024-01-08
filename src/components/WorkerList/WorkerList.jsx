import React, {useEffect} from 'react';
import { useUsersContext } from "./../../contexts/UserContext";

const WorkerList = ({workers, remove, width}) => {

    const {widthStr, setWidthStr, setStr} = useUsersContext();

    useEffect(() => {

        let str = workers.slice(0).reverse().map((worker) =>
            worker.spec
        ).join(' | ')
        setStr(str)
        console.log("str1: ", str)
        
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = "14px Arial";        
        let widthX = Math.round(ctx.measureText(str).width);

        setWidthStr(widthX)
        //console.log("widthX1: ", widthX)

        //let widthD = width - (131 + 25*2)
    }, [workers])


    return (
        <div style={{display: 'flex', marginLeft: '25px', overflow: 'auto', whiteSpace: 'nowrap' /* Запрещаем перенос текста */}}>
            {workers.slice(0).reverse().map((worker, index) => 
                worker.spec
            ).join(' | ')}
        </div>
    );
};

export default WorkerList;