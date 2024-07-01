import React, { useState, useEffect } from 'react';

export const ImageUploader = ({ initialImage , onClickUpload }) => {
  const [image, setImage] = useState(initialImage);
  const [preview, setPreview] = useState(initialImage);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage)
      setPreview(initialImage.url);
    }
  }, [initialImage]);

  const handleImageInput = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const temp ={
        id: image ? image.id: undefined,
        url: "",
        file: new File([file], `authorImage`, { type: "image/jpeg" })
      } 
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        temp.url = reader.result;
      };
      reader.readAsDataURL(file);

      setImage(temp);
      
    }
  };

  const handleRemoveImage = () => {
    const temp ={
      id: image ? image.id: undefined,
      url: undefined,
      file: undefined
    }
    setImage(temp);
    setPreview(undefined);
  };

  const handleSubmit = () => {
    onClickUpload(image)
    console.log('Image submitted:', image);
  };

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
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white p-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};
