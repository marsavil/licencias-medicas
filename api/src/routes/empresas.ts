import  empresas  from '../controllers/empresas';
import { Router } from 'express';
const router = Router();

router.post('/', empresas.cargar);
router.get('/', empresas.ver);
router.delete('/', empresas.eliminar)

export default router;