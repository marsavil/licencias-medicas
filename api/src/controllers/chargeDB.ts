import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
const {
  Empleado,
  Empresa,
  Sector,
  Medico,
  Admin
} = require("../db");
const ROUNDS = Number(process.env.ROUNDS);

const charge = {
  cargaDevDB: async function () {
    const empresa = await Empresa.findAll();
    const sectores = await Sector.findAll();
    const medico = await Medico.findAll();
    const empleado = await Empleado.findAll();
    const admin = await Admin.findAll();

    // carga empresa inicial para desarrollo
    if (empresa.length === 0) {
      await Empresa.create({
        name: "Empresa 1",
      });
      console.log("empresa cargada");
    } else {
      console.log("empresa previamente cargada");
    }
    // carga inicial de sectores para desarrollo

    if (sectores.length === 0) {
      const sections = ["Administración", "Taller", "Logistica", "Limpieza"];
      for (let i = 0; i < sections.length; i++) {
        await Sector.create({
          name: sections[i],
        });
        console.log(`se cargo el sector ${sections[i]}`);
      }
    } else {
      console.log("Sectores cargados previamente")
    }
    // carga inicial Administrador
    if ( admin.length === 0 ){
      const hashed = await bcrypt.hash("admin", ROUNDS);
      await Admin.create({
        name: "admin",
        password: hashed,
        level: "High"
      })
      console.log("Administrador agregado exitosamente");
    } else {
      console.log("Administrador cargado previamente")
    }

    // carga inicial de medico para desarrollo

    if (medico.length === 0) {
      const hashed = await bcrypt.hash("12345679", ROUNDS);
      await Medico.create({
        name: "Médico",
        surname: "Uno",
        dni: "12345679",
        password: hashed,
        level: "Mid"
      });
      console.log("Profesional médico agregado exitosamente");
    } else {
      console.log("medico cargado previamente")
    }

    // carga empleado inicial para desarrollo

    if (empleado.length === 0) {
      const sections = await Sector.findAll();
      const firms = await Empresa.findAll();
      const hashed = await bcrypt.hash("12345678", ROUNDS);
      sections && firms
        ? Empleado.create({
            name: "Empleado",
            surname: "Uno",
            dni: "12345678",
            telefono: "12345678",
            sectorId: sections[0].id,
            empresaId: firms[0].id,
            password: hashed,
            level: "Low"
          })
        : console.log("No es posible encontrar la empresa o el sector indicado");
      console.log("Empleado agreagado correctamente");
    } else {
      console.log("empleado cargado previamente")
    }
  },
};
export default charge;
