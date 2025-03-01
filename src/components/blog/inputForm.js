import React, { useEffect, useState } from 'react';
import "../../index.css"; // Import Tailwind CSS
import PhotoUploader from '../utills/photoUploader';
import { ImageUploader } from '../utills/imageUploader';

export const imageStatusType = {
  NEW: "NEW",
  CHANGED: "CHANGED"
};

export const FormatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);  // Convert the string into a Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // getMonth() returns month from 0-11, so we add 1
    const day = date.getDate();

    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  } else {
    return '';
  }
};

const InputForm = ({ handleSubmit, isUpdate = false, initialValues = {} }) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState('');
  const [initialParagraph, setInitialParagraph] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [author, setAuthor] = useState('');
  const [authorImage, setAuthorImage] = useState();
  const [authorTitle, setAuthorTitle] = useState('');
  const [sections, setSections] = useState([{ id: undefined, subTitle: '', images: [], paragraphs: [''] }]);

  // const FormatDate = (dateArray) => {
  //   if (dateArray) {
  //     const [year, month, day] = dateArray;
  //     return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  //   } else {
  //     return '';
  //   }
  // };

  const handleAddSection = () => {
    setSections([...sections, { subTitle: '', images: [], paragraphs: [''] }]);
  };

  const handleRemoveSection = () => {
    const newSections = [...sections];
    newSections.pop();
    setSections(newSections);
  };

  const handleAddParagraph = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs.push('');
    setSections(newSections);
  };

  const handleRemoveParagraph = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs.pop();
    setSections(newSections);
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex][field] = value;
    setSections(newSections);
  };

  const handleParagraphChange = (sectionIndex, paragraphIndex, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs[paragraphIndex] = value;
    setSections(newSections);
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id,
      title,
      initialParagraph,
      createdDate,
      author,
      authorTitle,
      authorImage,
      sections: sections.map(section => ({
        id: section.id,
        subTitle: section.subTitle,
        images: section.images,
        paragraphs: section.paragraphs,
      })),
    };

    handleSubmit(formData);
  };

  const handlePhotoUpload = (sectionIndex, files) => {
    const newSections = [...sections];
    newSections[sectionIndex].images = files;
    setSections(newSections);
  };

  const handleInputAuthorImage = (imageData) => {
    setAuthorImage(imageData);
  };

  useEffect(() => {
    if (isUpdate && initialValues) {
      setId(initialValues.id || '');
      setTitle(initialValues.title || '');
      setInitialParagraph(initialValues.initialParagraph || '');
      setAuthor(initialValues.author || '');
      setAuthorTitle(initialValues.authorTitle || '');

      if (initialValues.authorImage) {
        const tempAuthorImage = {
          id: initialValues.authorImage.id,
          file: undefined,
          url: initialValues.authorImage.accessURL,
          backChanges: false
        };
        setAuthorImage(tempAuthorImage || undefined);
      }

      setSections(initialValues.sections || [{ subTitle: '', images: [], paragraphs: [''] }]);
      setCreatedDate(initialValues.createdDate ? FormatDate(initialValues.createdDate) : '');
    }
  }, [initialValues]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg">
      {id && <p>Id is {id}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      <input
        type="text"
        value={authorTitle}
        onChange={(e) => setAuthorTitle(e.target.value)}
        placeholder="Author Title"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      <ImageUploader
        onClickUpload={handleInputAuthorImage}
        initialImage={authorImage}
      />
      <textarea
        value={initialParagraph}
        onChange={(e) => setInitialParagraph(e.target.value)}
        placeholder="Initial Paragraph"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      <input
        type="date"
        value={createdDate}
        onChange={(e) => setCreatedDate(e.target.value)}
        placeholder="YYYY-MM-DD"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 p-4">
          <p>Section {sectionIndex}</p>
          <input
            type="text"
            value={section.subTitle}
            onChange={(e) => handleSectionChange(sectionIndex, 'subTitle', e.target.value)}
            placeholder="Subtitle"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
          />
          <PhotoUploader
            blogId={id}
            sectionId={section.id}
            sectionIndex={sectionIndex}
            isUpdate={isUpdate}
            onSubmit={(files) => handlePhotoUpload(sectionIndex, files)}
            currentImages={section.images}
          />
          <br />
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <textarea
              key={paragraphIndex}
              value={paragraph}
              onChange={(e) => handleParagraphChange(sectionIndex, paragraphIndex, e.target.value)}
              placeholder="Paragraph"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddParagraph(sectionIndex)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Add Paragraph
          </button>
          {sections[sectionIndex].paragraphs.length !== 0 && (
            <button
              type="button"
              onClick={() => handleRemoveParagraph(sectionIndex)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 ml-2"
            >
              Remove Paragraph
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSection}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
      >
        Add Section
      </button>
      {sections.length !== 0 && (
        <button
          type="button"
          onClick={handleRemoveSection}
          className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 ml-2"
        >
          Remove Section
        </button>
      )}
      <button
        type="button"
        onClick={handleFormSubmit}
        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4 ml-2"
      >
        {isUpdate ? 'Update' : 'Submit'}
      </button>
    </div>
  );
};

export default InputForm;
