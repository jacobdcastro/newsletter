import Link from 'next/link';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCreator } from 'src/hooks/useCreator';
import useCreatorSignup from 'src/hooks/useCreatorSignup';
import s from '../../styles/SignUp.module.css';

const SignUpForm = () => {
  const [published, setPublished] = useState(false);
  const {
    setNewsletterName,
    setNewsletterDescription,
    setNewsletterImg,
    setNewsletterContent,
    publishNewsletter,
    isLoading,
  } = useCreator(setPublished);

  if (published) {
    return (
      <div>
        <h2>You've successfully published your first newsletter!</h2>
        <p>
          What just happened? You created an ERC-1155 NFT representing your
          newly published newsletter. There is a maximum claimable supply on
          that NFT which is equal to the number of subscribers your publication
          has.
        </p>
        <p>
          If you have 10 subscribers at the time of publishing, then only 10
          copies of that particular newsletter (NFT) can be claimed!
        </p>
        <p>
          Once claimed, your subscribers can use their ERC-1155 NFT as their
          ticket to view your content. No one can see what you've written unless
          they hold the NFT in their wallet!
        </p>
        <p>Welcome to the era of reader-owned publications!</p>
      </div>
    );
  }

  return (
    <form onSubmit={publishNewsletter}>
      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Newsletter Headline:
        </label>
        <input
          placeholder="Newsletter Headline"
          type="text"
          className={s.inputTable}
          onChange={e => setNewsletterName(e.target.value)}
        />
      </p>

      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Newsletter Summary:
        </label>
        <input
          placeholder="Newsletter Summary"
          type="text"
          className={s.inputTable}
          onChange={e => setNewsletterDescription(e.target.value)}
        />
      </p>

      <p className={s.pTable}>
        <label className={s.labelTable} htmlFor="name">
          Your Token-gated Content:
        </label>
        <input
          placeholder="Your content!"
          type="text"
          className={s.inputTableLong}
          onChange={e => setNewsletterContent(e.target.value)}
        />
      </p>

      <div>
        <input
          type="file"
          onChange={e => setNewsletterImg(e.target.files[0])}
        />
      </div>
      <div>
        {isLoading ? (
          <h2>Please wait... This may take a while!</h2>
        ) : (
          <button type="submit" className={s.submitButton}>
            Publish Newsletter
          </button>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
