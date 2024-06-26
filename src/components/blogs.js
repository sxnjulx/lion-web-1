import { Link, Outlet } from "react-router-dom"
import { useServices } from "../services/ServiceContext"
import { useEffect, useState } from "react"
import BlogFormDialog from "./blogFormDialog"
import { Button } from "@headlessui/react"
import RightClickOptionContainer from './utills/rightClickOption'
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext"
import DeleteConfirmation from "./utills/deleteConfirmation"
import axios from "axios"
import LoggerService from "./utills/loggerSerivce"

const  Blogs= ()=>{
  let [posts, setPosts] = useState([])

  const {apiService,userStateService} = useServices()
  const {state, dispatch} = userStateService
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState();

  const [isDialogOpen , changeDialogOpen] = useState(false)

  const [blogId, setBlogId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);


  const [isDeleteConfirmOpen, setDeleterConfirmopen] = useState(false)


  const rightClickOptions =[
    {optionName: "Edit", onClickOption: ()=>{}},
    {optionName: "Delete", onClickOption: ()=>{}}
  ]
  const handleBlogPostClick = ()=>{}

  const handleBlogFromDialogClose = ()=>{
    changeDialogOpen(false);
    setIsUpdate(false);
    setBlogId(undefined);
  }
  // const handleClickEditRightClickOption = ()=>{
  //   console.log("click edit option"); 
  //   setIsUpdate(true);
  //   setBlogId();
  //   changeDialogOpen(true);

  // }

  const handleCancelDeleteOption = () =>{
    setDeleterConfirmopen(false);
  }
  
  const handleConfirmDeleteOption = async ()=>{
    try {
      const response = await axios.delete(`http://localhost:8080/deleteBlog/${blogId}`);
      console.log('Blog deleted successfully:', response.data);
      LoggerService.logSuccess("Blog Deleted Successfully")
      let updatedIndex = posts.findIndex((post)=>post.id === blogId)
      setPosts(prevBlogs => [
        ...prevBlogs.slice(0, updatedIndex), // Elements before the updated one
        ...prevBlogs.slice(updatedIndex + 1) // Elements after the updated one
      ]);
      // Optionally handle success feedback or redirect to another page
    } catch (error) {
      LoggerService.logFailure('Error deleting blog:'+ error);
      // console.error('Error deleting blog:', error);
      // Optionally handle error feedback
    }
    setBlogId(undefined)
    setDeleterConfirmopen(false);
  }
  const handleSubmit = async (formData) => {
    try {
      if (isUpdate){
        const formData1 = new FormData();
      
          // Iterate through sections and fetch blobs
          for (const section of formData.sections) {
            for (const image of section.images) {
                if (image.file ) {
                    // Use findIndex with a proper callback function to get the index
                    const sectionIndex = formData.sections.findIndex(s => s === section);
                    const imageIndex = section.images.findIndex(i => i === image);
                    const file = new File([image.file], `${sectionIndex}/${imageIndex}`, { type: "image/jpeg" });

                    formData1.append("files", file);
                    image.file = `${sectionIndex}/${imageIndex}`;

                }
            }
        }
      
          formData1.append("data", JSON.stringify(formData));
      
          const options = {
              method: "POST",
              body: formData1
          };
          fetch("http://localhost:8080/updateBlog", options)
              .then(response => response.json())
              .then(data => {
                setPosts(prevBlogs => [data, ...prevBlogs]);
                // console.log('Form submitted with data:', formData);
              })
              .catch(error => console.error("Error:", error));

        // const response = await axios.post('http://localhost:8080/updateBlog', formData); 
        // let updatedIndex = posts.findIndex((post)=>post.id === response.data.id)
        // setPosts(prevBlogs => [
        //   ...prevBlogs.slice(0, updatedIndex), // Elements before the updated one
        //   response.data,                      // The updated post
        //   ...prevBlogs.slice(updatedIndex + 1) // Elements after the updated one
        // ]);
        
      }else{

        // async function uploadDataAndBlob(data) {
          const formData1 = new FormData();
      
          // Iterate through sections and fetch blobs
          for (const section of formData.sections) {
            for (const image of section.images) {
                if (image.file ) {
                  // Use findIndex with a proper callback function to get the index
                  const sectionIndex = formData.sections.findIndex(s => s === section);
                  const imageIndex = section.images.findIndex(i => i === image);
                  const file = new File([image.file], `${sectionIndex}/${imageIndex}`, { type: "image/jpeg" });

                  formData1.append("files", file);
                  image.file = `${sectionIndex}/${imageIndex}`;
                }
            }
        }
      
          formData1.append("data", JSON.stringify(formData));
      
          const options = {
              method: "POST",
              body: formData1
          };
      
          fetch("http://localhost:8080/createBlog", options)
              .then(response => response.json())
              .then(data => {
                setPosts(prevBlogs => [data, ...prevBlogs]);
                console.log('Form submitted with data:', formData);
              })
              .catch(error => console.error("Error:", error));
      // }
      








        


        // const response = await axios.post('http://localhost:8080/createBlog', formData); 
        // setPosts(prevBlogs => [response.data, ...prevBlogs]);
        // console.log('Form submitted with data:', formData);
      }
      // const response = await axios.post('http://localhost:8080/createBlog', formData); 
      // console.log('Form submitted with data:', formData);
      handleBlogFromDialogClose(); // Close the dialog after form submission
      // sendGetBlogsRequest();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const sendGetBlogsRequest = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/getBlogs?page=${page}`);
        const reversedData = response.data.content.reverse();
        console.log(reversedData)
        setPosts(reversedData); // Update state with the fetched data
    } catch (err) {
        alert(err.message); // Update state with the error message
    }
  };

  useEffect(()=>{
    sendGetBlogsRequest();
  },[page])
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">user name is { state.USER_NAME }</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Lets serve the world.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Button onClick={(e)=>{changeDialogOpen(true)}} >Create New Blog</Button>
          <BlogFormDialog isOpen={isDialogOpen} onClose={handleBlogFromDialogClose} isUpdate= {isUpdate} handleSubmit={handleSubmit} blogId={blogId}/>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <RightClickOptionContainer key={post.id} rightClickOptions={[
                {
                  optionName: "Edit", 
                  onClickOption: ()=>{
                    console.log("click edit option"); 
                    setBlogId(post.id);
                    setIsUpdate(true);
                    changeDialogOpen(true);
                  }
                },
                {
                  optionName: "Delete", 
                  onClickOption: ()=>
                    {console.log("click copy Delete option");
                      setBlogId(post.id)
                      setDeleterConfirmopen(true);
                  }
                },
              ]} >
                <article key={post.id} className="flex max-w-xl flex-col items-start justify-between" onClick={handleBlogPostClick} >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    // href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.shortDescription}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  {/* <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {/* <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a> */}
                      <Link to={`/blogs/${post.id}`}>view more</Link>
                    </p>
                    {/* <p className="text-gray-600">{post.author.role}</p> */}
                  </div>
                </div>
              </article>              
                <DeleteConfirmation isOpen={isDeleteConfirmOpen} onCancel={handleCancelDeleteOption} onConfirm={handleConfirmDeleteOption}/>           
              </RightClickOptionContainer>
            ))}
          </div>
        </div>
        <div>
            <Outlet/>
        </div>
      </div>
    )
  }
export default Blogs