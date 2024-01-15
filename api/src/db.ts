import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

dotenv.config();

const {
  DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: Number(DB_PORT), // Convertir a número
        username: DB_USER,
        password: DB_PASS,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
        timestamps: false,
      } as any) // Usar 'any' para evitar errores de tipo
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false, define: { timestamps: false } } as any
      ); // Usar 'any' para evitar errores de tipo


// Carga dinámica de modelos desde el directorio models
const modelDefiners: ((sequelize: Sequelize) => void)[] = [];

const modelsPath = path.join(__dirname, '/models');

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith('.ts'))
  .forEach((file) => {
    const modelDefiner = require(path.join(modelsPath, file));
    modelDefiners.push(modelDefiner);
  });

// Inyecta la conexión (sequelize) en todos los modelos
modelDefiners.forEach((modelDefiner:any) => modelDefiner.default(sequelize));

// Capitaliza los nombres de los modelos (ie: product => Product)
Object.entries(sequelize.models)
  .forEach(([name, model]) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    sequelize.models[capitalized] = model;
  });

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Empleado, Empresa, Documentacion, Licencia, Medico, Sector } = sequelize.models;

//Relaciones

Empresa.hasMany(Empleado);
Empleado.belongsTo(Empresa, {
  foreignKey: {
    name: 'id_empresa',
    allowNull: false,
  }
});

Sector.hasMany(Empleado);
Empleado.belongsTo(Sector, {
  foreignKey: {
    name: 'id_sector',
    allowNull: false,
  }
});

Empleado.hasMany(Licencia);
Licencia.belongsTo(Empleado, {
  foreignKey: {
    name: 'id_empleado',
    allowNull: false,
  }
}); 

Licencia.hasOne(Documentacion);
Documentacion.belongsTo(Licencia, {
  foreignKey: {
    name: 'id_licencia',
    allowNull: false,
  }
});

Medico.hasMany(Licencia);
Licencia.belongsTo(Medico, {
  foreignKey: {
    name: 'id_medico',
    allowNull: false,
  }
});



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
