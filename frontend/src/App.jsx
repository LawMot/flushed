import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';
import Bathroom from './pages/Bathroom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/reviews' element={<ProtectedRoute><Reviews/></ProtectedRoute>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/createReview' element={<ProtectedRoute><CreateReview/></ProtectedRoute>}/>
        <Route path='/editReview' element={<ProtectedRoute><EditReview/></ProtectedRoute>}/>
        <Route path='/bathroom' element={<ProtectedRoute><Bathroom/></ProtectedRoute>}/>
      </Routes>
  )
}

export default App
