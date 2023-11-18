import React from 'react';
import {connect} from "react-redux";
import DeleteModal from "./DeleteModal";
import UpdateTaskModal from "./UpdateTaskModal";

const Card = (props) => {

    const {task, changePriority, priorities, moveTask, statuses} = props

    return (
        <div className="card">

            <div className="card-body">
                <h5 className="card-title">{task.name}</h5>
                <p className="card-text">{task.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <button type="button" className="btn btn-success"
                            onClick={() => changePriority(task.id, 'down')}
                            disabled={task.priority === priorities[0]}
                    >↓
                    </button>
                    {' '}
                    Priority: {task.priority}
                    {' '}
                    <button type="button" className="btn btn-success"
                            onClick={() => changePriority(task.id, 'up')}
                            disabled={task.priority === priorities[priorities.length - 1]}
                    >↑
                    </button>
                </li>


                <li className="list-group-item">{task.status}</li>

            </ul>
            <div className="card-body">
                <button type="button" className="btn btn-success"
                        onClick={() => moveTask('left', task.status, task.id)}
                        disabled={task.status === statuses[0].status}
                >←</button>
                <DeleteModal
                    task={task}
                />

                <UpdateTaskModal
                    task={task}
                />

                <button type="button" className="btn btn-warning"
                        onClick={() => moveTask('right', task.status, task.id)}
                        disabled={task.status === statuses[statuses.length -1].status}
                >→</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    statuses: state.boardStatuses
})

const mapDispatchToProps = (dispatch) => ({
    changePriority: (taskId, direction) => dispatch({
        type: 'CHANGE_PRIORITY',
        payload: {id: taskId, direction}
    }),
    moveTask: (direction, taskStatus,taskId) => dispatch({
        type: 'MOVED_TASK',
        payload: {
            direction: direction,
            status: taskStatus,
            id: taskId
        }
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);
