 import { useFormik } from "formik";
 import * as Yup from "yup";
 
 export const FormToDo = (props)=>{
   const formik=props.formik;

    return (
        <>

         <textarea name="taskInput" id="inputTask" placeholder="Enter a task" {...formik.getFieldProps("taskInput")}></textarea>
         {
            formik.touched.taskInput && formik.errors.taskInput ? <p style={{color:"red"}}>{formik.errors.taskInput}</p> : null
         }
         <button type="submit" className="addBtn" > Add a Task</button>
         
        </>
    )
 }