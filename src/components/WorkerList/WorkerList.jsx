import React from 'react';

const WorkerList = ({workers, remove, width}) => {
    let str = ''
    str = workers.map((worker) =>
        worker.spec
    ).join(' | ')

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    ctx.font = "16px Arial";        
    let widthX = Math.round(ctx.measureText(str).width);

    let widthD = width - (131 + 25*2)

    console.log(str, widthX, widthD)

    return (
        <div style={{display: 'flex', marginLeft: '25px'}}>
            {workers.map((worker) =>
                worker.spec
            ).join(' | ')}
        </div>
    );
};

export default WorkerList;