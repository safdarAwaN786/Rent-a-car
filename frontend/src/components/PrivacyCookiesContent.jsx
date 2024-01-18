import React, { useState } from 'react'
import JoditEditor from 'jodit-react';
import { useDispatch, useSelector } from 'react-redux';
import { setWebContent } from '../redux/slices/webContentSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/esm/Spinner';


export default function PrivacyCookiesContent() {

  const webContent = useSelector(state => state.webContent);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  return (
    <>
      <div className='p-3'>
        <h3 className='text-center my-2'>Edit Privacy & Cookies Content</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          setUpdating(true);
          console.log(webContent);
          axios.patch('/update-content', webContent).then((res) => {
            toast.success('Web Content Updated Successfully!');
            setUpdating(false);
          }).catch(err => {
            toast.error('Error in Updating Content, Try Again!');
            setUpdating(false);
          })
        }}>
          <div className='m-2 my-3 p-2 p-lg-4 border border-circle border-dark-subtle border-2'>
            <h4 className='text-center my-2 mb-4'>Edit As You Want✨</h4>
            <JoditEditor value={webContent?.privacyPolicyPage?.pageContent} onChange={(content) => {
              const editableContent = { ...webContent };
              editableContent.privacyPolicyPage = {
                ...editableContent.privacyPolicyPage,
                pageContent: content,
              };
              dispatch(setWebContent(editableContent));
            }} />

          </div>
          <div className='d-flex justify-content-center my-2 '>
            <button type="submit" class="primary-btn6  p-sm-2 p-1 " >
              {updating ? (
                <Spinner size='sm' />
              ) : (
                'UPDATE CONTENT'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
