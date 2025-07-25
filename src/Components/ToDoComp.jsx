export const ToDoComp = (props)=>{

    return(

         <div className='taskCont' key={props.id}>
            <p className='taskPara-class'>{props.task}</p>

            <div className="button-grp">
            <button type="button" id="editBtn" className="task-button " onClick={props.edit}>Edit</button>
            <button type="button" id="deleteBtn" className="task-button" onClick={props.delete}>Delete</button>
            </div>
        </div>

    )
}