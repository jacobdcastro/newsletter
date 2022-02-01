import React from 'react';
import { useEffect } from 'react';
import useCreatorSignup from 'src/hooks/useCreatorSignup';
import s from '../../styles/SignUp.module.css';

const SignUpForm = ({ setIsCreator, setMessage }) => {
  const {
    isLoading: signupLoading,
    setUsername,
    setPublicationName,
    setPublicationDescription,
    setProfileImg,
    setPublicationImg,
    signup,
    signupCompleted,
  } = useCreatorSignup(setMessage);

  useEffect(() => {
    if (signupCompleted) setIsCreator(true);
  }, [signupCompleted]);

  return (
    <form onSubmit={signup}>
      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Display Name:
        </label>
        <input
          placeholder="Username"
          type="text"
          className={s.inputTable}
          onChange={e => setUsername(e.target.value)}
        />
      </p>

      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Publication Name:
        </label>
        <input
          placeholder="Publication Name"
          type="text"
          className={s.inputTable}
          onChange={e => setPublicationName(e.target.value)}
        />
      </p>

      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Publication Description:
        </label>
        <input
          placeholder="Describe your publication"
          type="text"
          className={s.inputTableLong}
          onChange={e => setPublicationDescription(e.target.value)}
        />
      </p>

      <div>
        <input type="file" onChange={e => setProfileImg(e.target.files[0])} />
      </div>
      <div>
        <input
          type="file"
          onChange={e => setPublicationImg(e.target.files[0])}
        />
      </div>
      <div>
        {signupLoading ? (
          <h4>
            ⏳ Heads up! This may take a few minutes., 'Please be patient and do
            NOT leave the page or refresh. Open browser console for more
            details!
          </h4>
        ) : (
          <button type="submit" className={s.submitButton}>
            Sign Up
          </button>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
