
import { Routes,Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

import Users from './pages/Users';
import UserPosts from './pages/UserPosts';
import Organization from './pages/Organization';
import RequireAdmin from './components/RequireAdmin';
import Logout from './pages/Logout';
import './App.css'
import OrgPost from './pages/OrgPost';
import Post from './pages/Posts';
function App() {
  return (
   <>
   <Toaster
   position='top-center'
   reverseOrde={false}
   />
   <Routes>
    <Route path='login' element={<Login/>}/>
    <Route element={<RequireAdmin/>}>
      <Route path='/' element={<Navbar/>}>
        <Route path='posts' element={<Post/>}></Route>
        <Route path ="organization" element={<Organization/>}/>
        <Route path ="posts/user/:userID" element={<UserPosts/>}/>
        <Route path ="posts/org/:orgID" element={<OrgPost/>}/>
        <Route path ='user' element={<Users/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='logout' element={<Logout/>}/>
      </Route>
    </Route>
    
    
   </Routes>

   </>
  );
}

export default App;
