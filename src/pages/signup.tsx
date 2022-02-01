import { useWeb3 } from '@3rdweb/hooks';
import React, { useState } from 'react';
import { useCreator } from 'src/hooks/useCreator';
import useCreatorSignup from 'src/hooks/useCreatorSignup';

type Props = {};

const TestCreatePublication = (props: Props) => {
  const {
    isLoading: signupLoading,
    setUsername,
    setPublicationName,
    setPublicationDescription,
    setProfileImg,
    setPublicationImg,
    signup,
  } = useCreatorSignup();

  const {
    publishNewsletter,
    setNewsletterName,
    setNewsletterDescription,
    setNewsletterImg,
    setNewsletterContent,
    isLoading,
    isCreator,
  } = useCreator();

  console.log(isCreator);
  return (
    <div>
      {isCreator ? (
        <>
          <h1>Publish Newsletter Form!</h1>
          <form>
            <div>
              <input
                type="text"
                placeholder="Newsletter Name"
                onChange={e => setNewsletterName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Newsletter Description"
                onChange={e => setNewsletterDescription(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Newsletter Content"
                onChange={e => setNewsletterContent(e.target.value)}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={e => setNewsletterImg(e.target.files[0])}
              />
            </div>
            <div>
              <button onClick={publishNewsletter}>
                {isLoading ? 'loading...' : 'Publish Newsletter!'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1>Creator Signup Form!</h1>
          <form onSubmit={signup}>
            <div>
              <input
                placeholder="username"
                type="text"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="publicationName"
                type="text"
                onChange={e => setPublicationName(e.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="publicationDescription"
                type="text"
                onChange={e => setPublicationDescription(e.target.value)}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={e => setProfileImg(e.target.files[0])}
              />
            </div>
            <div>
              <input
                type="file"
                onChange={e => setPublicationImg(e.target.files[0])}
              />
            </div>
            <div>
              <button type="submit" disabled={signupLoading}>
                {signupLoading ? 'please wait...' : 'Submit!'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestCreatePublication;
