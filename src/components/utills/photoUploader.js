import React, { useState, useEffect } from 'react';
import { imageStatusType } from '../inputForm';

const PhotoUploader = ({ blogId, sectionIndex, sectionId, isUpdate, onSubmit, currentImages }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [imagesIdsFromBack, setImagesIdsFromBack] = useState([]);
  const dataRemovedUrl ="https://imgs.search.brave.com/JoZPjx6WqFeQGFQm9XMb98BxA7vXHHBM6DVx1b3owUo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5na2V5LmNvbS9w/bmcvZGV0YWlsLzY3/LTY3NzczM19yZW1v/dmVkLWltYWdlLWhh/cy1iZWVuLXJlbW92/ZWQucG5n";

  useEffect(() => {
    if (isUpdate) {
      setImagesIdsFromBack(
        currentImages.map((image) => ({
          id: image.id ? image.id : undefined,
          imageName: image.imageName,
          imageStatus: image.imageStatus,
          accessURL: image.accessURL,
          file: image.file,
        }))
      );
      setImages(
        currentImages.map((image) => ({
          id: image.id,
          imageName: image.imageName,
          imageStatus: imageStatusType.NEW,
          accessURL: image.accessURL,
          file: image.file,
        }))
      );
      const initialPreviews = currentImages.map((img) => img.accessURL);
      setPreviews(initialPreviews);
    }
  }, [currentImages, isUpdate]);

  const handleImageInput = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...images];
    const newPreviews = [...previews];

    files.forEach((file) => {
      
      if (file.type.startsWith('image/')) {
        
        const tempImageData = {
          id: undefined,
          imageName: `${sectionIndex}/${images.length}`,
          imageStatus: imageStatusType.NEW,
          accessURL: '',
          file: file,
        };
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          tempImageData.accessURL = reader.result;

          setPreviews([...newPreviews]);
        };
        reader.readAsDataURL(file);
        newImages.push(tempImageData);
      }
    });

    setImages([...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    if (isUpdate && imagesIdsFromBack.find((img) => img.id === newImages[index].id)) {
      newImages[index] = {
        ...newImages[index],
        imageName: '',
        imageStatus: imageStatusType.CHANGED,
        accessURL: dataRemovedUrl,
        file: undefined,
      };
      newPreviews[index] = dataRemovedUrl;
    } else {
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);
    }

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(images);
  };

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
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt={`preview-${index}`} className="w-full h-auto rounded" />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
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

export default PhotoUploader;
