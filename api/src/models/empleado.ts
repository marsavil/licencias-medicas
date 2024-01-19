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
    dni: {
      type: DataTypes.STRING,
      allowNull:false
    },
    sectorId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    empresaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    alta: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    level: {
      type: DataTypes.ENUM("High", "Mid", "Low" ),
      allowNull: false
    }
  });
};