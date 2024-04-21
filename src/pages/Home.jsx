import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import titleimage from '../assets/images.jpg'
import ProjectCard from "../components/ProjectCard"
import { Link } from "react-router-dom"
import { homeProjectApi } from "../services/allApi"
import Header from "../components/Header"

function Home() {

  // state to store token

  const [isLogin,SetIsLogin] = useState(false)

  const [homeProject,setHomeProject] = useState([])

  const getHomeProject = async() =>{
    const result = await homeProjectApi()
    console.log(result.data);
    setHomeProject(result.data)
  }



  useEffect(() => {
      if(sessionStorage.getItem("token")){
        SetIsLogin(true)
      }
      else{
        SetIsLogin("")
      }
  },[])

  useEffect(() =>{
    getHomeProject()
  },[])

    return(
        <>
        <Header/>

        <div style={{width:"100%", height:'100vh' }} className="bg-success">

            <div className="container-fluid rounded ">

                <Row className="align-items-center p-5 mt-5">
                  
                  <Col sm={12} md={6} className="mt-5">

                    <h1 style={{fontSize:'80px'}}>Project Fair</h1>
                    <p className="text-light">one stop destination for all software development project</p>
                  
                    
                    {
                      isLogin?
                      <Link to={'/dashboard'}>
                      <button className="btn btn-success btn-border bg-dark rounded ">Manage Project <i class="fa-solid fa-arrow-right fa-2xl"></i></button>

                      </Link>
                      :
                      <Link to={'/login'}>
                      <button className="btn btn-success btn-border bg-dark rounded ">GET Started <i class="fa-solid fa-arrow-right fa-2xl"></i></button>

                      </Link>

                    }
                    
                    
                    
                    
            
                  
                  </Col>

                  <Col sm={12} md={6} className="mt-5">

                    <img className="w-100 " style={{borderRadius:'50%'}} src={titleimage} alt="" />
                  </Col>

                </Row>



            </div>




        </div>

        {/* section for all projects */}

        <div className="mt-5">
            <div className="text-center">
                <h1>EXPLORE THE PROJECTS</h1>
              
              <marquee behavior="onbounce" direction="right" scrollAmount={14}>
              <div className="d-flex">
                
               {homeProject?.length>0?
                 homeProject.map((item) =>(
                  <div className="ms-5" style={{width:'500px'}}>
                    
                    <ProjectCard  project = {item}/>

                </div>
                 ))
                
                : null
                }

                

                
              </div>
              </marquee>
              <div>
                <h3><Link to={'./project'} className="text-warning">See more Project</Link></h3>
              </div>



            </div>







        </div>

            
        
        
        </>
    )
}

export default Home