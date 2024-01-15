import { Request, Response } from "express";
const {
  Empleado,
  Empresa,
  Licencia,
  Sector,
  Documentacion,
  Medico,
} = require("../db");

const charge = {
  cargarEmpleados: async function (req: Request, res: Response) {
    try {
      const { name, surname, telefono, sector, empresa } = req.body;
      const area = await Sector.findOne({
        where: {
          name: sector,
        },
      });
      const jobPlace = await Empresa.findOne({
        where: {
          name: empresa,
        },
      });
      Empleado.create({
        name,
        surname,
        telefono,
        id_sector: area.id,
        id_empresa: jobPlace.id,
      });

      return res.status(200).send("Empleado cargado correctamente");
    } catch (error: any) {
      return res.status(400).send(error);
    }
  },
  cargarEmpresa: async function (req: Request, res: Response) {
    try {
      await Empresa.create({
        name: "Mars Avil",
      });
      return res.status(200).send("empresa cargada");
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  eliminarEmpresa: async function (req: Request, res: Response){
    const { id } = req.body
    console.log("eliminar")
    await Empresa.destroy({
      where: {
        id
      }
    })
    return res.status(200).send("empresa eliminada")
  },
  cargarSectores: async function (req: Request, res: Response) {
    console.log("se inicia la carga de sectores");
    const sectores = ["Administración", "Taller", "Logistica", "Limpieza"];
    sectores.forEach((s) => {
      console.log("se va a cargar el sector");
      Sector.create({
        name: s,
      });
      console.log(`se cargo el sector ${s}`);
    });
    return res.status(200).send("Sectores cargados correctamente");
  },
  verSectores: async function (res: Response) {
    const sectores = await Sector.findAll();
    return res.status(200).send(sectores);
  },
  cargarMedicos: async function (req: Request, res: Response) {
    try {
      Medico.create({
        name: "Carmen",
        surname: "Losada",
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
export default charge;
