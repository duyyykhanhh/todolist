// Under construction
import TaskItem from './TaskItem.js'


const TaskList = ({todoList, onOpenUpdateTaskHandler, onRemoveTaskHandler, onUpdateSttHandler}) => {
    const taskListRender = todoList.map((todo) => {
        return (
            <TaskItem 
            todo={todo}
            onOpenUpdateTaskHandler={onOpenUpdateTaskHandler}
            onRemoveTaskHandler={onRemoveTaskHandler} 
            onUpdateSttHandler={onUpdateSttHandler}
            />
        );
    });
    return (<div className="list-wrapper">
        {taskListRender}
    </div>)
}

export default TaskList