import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize) {
  sequelize.define("Licencia", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_empleado: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id_medico: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    solicitada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revisada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    otorgada:{
      type: DataTypes.BOOLEAN,
      allowNull: false, 
    },
    validez:{
      type: DataTypes.ENUM("24", "48", "72"), // según propositos de la empresa
      allowNull: false
    },
    derivacion:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    id_documentacion: {
    type: DataTypes.UUID,
    allowNull: false,
    }
  });
};