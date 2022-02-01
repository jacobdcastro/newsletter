import React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import styles from '../styles/Home.module.css';
import s from '../styles/SignUp.module.css';
import { ConnectWallet } from '../components/ConnectWallet';
import { Navbar } from '../components/Navbar';
import { useCreator } from 'src/hooks/useCreator';
import useCreatorSignup from 'src/hooks/useCreatorSignup';
import { useWeb3 } from '@3rdweb/hooks';
import SignUpForm from '@components/Forms/SignUpForm';
import PublishForm from '@components/Forms/PublishForm';

type Props = {};

const CreatorDemoPage = (props: Props) => {
  const { address } = useWeb3();
  const [isCreator, setIsCreator] = useState(true);
  const [message, setMessage] = useState('');

  return (
    <div>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.contentcontainer}>
          <span>
            <img
              className={styles.svgLogo}
              src="/newsnft_logo.svg"
              alt="newsnft logo"
            />
          </span>
          <h1 className={styles.title}>
            {!isCreator ? (
              <>
                Sign Up to Become
                <br></br>a Creator!
              </>
            ) : (
              <>
                Create Your
                <br />
                First Newsletter!
              </>
            )}
          </h1>

          <p className="mb-5">Creator Token coming soon...</p>

          <ConnectWallet />

          {address && (
            <div className={'text-center'}>
              <div className={styles.grid}>
                <div className={s.card}>
                  {!isCreator ? (
                    <>
                      <h2 className={'font-bold'}>Become a Creator!</h2>
                      <p className={'text-sm'}>
                        Becoming a Creator on NewsNFT takes your newsletters to
                        the next level:
                        <p>
                          <ul>
                            <li>✔️ Turn your newsletters into NFTs </li>
                            <li>✔️ Airdrop your publications to subscribers</li>
                            <li>✔️ Earn $NEWFT tokens </li>
                          </ul>
                          Why settle for boring newsletters? <br></br>
                          Sign up with NewsNFT 👇
                        </p>
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={'font-bold'}>
                        Create Your First Newsletter!
                      </h2>
                      <p className={'text-sm'}>
                        Once you publish this, your subscribers can claim their
                        airdrop to read your newsletter content!
                      </p>
                    </>
                  )}
                  <br />

                  {!isCreator ? (
                    <SignUpForm
                      setIsCreator={setIsCreator}
                      setMessage={setMessage}
                    />
                  ) : (
                    <PublishForm />
                  )}

                  <p>{message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default CreatorDemoPage;
