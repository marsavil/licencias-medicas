import chargeDB from '../controllers/chargeDB'
import { Router } from 'express';
const router = Router();

router.post('/dev/empleados', chargeDB.cargarEmpleados)
router.post('/dev/empresas', chargeDB.cargarEmpresa)
router.delete('/dev/empresas', chargeDB.eliminarEmpresa)
router.post('/dev/sectores', chargeDB.cargarSectores)
router.post('/dev/medicos', chargeDB.cargarMedicos)

export default router;