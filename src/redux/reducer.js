const initialState = {
    appName: 'Kanban Board October',
    boardStatuses: [
        {id: "1", status: "Todo"},
        {id: "2", status: "In progress"},
        {id: "3", status: "In review"},
        {id: "4", status: "Done"},
    ],
    tasks: [
        {name: 'Learn redux', id: 111, description: 'do kanban with redux', status: 'Todo', priority: 5},
        {name: 'Learn axios', id: 112, description: 'do kanban with server', status: 'In progress', priority: 2},
        {
            name: 'Learn typescrypt',
            id: 113,
            description: 'do homework on typescrypt',
            status: 'In progress',
            priority: 3
        },
        {name: 'learn graphQL', id: 114, description: 'learn documentation', status: 'In review', priority: 8},
        {name: 'Learn unit tests', id: 115, description: 'join to webinar', status: 'Done', priority: 7},
        {name: 'Find a job', id: 116, description: 'good salary, remote', status: 'Done', priority: 10},
    ],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

const kanban = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_TASK':
            const updatedTask = state.tasks.filter((task) => task.id !== action.payload)
            return {...state, tasks: updatedTask};
        case 'CHANGE_PRIORITY':
            const value = action.payload.direction === 'up' ? 1 : -1;
            const newTasks = state.tasks.map((task) => task.id === action.payload.id ?
                {...task, priority: task.priority + value} : task)
            return {...state, tasks: newTasks};
        case 'MOVED_TASK':
            const stringArrayStatuses = state.boardStatuses.map(el => el.status)
            const currentStatusIndex = stringArrayStatuses.indexOf(action.payload.status)
            const newStatusIndex = currentStatusIndex + (action.payload.direction === 'left' ? -1 : 1)
            const newStatus = stringArrayStatuses[newStatusIndex];
            const newTasks2 = state.tasks.map((el) => el.id === action.payload.id ?
                {...el, status: newStatus} : el)
            return {...state, tasks: newTasks2}
        case 'CREATE_TASK':
            return {...state, tasks: [...state.tasks, action.payload]}

        case 'UPDATE_TASK':
            const updatedTasks2 = state.tasks.map((task) =>
                task.id === action.payload.id ? {...task, ...action.payload} : task)
            return {...state, tasks: updatedTasks2}

        default:
            return state
    }
}

export default kanban;