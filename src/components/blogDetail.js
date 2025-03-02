import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServices } from '../services/ServiceContext';
import Slideshow from './slideShowComponent'; // Change here
import { FormatDate } from './blog/inputForm';
import BackButton from './utills/BackButton';

const BlogDetails = () => {
  let { id } = useParams();
  const [post, setPost] = useState();
  const { apiService } = useServices();

  useEffect(() => {
    const getPostById = async () => {
      try {
        const data = await apiService.fetchData('blog/' + id); // Call your fetchData method
        setPost(data); // Update state with the fetched data
      } catch (err) {
        alert(err.message); // Update state with the error message
      }
    };

    getPostById();
  }, [id, apiService]);

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <BackButton />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div >
        {/* <div className="mx-auto max-w-2xl lg:mx-0"> */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center ">{post.title}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 text-center">
            Published on {post.time ? FormatDate(post.time) : "is not specified"}
          </p>
        </div>
        <div className="mx-auto mt-10">
          <div className="grid grid-cols-1 gap-y-10">
            <div className="flex items-center gap-x-4">
              <img src={post.author?.image?.url} alt="author" className="h-10 w-10 rounded-full bg-gray-50" />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-gray-600">{post.author.title}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg leading-8 text-gray-600">{post.initialParagraph}</p>
            </div>
            <div>
              {post.sections.map(({ id, subTitle, images, paragraphs }, index) => (
                <div key={index} className='m-5'>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{subTitle}</h3>
                  <Slideshow imageUrls={images.map((imageData) => imageData.url)} />
                  {paragraphs.map((paragraph, index) => (
                    <div key={index} className="mt-4">
                      <p className="text-lg leading-8 text-gray-600">
                        <span className="inline-block ml-4">{paragraph}</span>
                      </p>
                    </div>
                  ))}

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
