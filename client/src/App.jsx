
import './App.css'
import React from 'react'
import {BrowserRouter as Router , Routes ,Route, Form} from 'react-router';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SessionForm from './pages/admin/SessionForm';
import Subject from './pages/admin/Subject';
import Examinee from './pages/admin/Examinee';
import Examination from './pages/admin/Examination'
import QuestionBank from './pages/admin/QuestionBank';
import UserDash from './pages/user/UserDash';
import MyExam from './pages/user/MyExam';
import MyResult from './pages/user/MyResult';
import Message from './pages/user/Message'
import GetExam from './pages/user/GetExam';

import DashboardHome from './pages/user/DashboardHome';
import ChangePassword from './pages/user/ChangePassword';
import ReportGenration from './pages/admin/ReportGenration';
import ReportDeclaration from './pages/admin/MessageReply'
import ChangePasswords from './pages/admin/ChangePasswords';
import DashboardAdmin from './pages/admin/DashboardAdmin';


function App() {
 

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        {/* Admin routes start */}
        <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        <Route path='/addash' element={<AdminDashboard/>}>
        <Route index element={<DashboardAdmin/>}></Route>
         <Route path='sesion' element={<SessionForm/>}></Route>
         <Route path='subject' element={<Subject/>}></Route>
         <Route path='examinee' element={<Examinee/>}></Route>
         <Route path='reportgenration' element={<ReportGenration/>}></Route>
         <Route path='reportdeclaration' element={<ReportDeclaration/>}></Route>
         <Route path='examination' element={<Examination/>}></Route>
         <Route path='changepass' element={<ChangePasswords/>}></Route>
         <Route path='question' element={<QuestionBank/>}></Route>
        </Route>
        {/* Admin routes end */}
        {/* user routes start */}
        <Route path='/userdash' element={<UserDash/>}>
        <Route index element={<DashboardHome/>}></Route>
        <Route path='myexam' element={<MyExam/>}></Route>
        <Route path='myresult' element={<MyResult/>}></Route>
        <Route path='getexam/:id' element={<GetExam/>}></Route>
        
        <Route path='message' element={<Message/>}></Route>
        <Route path='changepass' element={<ChangePassword/>}></Route>
        </Route>
        {/* user routes end */}
        
        
      </Routes>
      
     </Router>
    </>
  )
}

export default App
