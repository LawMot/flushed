import './App.css'
import LogIn from './components/LogIn'
import CreateAccount from './components/CreateAccount'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';
import Bathroom from './pages/Bathroom';

function App() {
  return (
    <> 
   
    <CreateAccount />
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<LogIn/>}/>
    //     <Route path='/home' element={<Home/>}/>
    //     <Route path='/profile' element={<Profile/>}/>
    //     <Route path='/reviews' element={<Reviews/>}/>
    //     <Route path='/signUp' element={<SignUp/>}/>
    //     <Route path='/createReview' element={<CreateReview/>}/>
    //     <Route path='/editReview' element={<EditReview/>}/>
    //     <Route path='/bathroom' element={<Bathroom/>}/>
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
