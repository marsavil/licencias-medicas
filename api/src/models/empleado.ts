import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize)  {
  sequelize.define("empleado", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono:{
      type: DataTypes.STRING,
    },
    id_sector: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    id_empresa: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    alta: {
      type: DataTypes.DATE,
    },
  });
};