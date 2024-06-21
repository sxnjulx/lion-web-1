// src/components/BlogForm.js
import React, { useState } from 'react';
import '../index.css'; // Import Tailwind CSS

const InputForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [initialParagraph, setInitialParagraph] = useState('');
  const [sections, setSections] = useState([{ subTitle: '', paragraphs: [''] }]);

  const handleAddSection = () => {
    setSections([...sections, { subTitle: '', paragraphs: [''] }]);
  };

  const handleAddParagraph = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].paragraphs.push('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData ={ title, initialParagraph, sections }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      <textarea
        value={initialParagraph}
        onChange={(e) => setInitialParagraph(e.target.value)}
        placeholder="Initial Paragraph"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
      />
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <input
            type="text"
            value={section.subTitle}
            onChange={(e) => handleSectionChange(sectionIndex, 'subTitle', e.target.value)}
            placeholder="Subtitle"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
          />
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
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSection}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2"
      >
        Add Section
      </button>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;
