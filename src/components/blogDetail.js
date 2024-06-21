import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServices } from '../services/ServiceContext';
import Slideshow from './slideShowComponent'; // Change here

const BlogDetails = () => {
  let { id } = useParams();
  const [post, setPost] = useState();
  const { apiService } = useServices();

  useEffect(() => {
    const getPostById = async () => {
      try {
        const data = await apiService.fetchData('getBlog/' + id); // Call your fetchData method
        setPost(data); // Update state with the fetched data
      } catch (err) {
        alert(err.message); // Update state with the error message
      }
    };

    getPostById();
  }, [id, apiService]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Published on {post.date ? post.date : "is not specified"}
          </p>
        </div>
        <div className="mx-auto mt-10">
          <div className="grid grid-cols-1 gap-y-10">
            <div className="space-y-4">
              <p className="text-lg leading-8 text-gray-600">{post.description}</p>
            </div>
            <div className="flex items-center gap-x-4">
              <img src={post.authorImageURL} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-gray-600">{post.authorTitle}</p>
              </div>
            </div>
            <div>
              <Slideshow imageUrls={post.imageURLs} />
            </div>
            <div>
              {post.longDescription.map((paragraph, index) => (
                <div key={index}>
                  <p className="text-lg leading-8 text-gray-600">{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
