import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"


// register api

export const registerapi = async(user) =>{
  return   await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

// login api

export const loginApi = async(user) => {
  return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")
}

//add project api

export const addProjectApi = async(reqBody,reqHeader) => {
  return await commonAPI('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//home project
export const homeProjectApi = async()=>{
  return await commonAPI('GET',`${BASE_URL}/projects/home-project`) 
}

// all project
export const allProjectApi = async(searchKey,reqHeader)=>{
  return await commonAPI('GET',`${BASE_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

// user project
export const allUserProjectAPi = async (reqHeader)=>{
  return await commonAPI('GET',`${BASE_URL}/user/all-project`,"",reqHeader)
}

//edit userProject

export const editProjectAPi = async (projectId,reqBody,reqHeader)=>{
  //path parameter - :id - router
  return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// delete project

export const deleteProjectAPi = async (projectId,reqHeader)=>{
  //path parameter - :id - router
  return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

//edit profile 

export const editProfileAPi = async (reqBody,reqHeader)=>{
  
  return await commonAPI('PUT',`${BASE_URL}/user/edit`,reqBody,reqHeader)
}





