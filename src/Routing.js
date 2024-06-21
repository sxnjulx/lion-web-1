import './App.css';
import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom';
import Home from './components/home';
import Nopage from './components/nopage';
import LoginPage from './components/loginPage';
import Blogs from './components/blogs';
import TeamMembers from './components/team';
import BlogDetails from './components/blogDetail';
import { ServiceProvider, useServices } from './services/ServiceContext';
import { BlogInputForm } from './components/blogInput';
import PublicLayout from './components/publicLayout';
import SecureLayout from './components/secureLayout';

const AppRouting = () => {
  const { userStateService} = useServices()
  const {state, dispatch} = userStateService
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ state.IS_USER_AUTHENTICATED? <SecureLayout/> :<PublicLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="project" element={<Nopage />} />
              <Route path="aboutus" element={<Nopage />} />
              <Route path="contact" element={<Nopage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="blogs">
                <Route index element={<Blogs />} />
                <Route path=":id" element={<BlogDetails />} />
              </Route>
              <Route path="team" element={<TeamMembers />} />
              {/* <Route path="blogInput" element={ state.IS_USER_AUTHENTICATED? <BlogInputForm /> :< Navigate to={'/home'}/>} /> */}
              <Route path="*" element={< Navigate to={'/home/'}/>} />
          </Route>
          <Route path="*" element={< Navigate to={'/home'}/>} />

        </Routes>
      </BrowserRouter>
  );
};


export default AppRouting;

// import './App.css';
// import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom';
// import Layout from './components/layout';
// import Home from './components/home';
// import Nopage from './components/nopage';
// import LoginPage from './components/loginPage';
// import Blogs from './components/blogs';
// import TeamMembers from './components/team';
// import BlogDetails from './components/blogDetail';
// import { ServiceProvider, useServices } from './services/ServiceContext';
// import { BlogInputForm } from './components/blogInput';

// const AppRouting = () => {
//   const { userStateService} = useServices()
//   const {state, dispatch} = userStateService
//   return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             {/* Public Routes */}
//             <Route path="public/*">
//               <Route index element={<Home />} />
//               <Route path="home" element={<Home />} />
//               <Route path="project" element={<Nopage />} />
//               <Route path="aboutus" element={<Nopage />} />
//               <Route path="contact" element={<Nopage />} />
//               <Route path="login" element={<LoginPage />} />
//               <Route path="blogs">
//                 <Route index element={<Blogs />} />
//                 <Route path=":id" element={<BlogDetails />} />
//               </Route>
//               <Route path="team" element={<TeamMembers />} />
//               {/* <Route path="login" element={<LoginPage />} />   */}
//               <Route path="*" element={< Navigate to={'/public/'}/>} />
//             </Route>
            
//             {/* Secure Routes */}
//             <Route path="secure/*">
//               <Route path="blogInput" element={ state.IS_USER_AUTHENTICATED? <BlogInputForm /> :< Navigate to={'/public/'}/>} />
              
//               {/* Secure route components */}
//             </Route>

//             {/* Default Route within Layout */}
//             <Route path="*" element={< Navigate to={'/public/'}/>} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//   );
// };


// export default AppRouting;

