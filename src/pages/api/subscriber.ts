// GET gets all publications 1 is subscribed to
// POST subscribes to publication
// DELETE unsubscribes from publication
import { NextApiRequest, NextApiResponse } from 'next';
import { Subscriber } from 'src/types/db';
import clientPromise from 'src/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = await client.db('Creators');

  if (req.method === 'POST') {
    const { subscriberAddress, publicationAddress } = req.body;
    // add address to subscriber list
    await db.collection('Publications').updateOne(
      { publicationAddress },
      {
        $push: {
          subscribers: {
            address: subscriberAddress,
            dateSubscribed: Date.now(),
            active: true,
          } as Subscriber,
        },
      }
    );
  }
  res.status(200).send('Successfully subscribed!');
};

export default handler;
