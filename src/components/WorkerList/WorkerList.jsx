import React from 'react';
import WorkerItem from "../WorkerItem/WorkerItem";

const WorkerList = ({workers, remove}) => {
    
    return (
        <div style={{display: 'flex', marginLeft: '25px'}}>
            {workers.map((worker) =>
                // <WorkerItem remove={remove} worker={worker} key={worker.id} />
                //console.log(worker.spec.length)
                worker.spec
            ).join(' | ')}
        </div>
    );
};

export default WorkerList;