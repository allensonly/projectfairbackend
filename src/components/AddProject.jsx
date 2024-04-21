import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { addProjectApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext} from '../Contexts/ContextShare';


function AddProject() {

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)




  //state to hold value for the input box
  const [projectDetails,setProjectDetails] = useState({
    title:'',
    language:'',
    github:'',
    website:'',
    projectOverview:'',
    projectImage:''
  })
  console.log(projectDetails);

  const [token,setToken] = useState("")

  // to hold the url of the image
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(projectDetails.projectImage){

      //javascript predefined method -url-creteobjecturl -- files will be converted to url
    setPreview(URL.createObjectURL(projectDetails.projectImage))}
  },[projectDetails.projectImage])


  useEffect(() =>{
    if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))}
    else{
      setToken("")
    }

  },[])

 


  const [Show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    handleClose1()
  
  }



  const handleShow = () => setShow(true);

  const handleClose1 = () => {
         setProjectDetails({
          title:'',
          language:'',
          github:'',
          website:'',
          projectOverview:'',
          projectImage:''
         })
         setPreview("")
  }

  const handleAdd = async(e) => {
    
    e.preventDefault()

    const {title,language,github,website,projectOverview, projectImage} = projectDetails

    if( !title || !language || !github || !website || !projectOverview || !projectImage ){
      toast.info('please fill form completely')
    }
    else{
      //reqBody
      // if there is any uploading content from the system we should send the body in the form of formdata

      //1) create object for the class form data

      const reqBody = new FormData()

      //2)add value to form data -- append()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectOverview",projectOverview)
      reqBody.append("projectImage",projectImage)
      
        if(token) {
        const reqHeader ={
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`  // for authorisation -- bearerkeyword and single space
      }




      const result = await addProjectApi(reqBody,reqHeader)
      console.log(result);

      if(result.status === 200){
        toast.success('project successfully uploaded')
        handleClose()
        setAddProjectResponse(result.data)
        
        
      }
      else{
        console.log(result);
        toast.error(result.response.data)
      }
    
    
    }
    }

  }



  return (
    <><button className='btn btn-success' onClick={setShow}>Add Project</button>


<Modal
        size="lg"
        show={Show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Project Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col md={6}>
              

              <label  >
                <input type="file" style={{display:'none'}} onChange={(e) => setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                <img className='w-100' src={preview?preview:"https://media.licdn.com/dms/image/C4E12AQG2pj4JkZG0Yw/article-cover_image-shrink_600_2000/0/1520115601955?e=2147483647&v=beta&t=15dJ3ErnJfshcaCF1pn0x_PZO4-UeIeYayT1JR_1HY8"} alt="no image" />
              </label>

            </Col>

            <Col md={6}>

              

              <input type="text" placeholder='project Title' className='p-2 w-100 mt-2' value={projectDetails.title} onChange={(e) => setProjectDetails({...projectDetails,title:e.target.value})}/>

              <input type="text" placeholder='Language Used' className='p-2 w-100 mt-2' value={projectDetails.language} onChange={(e) => setProjectDetails({...projectDetails,language:e.target.value})}/>


              <input type="text" placeholder='Github Link' className='p-2 w-100 mt-2' value={projectDetails.github} onChange={(e) => setProjectDetails({...projectDetails,github:e.target.value})}/>

              <input type="text" placeholder='Website Link' className='p-2 w-100 mt-2' value={projectDetails.website} onChange={(e) => setProjectDetails({...projectDetails,website:e.target.value})}/>

              <input type="text" placeholder='project Overview' className='p-3 w-100 mt-2' value={projectDetails.projectOverview} onChange={(e) => setProjectDetails({...projectDetails,projectOverview:e.target.value})}/>


            </Col>
          </Row>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Clear
          </Button>
          <Button variant="success" onClick={handleAdd} >
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer  autoClose={2000} theme='colored' position='top-center' />


    </>
    
    
   




   






       


   






    
  )
}

export default AddProject