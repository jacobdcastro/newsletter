import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'src/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'GET') {
    const { creatorAddress } = req.query;
    // find by single token
    if (creatorAddress) {
      let publicationDoc = await db
        .collection('Publications')
        .findOne({ creatorAddress });
      res.status(200).json(publicationDoc);
    } else {
      // get all publications ever
      res.status(400).send('No creatorAddress provided!');
    }
  }
};

export default handler;
