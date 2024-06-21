import { Route } from "react-router-dom"
import BlogDetails from "../components/blogDetail"
import Blogs from "../components/blogs"
import Home from "../components/home"
import Layout from "../components/layout"
import Nopage from "../components/nopage"
import TeamMembers from "../components/team"


const PublicRoutes = ()=>{
    return(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element ={<Home/>}></Route> 
            <Route path='blogs' >
              <Route index element={<Blogs />} />
              <Route path=":id" element={<BlogDetails />} />
            </Route> 
            <Route path='team' element ={<TeamMembers/>}></Route> 
            <Route path="*" element={<Nopage />} />
        </Route>
        
    )
}
export default PublicRoutes;