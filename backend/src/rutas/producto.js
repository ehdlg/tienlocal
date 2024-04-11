import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({ productos: [] });
});

export default router;
