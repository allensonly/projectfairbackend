import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  

  return (
    <>

<Card className='btn shadow text-center' onClick={handleShow}>
      <Card.Img variant="top" style={{height:'250px' }} src={`${BASE_URL}/uploads/${project.projectImage}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        
        
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Video Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
                
                <img width={'100%'} style={{height:'300px'}} src={`${BASE_URL}/uploads/${project.projectImage}`} alt="no image" />

            </Col>

            <Col md={6}>
              <h4>Description</h4>
              <p>{project.projectOverview}</p>
              <p><span className='fw-bolder'>Technologies</span> : {project.language}</p>
            </Col>
          </Row>


          <Row>
            <div className='mt-5 mb-3 d-flex '>

                <a href={project.github} className='me-4 ms-4'><i class="fa-brands fa-github fa-2xl"></i></a>
                <a href={project.website}><i class="fa-solid fa-link fa-2xl"></i></a>


            </div>

          </Row>
        </Modal.Body>
       
      </Modal>

      


    </>
  )
}

export default ProjectCard