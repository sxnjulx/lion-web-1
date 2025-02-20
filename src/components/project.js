import { Link, Outlet } from "react-router-dom"
import { useServices } from "../services/ServiceContext"
import { useEffect, useState } from "react"
const Project= () =>{
    let [projects, setProjects] = useState([])

    const {apiService,userStateService} = useServices()
    const {state, dispatch} = userStateService


    const handleBlogPostClick = ()=>{}

    useEffect(()=>{
    const getprojects = async () => {
        try {
            const data = await apiService.fetchData('getBlogs'); // Call your fetchData method
            setProjects(data); // Update state with the fetched data
        } catch (err) {
            alert(err.message); // Update state with the error message
        }
    };

    getprojects();
    },[])   

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
            {projects.map((post) => (
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
                    <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        {/* <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                        </a> */}
                        <Link to={`/blogs/${post.id}`}>view more</Link>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                    </div>
                </div>
                </article>
            ))}
            </div>
        </div>
        <div>
            <Outlet/>
        </div>
        </div>
    )
}

export default Project;

const jso = {
    "title":"main title",
    "initialParagraph": "here is the initial pragraph",
    "sections": [{
        "subTitle": "first subtitle",
        "paragraph": [
            "here is the first paragraph of the first subtitle",
            "here is the second paragraph of the first subtitle",
            ]
        },
        {
            "subTitle": "second subtitle",
            "paragraph": [
                "here is the first paragraph of the second subtitle",
                "here is the second paragraph of the second subtitle",
                ]
            },
    ]
}