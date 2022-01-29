// GET gets all publications 1 is subscribed to
// POST subscribes to publication
// DELETE unsubscribes from publication

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
