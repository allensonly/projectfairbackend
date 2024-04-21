import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProfileAPi } from '../services/allApi';

function Profile() {
  const [open,setOpen] = useState(false);

  const [isUpdate,setIsUpdate] = useState(false)

  const [userProfile,setUserProfile] = useState({
    username:'',
    email:'',
    password:'',
    github:'',
    linkedn:'',
    profile:''

  })

  //once an image is uploaded then that image will be stored in existing image
  const [existingImage,setExistingImage] = useState("")

  //to hold the url of the new image
  const [preview,setPreview] = useState('')

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('existingUser'))
    console.log(user);

    setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedn:user.linkedn,profile:''})

    setExistingImage(user.profile)
  },[isUpdate])

  useEffect(() => {
    if(userProfile.profile){
      setPreview(URL.createObjectURL(userProfile.profile))
    }
    else{
      setPreview("")
    }

  },[userProfile.profile])

  const handleProfileUpdate = async () =>{
    const {username,email,password,github,linkedn,profile} = userProfile

    if (!github || !linkedn ){

      toast.info('please fill form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedn",linkedn)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
    

    const token = sessionStorage.getItem('token')

    if(preview){
      const reqHeader ={
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`  
      }
      const result = await editProfileAPi(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        toast.success('profile updated successfully')
        sessionStorage.setItem('existingUser',JSON.stringify(result.data))
        setIsUpdate(true)
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
      const result = await editProfileAPi(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        toast.success('profile updated successfully')
        sessionStorage.setItem('existingUser',JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }

    }
  }



  }
  

  return (
    

      <div className='card shadow p-5 mb-5 '>
        <div className='d-flex justify-content-between'>
        <h1>profile</h1>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-info' ><i class="fa-solid fa-circle-down fa-xl"></i></button>
        </div>


        <Collapse open={open}>

        
        <div className='row d-flex justify-content-center flex-column mt-4'>

        <label htmlFor="profile" className='mb-5 text-center'>
          < input id='profile' type="file" style={{display:'none'}} onChange={(e)=> setUserProfile({...userProfile,profile:e.target.files[0]})} />
          
         { existingImage==""? <img style={{width:'200px' , height:'200px'}} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qMp3RM66v5flm1qdQm-xI8qajl0USrQT2A&usqp=CAU"} alt="no image" className='rounded-circle'/>  :

          <img style={{width:'200px' , height:'200px'}} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle'/>}
        </label>

        <div className='mb-3'>
          <input type="text" className='form-control' placeholder='Github' value={userProfile.github} onChange={(e)=> setUserProfile({...userProfile,github:e.target.value})}/>

        </div>
        <div className='mb-3'>
          <input type="text" className='form-control' placeholder='linkedn' value={userProfile.linkedn} onChange={(e)=> setUserProfile({...userProfile,linkedn:e.target.value})}/>

        </div>

        <div>
          <button className='btn btn-success rounded w-100' onClick={handleProfileUpdate}>Update</button>
        </div>



       </div>

       
        
        
        
        </Collapse>



        </div>


       

       




    
  )
}

export default Profile