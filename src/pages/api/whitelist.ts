import { NextApiRequest, NextApiResponse } from 'next';
import { Newsletter } from 'src/types/db';
import clientPromise from 'src/utils/db';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { whitelist: Newsletter[] };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  // add subscriber to whitelist
  if (req.method === 'POST') {
  }

  // remove subscriber from whitelist
  if (req.method === 'DELETE') {
  }

  res.status(200).json({ hi: 'hi' });
};

export default handler;
