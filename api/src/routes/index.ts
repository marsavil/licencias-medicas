import { Router } from 'express';
import licencias from './licencias'
import devTests from './testing'

const router = Router();
//aqui comenzare a definir las rutas
router.use("/licencia", licencias)
router.use("/test", devTests)


export default router;