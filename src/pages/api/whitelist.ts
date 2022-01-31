import { NextApiRequest, NextApiResponse } from 'next';
import { Newsletter } from 'src/types/db';
import clientPromise from 'src/utils/db';
import { masterSdk as sdk } from 'src/utils/masterSdk';

type Response = { whitelist: Newsletter[] };

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  // get publication whitelist
  if (req.method === 'GET') {
    const whitelist = await db.collection('Publications').findOne({
      publicationAddress: '0x22Dc8B29D437f40520DEe9537c27b6EE34c7bE3c',
    });
    res.status(200).json(whitelist);
  }

  // add subscriber to whitelist
  if (req.method === 'POST') {
  }

  // remove subscriber from whitelist
  if (req.method === 'DELETE') {
  }

  res.status(200).json({});
};

export default handler;
