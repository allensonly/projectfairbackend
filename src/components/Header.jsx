import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header({dashboard}) {


  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('existingUser')
    

    // navigate to homepage
    navigate('/')
  }

  

  



  return (
    


    <>
    
    <div className='bg-success p-3 d-flex justify-content-between'>
        <h2 className='text-light ' style={{marginLeft:'150px'}}><i class="fa-brands fa-r-project"></i>Project Fair</h2>

        

            {
              dashboard&&

              <div>
                <button className='btn  bg-warning border rounded' onClick={handleLogout} ><i class="fa-solid fa-power-off" ></i >Logout</button>
              </div>
             



            }

        

          

          

          






        

        
    </div>

    
    
    
    </>
  )
}

export default Header