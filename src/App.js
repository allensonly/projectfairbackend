
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Project from './pages/Project';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Auth from './components/Auth';

function App() {

  return (
    <div >


      

      <Routes>
        <Route path='/' element={ <Home/>}/>

        <Route path='/login' element = {<Auth/>} />
        <Route path='/project' element = {<Project/>} />
        <Route path='/register' element = {<Auth register/>} />  {/* variable = value ,for desturcturing passed as key=value pair */}
        
        <Route path='/dashboard' element ={<Dashboard dashboard/>}/>
        

      </Routes>


      <Footer/>



     
    </div>
  );
}

export default App;
