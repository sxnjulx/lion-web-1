import React, { useState, useEffect } from 'react';
import { imageStatusType } from '../blog/inputForm';
import axios from 'axios';

const PhotoUploader = ({ blogId, sectionIndex, isUpdate, onSubmit, currentImages }) => {
  const [images, setImages] = useState([]);
  // const [previews, setPreviews] = useState([]);
  const [imagesIdsFromBack, setImagesIdsFromBack] = useState([]);
  const dataRemovedUrl ="https://imgs.search.brave.com/JoZPjx6WqFeQGFQm9XMb98BxA7vXHHBM6DVx1b3owUo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5na2V5LmNvbS9w/bmcvZGV0YWlsLzY3/LTY3NzczM19yZW1v/dmVkLWltYWdlLWhh/cy1iZWVuLXJlbW92/ZWQucG5n";

  useEffect(() => {
    if (isUpdate) {
      setImagesIdsFromBack(
        currentImages.map((image) => ({
          id: image._id ? image._id : undefined,
          key: image.key,
          url : image.url,
        }))
      );
      // setImages(
      //   currentImages.map((image) => ({
      //     _id: image._id ? image._id : undefined,
      //     key: image.key,
      //     url : image.url,
      //   }))
      // );
      const initialPreviews =  currentImages.map((image) => ({
        _id: image._id ? image._id : undefined,
        key: image.key,
        url : image.url,
      }));
      // setPreviews(initialPreviews);
    }
  }, [currentImages, isUpdate]);

  const handleImageInput = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
  
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/image/", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setImages((prevImages) => [...prevImages, { _id: data._id, key: data.key, url: data.url }]);
        // setPreviews((prevImages) => [...prevImages, { _id: data._id, url: data.url }]);
        
        
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }   
  };










  const handleRemoveImage = (image) => {
    // delete from the s3 and remove from the db
    axios.delete(`http://localhost:5000/image/`,{
      params: {
        imageId :image._id,
        blogId : blogId,
      }
    })
      .then((response) => {
        setImages((prevImages) => prevImages.filter((img) => img._id !== image._id));
        // setPreviews(prevViews => prevViews.filter((img) => img._id !== image._id));
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error('Error removing image:', error);
      });
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(images);
  // };
  useEffect(()=>{
    onSubmit(images);
  },[images])

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageInput}
          className="border p-2"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview.url} alt={`preview-${index}`} className="w-full h-auto rounded" />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              onClick={() => handleRemoveImage(preview)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {/* <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Upload
      </button> */}
    </div>
  );
};
export default PhotoUploader;