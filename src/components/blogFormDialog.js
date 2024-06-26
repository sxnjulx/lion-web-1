import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import InputForm from "./inputForm" // Import the InputForm component
import axios from 'axios';

const BlogFormDialog = ({ isOpen, onClose, isUpdate, handleSubmit,blogId}) => {
  const [initialValues, setInitialValues] = useState();
  useEffect(()=>{
    if(isUpdate) {
      try {
        axios.get(`http://localhost:8080/getBlog/${blogId}`).then((response)=>{
          setInitialValues(response.data)
        }) 
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  },[isUpdate])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Create a New Blog Post
                </Dialog.Title>
                <div className="mt-2">
                  <InputForm handleSubmit={handleSubmit} initialValues={initialValues} isUpdate={isUpdate}/>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BlogFormDialog;
