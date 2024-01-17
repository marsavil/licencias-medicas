import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
const {
  Empleado,
  Empresa,
  Licencia,
  Sector,
  Documentacion,
  Medico,
} = require("../db");
const ROUNDS = Number(process.env.ROUNDS);

const medicos = {
  cargar: async function (req: Request, res: Response) {
    try {
      const { name, surname, dni } = req.body;
      if (name && surname && dni) {
        // carga manual de un médico desde UI
        const hashed = await bcrypt.hash(dni, ROUNDS);
        await Medico.create({
          name,
          surname,
          dni,
          password: hashed,
        });
        return res.status(200).send("Profesional médico agregado exitosamente");
      } else {
        return res
          .status(400)
          .send("Debe ingresar un nombre, un apellido y una contraseña");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  },
  ver: async function (res: Response) {
    // devuelve un array con los sectores cargados
    const medicos = await Sector.findAll();
    return res.status(200).send(medicos);
  },
  eliminar: async function (req: Request, res: Response) {
    // Elimina una empresa. Borrado Lógico
    try {
      const { id } = req.body;
      if ( id ) {
        const medico = await Empresa.findOne({
          where: {
            id,
          },
        });
        medico
          ? (medico.active = false)
          : res.status(400).send(`No existe un meédico con el id ${id}`);
        medico.save();
        return res.status(200).send("médico eliminada");
      } else {
        return res
          .status(400)
          .send("Debe ingresar un id valido para eliminar un médico");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
export default medicos; 