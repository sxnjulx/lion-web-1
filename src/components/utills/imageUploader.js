import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const ImageUploader = ({ blogId, initialImage , onClickUpload }) => {
  const [image, setImage] = useState(initialImage);
  const [preview, setPreview] = useState(initialImage);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage)
      setPreview(initialImage.url);
    }
  }, [initialImage]);


  const handleImageInput = async (event) => {
    // send to the s3 and get the url
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
        setImage({ _id: data._id, url: data.url ,key: data.key });
        setPreview(data.url);
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  const handleRemoveImage = () => {
    // delete from the s3 and remove from the db
      axios.delete(`http://localhost:5000/image/`,{
        params: {
          imageId :image._id,
          blogId : blogId,
        }
      })
        .then((response) => {
          const temp ={
            _id: undefined,
            url: undefined,
            key: undefined
          }
          setImage(null);
          setPreview(undefined);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error removing image:', error);
        });
  };

  const handleSubmit = () => {
    onClickUpload(image)
    console.log('Image submitted:', image);
  };

  useEffect(()=>{
    onClickUpload(image)
  },[image])

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageInput}
          className="border p-2"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {preview && (
          <div className="relative">
            <img src={preview} alt="preview" className="w-full h-auto rounded" />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              onClick={handleRemoveImage}
            >
              &times;
            </button>
          </div>
        )}
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
