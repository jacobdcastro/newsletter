import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from 'src/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  let pubs = await db.collection('Publications').find().toArray();

  res.status(200).send(pubs);
};

export default handler;
