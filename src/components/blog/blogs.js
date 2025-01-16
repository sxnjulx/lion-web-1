import { Link, Outlet } from "react-router-dom"
import { useServices } from "../../services/ServiceContext"
import { useEffect, useState } from "react"
import BlogFormDialog from "./blogFormDialog"
import { Button } from "@headlessui/react"
import RightClickOptionContainer from '../utills/rightClickOption'
import DeleteConfirmation from "../utills/deleteConfirmation"
import axios from "axios"
import LoggerService from "../utills/loggerSerivce"
import Pagination from "../utills/Pagination"

const Blogs = () => {
  let [posts, setPosts] = useState([])
  const { apiService, userStateService } = useServices()
  const { state, dispatch } = userStateService
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the number of items per page
  const [totalPages, setTotalPages] = useState(0);

  const [isDialogOpen, changeDialogOpen] = useState(false)
  const [blogId, setBlogId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleteConfirmOpen, setDeleterConfirmopen] = useState(false)

  const rightClickOptions = [
    { optionName: "Edit", onClickOption: () => { } },
    { optionName: "Delete", onClickOption: () => { } }
  ]

  const handleBlogPostClick = () => { }

  const handleBlogFromDialogClose = () => {
    changeDialogOpen(false);
    setIsUpdate(false);
    setBlogId(undefined);
  }

  const handleCancelDeleteOption = () => {
    setDeleterConfirmopen(false);
  }

  const handleConfirmDeleteOption = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteBlog/${blogId}`);
      LoggerService.logSuccess("Blog Deleted Successfully")
      let updatedIndex = posts.findIndex((post) => post.id === blogId)
      setPosts(prevBlogs => [
        ...prevBlogs.slice(0, updatedIndex),
        ...prevBlogs.slice(updatedIndex + 1)
      ]);
    } catch (error) {
      LoggerService.logFailure('Error deleting blog:' + error);
    }
    setBlogId(undefined)
    setDeleterConfirmopen(false);
  }

  const handleSubmit = async (formData) => {
    try {
      const formData1 = new FormData();
      if (formData.authorImage != null) {
        const authorImage = formData.authorImage;
        if (authorImage.id == null) {
          formData1.append("files", authorImage.file)
          formData.authorImage.file = "newFile";
        } else {
          if (authorImage.file != null) {
            formData1.append("files", authorImage.file)
            formData.authorImage.file = undefined;

          } else {
            if (authorImage.URL == null) {
              formData.authorImage.file = undefined
              if (formData.authorImage.backChanges) {
                formData.authorImage.file = "fileRemoved"
              } else {
                formData.authorImage.file = undefined
              }
            } else {
              formData.authorImage.file = "fileNotUpadated"
            }
          }
        }
        const temp = {
          id: formData.authorImage.id,
          file: formData.authorImage.file,
          url: formData.authorImage.url
        }
        formData.authorImage = temp;
      }
      for (const section of formData.sections) {
        for (const image of section.images) {
          if (image.file) {
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
      await fetch(isUpdate ? "http://localhost:8080/updateBlog" : "http://localhost:8080/createBlog", options)
        .then(response => response.json())
        .then(data => {
          if (isUpdate) {
            const prev = [...posts];
            const updatedPostId = prev.findIndex(post => post.id === data.id)
            prev[updatedPostId] = data
            setPosts(prev)
          } else {
            setPosts(prevBlogs => [data, ...prevBlogs]);
          }
          handleBlogFromDialogClose();
        })
        .catch(error => console.error("Error:", error));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const sendGetBlogsRequest = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8080/getBlogs?page=${page}`);
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    sendGetBlogsRequest(currentPage - 1);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From The Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Lets serve the world.
          </p>
        </div>
        { state.IS_USER_AUTHENTICATED &&
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Button onClick={(e) => { changeDialogOpen(true) }}>Create New Blog</Button>
          <BlogFormDialog isOpen={isDialogOpen} onClose={handleBlogFromDialogClose} isUpdate={isUpdate} handleSubmit={handleSubmit} blogId={blogId} />
        </div>
          }
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <RightClickOptionContainer key={post.id} rightClickOptions={state.IS_USER_AUTHENTICATED?
              [
                {
                  optionName: "Edit",
                  onClickOption: () => {
                    setBlogId(post.id);
                    setIsUpdate(true);
                    changeDialogOpen(true);
                  }
                },
                {
                  optionName: "Delete",
                  onClickOption: () => {
                    setBlogId(post.id)
                    setDeleterConfirmopen(true);
                  }
                },
              ]
              : []
            } >
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between" onClick={handleBlogPostClick} >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Blog by {post.author}
                  </a>
                  <img src={post.authorImage?.accessURL} alt="author image" className="h-10 w-10 rounded-full bg-gray-50" />
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.initialParagraph}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <Link to={`/blogs/${post.id}`}>view more</Link>
                    </p>
                  </div>
                </div>
              </article>
              <DeleteConfirmation isOpen={isDeleteConfirmOpen} onCancel={handleCancelDeleteOption} onConfirm={handleConfirmDeleteOption} />
            </RightClickOptionContainer>
          ))}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div>
        {/* <Outlet/> */}
      </div>
    </div>
  )
}

export default Blogs
