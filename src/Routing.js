import './App.css';
import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom';
import Home from './components/home';
import Nopage from './components/nopage';
import LoginPage from './components/loginPage';
import Blogs from './components/blog/blogs';
import TeamMembers from './components/team';
import BlogDetails from './components/blogDetail';
import { ServiceProvider, useServices } from './services/ServiceContext';
// import { BlogInputForm } from './components/blogFormDialog';
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