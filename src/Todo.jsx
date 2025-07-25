import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Todo = ()=>{

    //toDoArr holds the current tasks - needs to be added to local storage or to be removed
    let [toDoArr, setTodoArr]=useState([]);
    
    


    //Retrieving todo data during initial render
    useEffect(()=>{
        let toDoData = JSON.parse(window.localStorage.getItem("todo"));

        toDoData && toDoData.length>0 ? setTodoArr(toDoData) : null;
    }, []);



    // Update toDoArr in local storage as it's value changes
    useEffect(()=> {
        toDoArr.length>0 ? window.localStorage.setItem("todo", JSON.stringify(toDoArr)) : window.localStorage.removeItem("todo");
    }, [toDoArr]);


    function handleDelete (deleteId){

        const newTodoArr = toDoArr.filter((item) => item.id!==deleteId)
        setTodoArr(newTodoArr);
    }

    

    const formik = useFormik({

        initialValues:{
            taskInput:"",
            // id:Date.now(),       //every time assigning same id to the tasks
            id:"",
        },

        validationSchema:Yup.object().shape({
            taskInput:Yup.string().required("Enter a task").max(60, "Task is too long"),
        }),

        // validateOnChange:false,


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


         <textarea name="taskInput" id="inputTask" placeholder="Enter a task" {...formik.getFieldProps("taskInput")}></textarea>
         {
            formik.touched.taskInput && formik.errors.taskInput ? <p style={{color:"red"}}>{formik.errors.taskInput}</p> : null
         }
         
         <button type="submit" className="addBtn" > Add a Task</button>



         
         {

            toDoArr.length>0 ? <div className="task-cont"> 
            
                  {
                    toDoArr.map((item)=>(

                    <div className='taskCont' key={item.id}>
                        <p className='taskPara-class'>{item.taskInput}</p>

                        <div className="button-grp">
                        <button id="editBtn" className="task-button ">Edit</button>
                        <button id="deleteBtn" className="task-button" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                    ))

                  }

                </div>
            :

            null
         }
         

         </div>
         </form>



        </>
    )
}