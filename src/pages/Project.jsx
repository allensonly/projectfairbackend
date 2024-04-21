import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {

  const [allProject,setAllProject] = useState([])
  const [isToken,setIsToken] = useState(false)

  const [searchKey,setSearchKey] = useState("")
  /* console.log(searchKey); */

  const getAllProject = async() => {

    if(sessionStorage.getItem('token')){

      const token = sessionStorage.getItem('token')

      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }

      const result = await allProjectApi(searchKey,reqHeader)
    /* console.log(result.data); */
    setAllProject(result.data)

    }
   

  }

 useEffect(() =>{
  getAllProject()
 },[searchKey])

 useEffect(() =>{
  if(sessionStorage.getItem('token')){
    setIsToken(true)
  }
 },[])

  return (
    <>

<Header/>
    

<div className='text-center' style={{marginTop:'150px'}}>
        <h1>All Project</h1>

        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex w-25 mt-5">
            <input className='form-control' type="text" placeholder='Search the project using technologies'value={searchKey} onChange={e=>setSearchKey(e.target.value)} />
            <i style={{marginLeft:'-40px', color:'grey'}} class="fa-solid fa-magnifying-glass  fa-rotate-90"></i>
            </div>
            
        </div>
        <Row className='mt-5 container-fluid'>
           {
           allProject?.length>0? 
           allProject.map((item)=>( <Col sm={12} md={6} lg={4}>
            <ProjectCard project={item}/>
         </Col>))
          :<div className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'200px'} height={'200px'} src='https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif' alt='no image'/>
            <p className='text-danger fw-3 fs-3'>Please <Link to={'/login'}>Login</Link> to view Projects</p></div>
          }
        </Row>
    </div>
         


    </>
  )
}

export default Project