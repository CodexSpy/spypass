import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const feedback = () => {
  const [textareaContent, setTextareaContent] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  const sendEmail = () => {
    const templateParams = {
      content: textareaContent
    };

    emailjs.send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>', templateParams, '<YOUR_USER_ID>')
      .then((response) => {
        console.log('Email sent successfully:', response);
        // You can do something here after the email is sent
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };

  return (
    <div className='flex justify-center items-center'>
      <textarea 
      className='bg-slate-300 py-4 px-4'
        value={textareaContent}
        onChange={handleTextareaChange}
        placeholder="Give Your Valuable Feedback"
        rows="4"
        cols="50"
      />
      <button
        onClick={sendEmail}
        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Email
      </button>
    </div>
  );
};

export default feedback;
