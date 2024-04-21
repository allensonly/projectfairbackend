import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard(dashboard) {
  

  const [username,setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  }
  },[])
  return (
    <>

    <Header dashboard={dashboard}/>

    <div >
    <h1>Welcome <span style={{color:'orange'}}>{username}</span></h1>
    </div>



    <Row className='container-fluid mt-5'>

      <Col sm={12} md={8}>
        
        <MyProject/>

      </Col>

      <Col sm={12} md={4}>
        <Profile/>
      </Col>





    </Row>
    
    
    
    
    </>
  )
}

export default Dashboard