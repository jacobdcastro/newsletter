// /*
//  * @route    /dashboard/{subscriber}
//  * @desc     Page for subscriber dashboard
//  * @access   Private
//  * @wallet   Required
//  */

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import styles from '../../styles/Home.module.css';
import { ConnectWallet } from '../../components/ConnectWallet';
import { SubmitButton } from '../../components/SubmitButton';
import { Navbar } from '../../components/Navbar';
import { Pfp } from '../../components/Pfp';
import { Socials } from '../../components/Socials';
import { NewsNFTCollection } from '../../components/NewsNFTCollection';

interface Props {}

const SubscriberDashboardPage = (props: Props) => {
  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar></Navbar>

      <main className={styles.main}>
        <div className={'font-semibold text-violet-600 text-left'}>
          SUBSCRIBER DASHBOARD
        </div>
        <div className={styles.contentcontainer}>
          <div className={styles.grid}>
            <Pfp />
            <div className={'font-bold text-black text-center m-5 w-full'}>
              kylee.eth
            </div>

            <Socials />

            <p className={styles.profileBio}>
              Find in-depth information about Next.js features and API. Find
              in-depth information about Next.js features and API/ Find in-depth
              information about Next
            </p>

            <ConnectWallet />

            <div className={styles.card}>
              <h2 className={'font-bold'}>Your Newsletters:</h2>
              <NewsNFTCollection />
              <br />
              <a href="/signup">
              <SubmitButton text={'Become a Creator!'} />
              </a>
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

export default SubscriberDashboardPage;
