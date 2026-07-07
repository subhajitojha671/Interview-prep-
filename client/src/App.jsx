import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from './pages/Auth/Login';
import SignUP from './pages/Auth/SignUP';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import LandingPage from "./pages/LandingPage";
import UserProvider from './context/userContext';
import AskAI from './pages/Home/AskAI';
import MockTest from './pages/Home/MockTest';



const App = () => {
  return (
    <UserProvider>
      <div>
      <Router>
        <Routes>
          {/* Default Routes  */}
          <Route path="/" element={<LandingPage />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/mock-test" element={<MockTest />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
          
        </Routes>
      </Router>

      <Toaster 
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px" ,
        },
      }}
      />
      
    </div>
    </UserProvider>
    
  )
}

export default App
