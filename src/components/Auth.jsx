import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, json, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginApi, registerapi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Contexts/ContextShare'


function Auth({register}) {




    // to hold the valuefrom input box
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    console.log(userData);
    const navigate = useNavigate()

    const registerForm = register?true:false
    
    //register function

    const handleRegister = async(e) =>{

        e.preventDefault()

        const {username,email,password} = userData

        if( !username || !email || !password){
            toast.info("please fill the form completely")
        }
        else{
            const result = await registerapi(userData)
            /* console.log(result); */

            if(result.status == 200){
                toast.success(`${result.data.username} is successfully registered`)
                // to set the userdata empty
                setUserData({
                    username:"",
                    email:"",
                    password:""

                })
                // move to login
                navigate('/login')
            }
            else{
                toast.error(result.response.data)
            }


        }
     
        

    }

    //login function

    const handleLogin = async (e) => {
        

        //destructure
        const {email,password} = userData

        if(!email|| !password){
            toast.info('please fill the form completely')
        }
        else{
            const result = await loginApi(userData)
            console.log(result);

            if(result.status == 200){
                toast.success('login successfull')

                sessionStorage.setItem('existingUser',JSON.stringify(result.data.existingUser))
                sessionStorage.setItem('token',result.data.token)

                setUserData({
                    username:"",
                    email:"",
                    password:""

                })
                
                e.preventDefault()

                //navigate to home
                setTimeout(()=>{
                    navigate('/')
                },2000)
                


            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    





  return (
    <>
  
    <div className='d-flex justify-content-center align-items-center flex-column' style={{marginTop:'100px'}}>

        <div className='container w-75'>
        <Link to={'/'}> <i class="fa-solid fa-arrow-left fa-2xl"></i> Back to main page</Link>

        </div>

        <div className='bg-success p-5 container w-75'>

            <Row>

                <Col md={6}>
                <img style={{width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4acrD0q110pSYKdf4IBTxHTraqUpKABvrw&usqp=CAU" alt="" />
                
                </Col>
                <Col md={6}>

                    <div className='align-items-center justify-content-center'>

                        <h2 className='text-light text-center  '><i class="fa-brands fa-r-project"></i> Project Fair</h2>

                        <p className='text-light text-center mt-3'>
                           { 
                            registerForm?"Sign up to your account"   :         "Sign in to your Account "
                            
                            }
                            
                            </p>

                        <Form>

                            {
                                registerForm&&

                                <Form.Group className="mb-3 " controlId="forBasicEmail">
                                
                                <Form.Control type="text " placeholder="Username" onChange={(e) => setUserData({...userData,username:e.target.value})} value={userData.username}/>
                                </Form.Group>
                            }



                                <Form.Group className="mb-3 " controlId="forBasicEmail">
                                
                                <Form.Control type="email " placeholder="Enter e-mail id" onChange={(e) => setUserData({...userData,email:e.target.value})} value={userData.email}/>
                                </Form.Group>




                                <Form.Group className="mb-3 " controlId="forBasicEmail">
                                
                                <Form.Control type="password " placeholder="password" onChange={(e) => setUserData({...userData,password:e.target.value})} value={userData.password} />
                                </Form.Group>




                        </Form>

                        {
                            
                            
                            registerForm?
                            
                           <div className='mt-3'>

                             <button className='btn rounded bg-warning' onClick={ handleRegister}>Register</button>
                             <p className='mt-3'>already a user?Click here to<Link to={'/login'}>Login</Link></p>

                           </div>
                            
                            :
                            
                            
                           <div className='mt-3'>
                             <button className='btn rounded bg-warning' onClick={handleLogin}>Login</button>
                             <p className='mt-3'>New user? Click here to <Link to={'/register'} >Register</Link> </p>
                           </div>





                        }

                        


                    
                    </div>

                    
                 

                       

                   




                
                
                </Col>
            </Row>

        </div>
       


    </div>

     

    <ToastContainer  autoClose={2000} theme='colored' position='top-center' />
    </>
  )
}

export default Auth