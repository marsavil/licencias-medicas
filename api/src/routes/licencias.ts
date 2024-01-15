import  licencias  from '../controllers/licencias';
import { Router } from 'express';
const router = Router();

router.post('/', licencias.open);
//router.put('/', evaluate);
//router.put('/', close);

export default router;