import { useWeb3 } from '@3rdweb/hooks';
import { NewsNFT } from '@components/NewsNFT';
import { NewsNFTCollection } from '@components/NewsNFTCollection';
import PublicationListing from '@components/PublicationListing/PublicationListing';
import React from 'react';
import { Publication } from 'src/types/db';
import clientPromise from 'src/utils/db';

type Props = { publications: string };

const PublicationsPage = ({ publications }: Props) => {
  console.log(JSON.parse(publications));

  return (
    <div>
      {JSON.parse(publications).map((pub: Publication) => {
        return <PublicationListing key={pub._id} pub={pub} />;
      })}
    </div>
  );
};

export default PublicationsPage;

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = await client.db('Creators');

  const publications = await db.collection('Publications').find().toArray();

  return {
    props: { publications: JSON.stringify(publications) },
  };
}
