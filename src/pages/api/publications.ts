import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'src/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'GET') {
    // find by single token
    if (req.body.publicationTokenId) {
      let pubs = await db
        .collection('Publications')
        .find({ tokenId: req.body.publicationTokenId });
    } else {
      // get all publications ever
    }
  }
};

export default handler;
