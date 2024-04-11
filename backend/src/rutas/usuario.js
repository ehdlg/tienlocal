import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({ usuarios: [] });
});

export default router;
