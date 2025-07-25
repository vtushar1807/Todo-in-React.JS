import {useEffect, useState} from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import { ToDoComp } from './Components/ToDoComp';
import { ModalToDo } from './Components/ModalToDo';
import { FormToDo } from './Components/FormToDo';


export const TodoWithModal = ()=>{

    //toDoArr holds the current tasks - needs to be added to local storage or to be removed
    const [toDoArr, setTodoArr]=useState([]);
    
    const[isModal, setModal]=useState(false);
    const [editTask, setEditTask]=useState("");
    const [editId, setEditId]=useState(null);


    //Retrieving todo data during initial render
    useEffect(()=>{
        let toDoData = JSON.parse(window.localStorage.getItem("todo"));
        toDoData && toDoData.length>0 ? setTodoArr(toDoData) : null;
    }, []);


    // Update toDoArr in local storage as it's value changes
    useEffect(()=> {
        toDoArr.length>0 ? window.localStorage.setItem("todo", JSON.stringify(toDoArr)) : window.localStorage.removeItem("todo");
    }, 
    [toDoArr]);


     const handleEdit = (editInput, id)=>{

        setModal((isModal) => !isModal);
        setEditTask(editInput);
        setEditId(id);
        console.log(editInput);
        
    }

    const handleSave = ()=>{
        const afterEdit = toDoArr.map( item => item.id===editId ?{...item, taskInput:editTask}  : item);
        setTodoArr(afterEdit);
        setModal(false)
    }

    function handleDelete (deleteId){
        const newTodoArr = toDoArr.filter((item) => item.id!==deleteId)
        setTodoArr(newTodoArr);
    }



    const formik = useFormik({

        initialValues:{
            taskInput:"",
            id:"",
        },

        validationSchema:Yup.object().shape({
            taskInput:Yup.string().required("Enter a task").max(60, "Task is too long"),
        }),

        validateOnChange:false,


        onSubmit:(values,{resetForm})=>{

            values.id=Date.now();

            setTodoArr((toDoArr) => [...toDoArr, values]);

            resetForm();            // reset the form, clears input field
            
            console.log("Form Submitted Successfully");
        }
    })


    return (
        <>
        <h1 id="todoTitle">Todo List</h1>


        <form onSubmit={formik.handleSubmit}>
        <div id="mainCont">
         <FormToDo formik={formik} />

         {
            toDoArr.length>0 ? <div className="task-cont"> 
            
                  {
                    toDoArr.map((item)=>(

                    <ToDoComp key={item.id} task={item.taskInput} edit={() => handleEdit(item.taskInput, item.id)} delete={() => handleDelete(item.id)}/>
                    ))
                  }
                </div>
            :
            null
         }
         </div>

         </form>

         <ModalToDo isModal={isModal} editFn={handleEdit} editValue={editTask} saveFn={handleSave} editChange={(event) => setEditTask(event.target.value)} blur={formik.handleBlur}/>

        </>
    )
}