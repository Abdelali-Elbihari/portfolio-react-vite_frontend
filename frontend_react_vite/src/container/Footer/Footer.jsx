import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import emailjs from '@emailjs/browser';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [isFormHidden, setIsFormHidden] = useState(false);
  const [isSendError, setSendError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, isValid, errors }
  } = useForm({ mode: 'onChange' });

  const sendForm = (data) => {
    const { name, email, message } = data;
    const templateParams = { from_name: name, from_email: email, message };
    const contact = { _type: 'contact', name, email, message };

    return Promise.all([
      emailjs.send(
        process.env.VITE_EMAIL_JS_SERVICE_ID,
        process.env.VITE_EMAIL_JS_TEMPLATE_ID,
        templateParams,
        process.env.VITE_EMAIL_JS_PUBLIC_KEY
      ),
      client.create(contact)
    ]);
  };

  const submitForm = async (data) => {
    try {
      setSendError(false);
      await sendForm(data);
      setIsFormHidden(true);
    } catch {
      setIsFormHidden(false);
      setSendError(true);
    }
  };

  return (
    <>
      {!isSubmitted && <h2 className='head-text'>Get in touch with me</h2>}

      <div className='app__footer-cards'>
        <div className='app__footer-card '>
          <img src={images.email} alt='email' />
          <a href='mailto:bihariel@gmail.com' className='p-text'>
            bihariel@gmail.com
          </a>
        </div>
      </div>

      {!isValid && isSubmitted && (
        <div className='app__footer-form-alerts'>
          {Object.values(errors).map((e, idx) => {
            return (
              <Alert severity='warning' key={idx}>
                {e.message}
              </Alert>
            );
          })}
        </div>
      )}

      {!isFormHidden ? (
        <form onSubmit={handleSubmit(submitForm)} className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input
              className='p-text'
              type='text'
              placeholder='Your Name'
              name='name'
              {...register('name', {
                required: { value: true, message: 'Name is required' }
              })}
            />
          </div>
          <div className='app__flex'>
            <input
              className='p-text'
              type='email'
              placeholder='Your Email'
              name='email'
              {...register('email', {
                required: { value: true, message: 'Email is required' },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'A valid email is required' }
              })}
            />
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              name='message'
              {...register('message', {
                required: { value: true, message: 'Message is required' }
              })}
            />
          </div>
          <button type='submit' className='p-text' disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      ) : (
        <div>
          <h3 className='head-text'>Thank you for getting in touch!</h3>
        </div>
      )}
      {isSendError && (
        <div className='app__footer-form-alerts'>
          <Alert severity='error' key='Send-error'>
            There was an error sending your message. Please try again!
          </Alert>
        </div>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');
