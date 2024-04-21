import { useContext, useEffect, useState } from 'react';
import React  from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function EditProject({project}) {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

    const [Show, setShow] = useState(false);
    const [preview,setPreview] = useState("")

    const [projectDetails,setProjectDetails] = useState({
      id:project._id,
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      projectOverview:project.projectOverview,
      projectImage:""
    })

  const handleClose = () => {setShow(false);
    handleClose1()
  
  }



  const handleShow = () => setShow(true);

  useEffect(() =>{
    if (projectDetails.projectImage){
    setPreview(URL.createObjectURL(projectDetails.projectImage))}
  },[projectDetails.projectImage])

  const handleUpdate = async () => {
     const {id,title,language,github,website,projectOverview,projectImage} = projectDetails

     if(!title || !language|| !github || !website || !projectOverview || !projectDetails ){
      toast.info("please fill the form completely")
     }

     else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectOverview",projectOverview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)


      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader ={
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`  // for authorisation -- bearerkeyword and single space
        }

        const result = await editProjectAPi(id,reqBody,reqHeader)
        console.log(result);
        if(result.status === 200){
          console.log(result.data);
          toast.success('updated successfully')
          setEditProjectResponse(result.data)
          handleClose()
        }
        else{
          console.log(result.response.data);

        }


      }
        
      else{
       
        const reqHeader = {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
        const result = await editProjectAPi(id,reqBody,reqHeader)
        console.log(result);

        if(result.status === 200){
          console.log(result.data);
          toast.success('updated successfully')
          setEditProjectResponse(result.data)
          handleClose()
        }
        else{
          console.log(result.response.data);

        }
      }

      }

     }
  


  // to remove only edited content
  const handleClose1 = () =>{
    setProjectDetails({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      projectOverview:project.projectOverview,
      projectImage:""
      
    })
    setPreview("")
  }



  return (
    <>

<button className='btn  p-2 m-2 round ' onClick={handleShow}><i class="fa-solid fa-pen-to-square text-info"></i></button>

<Modal
        size="lg"
        show={Show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Project Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col md={6}>
              

              <label  >
                <input type="file" style={{display:'none'}} onChange={(e) => setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                <img className='w-100 img-fluid' src={`${BASE_URL}/uploads/${project.projectImage}`} alt="no image" />
              </label>

            </Col>

            <Col md={6}>

              

              <input type="text" placeholder='project Title' className='p-2 w-100 mt-2' value={projectDetails.title} onChange={(e) => setProjectDetails({...projectDetails,title:e.target.value})}/>

              <input type="text" placeholder='Language Used' className='p-2 w-100 mt-2' value={projectDetails.language} onChange={(e) => setProjectDetails({...projectDetails,language:e.target.value})} />


              <input type="text" placeholder='Github Link' className='p-2 w-100 mt-2' value={projectDetails.github} onChange={(e) => setProjectDetails({...projectDetails,github:e.target.value})} />

              <input type="text" placeholder='Website Link' className='p-2 w-100 mt-2' value={projectDetails.website} onChange={(e) => setProjectDetails({...projectDetails,website:e.target.value})} />

              <input type="text" placeholder='project Overview' className='p-3 w-100 mt-2' value={projectDetails.projectOverview} onChange={(e) => setProjectDetails({...projectDetails,projectOverview:e.target.value})}/>


            </Col>
          </Row>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1} >
            Clear
          </Button>
          <Button variant="success" onClick={handleUpdate} >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    
      <ToastContainer  autoClose={2000} theme='colored' position='top-center' />
    </>
  )
}

export default EditProject