import { Request, Response } from "express";
const { Empresa } = require("../db");

const empresas = {
  
  cargar: async function (req: Request, res: Response) {
    console.log("entro a cargar empresas")
    try {
      const { name } = req.body;
      const empresa = await Empresa.findOne({
        where: {
          name
        }
      })
      if ( empresa ) { // verifica la existencia de la empresa
        return res.status(400).send(`Ya existe una empresa con el nombre ${name}`)
      }
      if ( name ) {
        // para cargar una empresa manualmente desde una UI
        await Empresa.create({
          name,
        });
        return res.status(200).send("empresa cargada");
      } else {
        return res.status(400).send("Debe ingresar un nombre para la empresa");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  },
  ver: async function (req: Request, res: Response) {
    console.log("entro a ver empresas")
    // devuelve un array con los sectores cargados
    const empresas = await Empresa.findAll();
    return res.status(200).send(empresas);
  },
  eliminar: async function (req: Request, res: Response) {
    console.log("entro a eliminar empresas")
    // Elimina una empresa. Borrado Lógico
    try {
      const { id } = req.body;
      if ( id ) {
        const empresa = await Empresa.findOne({
          where: {
            id,
          },
        });
        empresa
          ? (empresa.active = false)
          : res.status(400).send(`No existe una empresa con el id ${id}`);
        empresa.save();
        return res.status(200).send("empresa eliminada");
      } else {
        return res
          .status(400)
          .send("Debe ingresar un id valido para eliminar una empresa");
      }
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
};
export default empresas;