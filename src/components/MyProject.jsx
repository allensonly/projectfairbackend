import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AddProject from './AddProject';
import { allUserProjectAPi, deleteProjectAPi } from '../services/allApi';
import { addProjectResponseContext, editProjectResponseContext } from '../Contexts/ContextShare';
import EditProject from './EditProject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyProject() {

  const{addProjectResponse,setAddProjectResponse} =  useContext(addProjectResponseContext)

  const{editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [userProject,setUserProject] = useState([])


  const getUserProject = async () =>{

    const token = sessionStorage.getItem('token')

    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }


    const result = await allUserProjectAPi(reqHeader)
    console.log(result);

    setUserProject(result.data)
  }

  useEffect(() =>{
    getUserProject()
  },[addProjectResponse,editProjectResponse])


  const handleDelete = async (id) =>{
    const token = sessionStorage.getItem('token')

    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }

    const result = await deleteProjectAPi(id,reqHeader)
    console.log(result);
    if(result.status === 200){
      getUserProject()
    }
    else{
      toast.error(result.response.data)
    }
  }




  return (
    <>
   <div className='container shadow '>
   <Card style={{ width: '100%' }}>
      <Card.Body>

        <div className='justify-content-between d-flex mb-4 mt-3'>
        <Card.Title ><span style={{color:'green', fontSize:'30px'}}>My projects</span></Card.Title>

        <AddProject/>

        </div>
       <div>
       { userProject?.length>0?userProject?.map((item) => (<div className='border p-3 shadow d-flex justify-content-between'>

  <h5>{item.title}</h5>



<div className='d-flex'>
  <EditProject project = {item}/>
<a href={item.github} className='btn btn-outline-success p-2 m-2 round'><i class="fa-brands fa-github"></i></a >
<button className='btn btn-outline-danger p-2 m-2 round' onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash"></i></button>
</div>

</div>))
:

<div className='mt-5 text-danger'>
<h4>no project added yet</h4>
</div>}
       </div>
      </Card.Body>
    </Card>
   </div>
    
    
    
   <ToastContainer  autoClose={2000} theme='colored' position='top-center' />

    </>
  )
}

export default MyProject