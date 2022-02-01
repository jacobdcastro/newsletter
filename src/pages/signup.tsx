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
  } = useCreatorSignup();

  const { publishNewsletter, setNewsletterImg, isLoading, isCreator } =
    useCreator();

  return (
    <div>
      <>
        <input
          type="file"
          onChange={e => setNewsletterImg(e.target.files[0])}
        />
        <button onClick={() => publishNewsletter()}>
          {isLoading ? 'loading...' : 'Click meeeeee'}
        </button>
      </>

      <div>
        <h1>Hmm you are not a creator yet 😅</h1>
        <form>
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
    </div>
  );
  return <div></div>;
};

export default TestCreatePublication;
