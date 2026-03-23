import { Router } from 'express';
import PromiseModel from '../models/Promise.js';
import PromiseRelatedNews from '../models/PromiseRelatedNews.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { status, minister } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (minister) filter.minister = minister;
    const raw = await PromiseModel.find(filter).populate('minister').sort({ createdAt: -1 });
    res.json(raw || []);
  } catch (e) {
    console.error('Fetch promises error:', e);
    res.status(500).json({ error: 'Failed to fetch promises' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const p = await PromiseModel.findById(req.params.id).populate('minister');
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (e) {
    console.error('Fetch single promise error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/related-news', async (req, res) => {
  try {
    const news = await PromiseRelatedNews.find({ promise: req.params.id }).sort({ publishedAt: -1 }).limit(5);
    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  const created = await PromiseModel.create(req.body);
  res.json(await created.populate('minister'));
});

router.put('/:id', requireAuth, async (req, res) => {
  const updated = await PromiseModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('minister');
  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  await PromiseModel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;