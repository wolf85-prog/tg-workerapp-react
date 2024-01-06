import React, {useEffect} from 'react';
import { useUsersContext } from "./../../contexts/UserContext";

const WorkerList = ({workers, remove, width}) => {

    const {widthStr, setWidthStr} = useUsersContext();

    useEffect(() => {
        let str = ''
        str = workers.map((worker) =>
            worker.spec
        ).join(' | ')

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = "16px Arial";        
        let widthX = Math.round(ctx.measureText(str).width);

        setWidthStr(widthX)

        //let widthD = width - (131 + 25*2)
    }, [workers, widthStr])


    return (
        <div style={{display: 'flex', marginLeft: '25px', whiteSpace: 'nowrap' /* Запрещаем перенос текста */}}>
            {workers.map((worker) =>
                worker.spec
            ).join(' | ')}
        </div>
    );
};

export default WorkerList;