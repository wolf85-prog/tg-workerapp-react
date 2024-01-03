import React from 'react';
import WorkerItem from "../WorkerItem/WorkerItem";

const WorkerList = ({workers, remove}) => {
    return (
        <div style={{display: 'flex'}}>
            {workers.map((worker) =>
                <WorkerItem remove={remove} worker={worker} key={worker.id} />
            )}
        </div>
    );
};

export default WorkerList;