/*
 * @route    /
 * @desc     Home page with info, how it works, discover, featured creators, "become a creator", etc
 * @access   Public
 * @wallet   Not required
 */

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import styles from '../styles/Home.module.css';
// import { usePublication } from '../hooks/useCreator';
import { useCreatorSignup } from '../hooks/useCreatorSignup';
import { ConnectWallet } from '../components/ConnectWallet';
import { SubmitButton } from '../components/SubmitButton';
import { Navbar } from '../components/Navbar';

const IndexPage = () => {
  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Head>
        <title>News NFT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar></Navbar>

      <main className={styles.main}>
        <div className={styles.contentcontainer}>
          <span>
            <img
              className={styles.svgLogo}
              src="newsnft_logo.svg"
              alt="newsnft logo"
            />
          </span>

          <h1 className={styles.title}>
            Your News, Minted
            <br></br>NEWS NFT.
          </h1>

          <ConnectWallet />

          <div className={'text-center'}>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h2 className={'font-bold'}>Headline</h2>
                <p className={'text-sm'}>
                  Find in-depth information about Next.js features and API. Find
                  in-depth information about Next.js features and API/ Find
                  in-depth information about Next
                </p>
                <br />
                <a href="/dashboard/subscriber">
                  {' '}
                  <h4 className={'font-semibold text-violet-600'}>
                    Dashboard &rarr;
                  </h4>
                </a>
              </div>
            </div>
          </div>
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

export default IndexPage;
