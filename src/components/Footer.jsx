import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{width:'100%',height:'300px'}}  className='d-flex  justify-content-center flex-column mt-5 bg-success'>
       <div className='footer d-flex align-items-center justify-content-evenly w-100  '>
       <div className='website mt-4 ' style={{width:'400px'}}>
       <h4><i class="fa-brands fa-r-project"></i> 
            Project-Fair</h4>
            <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, repellat porro minima architecto earum itaque rem omnis quaerat eos tempore mollitia vero, voluptate debitis eum odio molestias. Nesciunt, accusantium quod.</h6>
        </div> 
        <div className='link d-flex flex-column '>
  <h4>Links</h4>
  <Link to={'/'} style={{textDecoration:'none', color:'black'}}>Homepage</Link>
  <Link to={'/login'} style={{textDecoration:'none', color:'black'}}>Loginpage</Link>
  <Link to={'/register'} style={{textDecoration:'none', color:'black'}}>Register</Link>
   

        </div>
        <div className='guides d-flex flex-column '>
    <h4>Guides</h4>
    
  <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none'}}>Bootstrp</Link>
  <Link to={'https://react-bootstrap.netlify.app/'} style={{textDecoration:'none'}}>React Bootstrap</Link>
  <Link to={'https://bootswatch.com/'} style={{textDecoration:'none'}}>Bootswatch</Link>

        </div>
        <div className='contact '>
         <h4>Contact Us </h4>
         <div className='d-flex mb-3'>
          <input type="text" className='form-control ' placeholder='Enter your email-id'/>
          <button className='btn btn-dark text-white ms-3'>Subscribe</button>
         </div>

         <div className='d-flex justify-content-evenly  '>
         <Link to={'/home'} style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-facebook fa-2x "></i></Link>
         <Link to={'/home'} style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-twitter fa-2x "></i></Link>
         <Link to={'/home'} style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-instagram fa-2x "></i></Link>
         <Link to={'/home'} style={{textDecoration:'none', color:'white'}}><i class="fa-brands fa-linkedin fa-2x "></i></Link>






         </div>

        </div>
        
       </div>

       
       <p className='mt-5 text-center'>Copyright @ 2023 Media Player.Built with React</p>

       
    
    </div>
  )
}

export default Footer