import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import emailjs from '@emailjs/browser';
import { images } from '../../constants/index.js';
import { AppWrap, MotionWrap } from '../../wrapper/index.jsx';
import { client } from '../../client.js';
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
      {!isSubmitted && (
        <h2 className='head-text'>
          <span>Get in touch with me</span>
        </h2>
      )}

      <div className='app__footer-cards'>
        <a href='mailto:bihariel@gmail.com' className='app__footer-card '>
          <img src={images.email} alt='email' />
          bihariel@gmail.com
        </a>
      </div>

      {!isFormHidden ? (
        <form onSubmit={handleSubmit(submitForm)} className='app__footer-form app__flex'>
          <div className='app__footer-form-input'>
            <input
              className='p-text'
              type='text'
              placeholder='Your Name'
              name='name'
              {...register('name', {
                required: { value: true, message: 'Name is required' }
              })}
            />
            {!isValid && isSubmitted && errors?.name?.type === 'required' && (
              <Alert severity='error' key={errors.name.type}>
                {errors.name.message}
              </Alert>
            )}
          </div>
          <div className='app__footer-form-input'>
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
            {!isValid && isSubmitted && (errors?.email?.type === 'required' || errors?.email?.type === 'pattern') && (
              <Alert severity='error' key={errors.email.type}>
                {errors.email.message}
              </Alert>
            )}
          </div>
          <div className='app__footer-form-input'>
            <textarea
              className='p-text '
              placeholder='Your Message'
              name='message'
              {...register('message', {
                required: { value: true, message: 'Message is required' }
              })}
            />
            {!isValid && isSubmitted && errors?.message?.type === 'required' && (
              <Alert severity='error' key={errors.message.type}>
                {errors.message.message}
              </Alert>
            )}
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

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__primarybg');
