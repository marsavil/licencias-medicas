import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize) {
  sequelize.define("licencia", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_empleado: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id_empresa: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    id_sector: {
      type: DataTypes.UUID,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordenadas: {
      type: DataTypes.STRING
    },
    id_medico: {
      type: DataTypes.UUID,
    },
    solicitada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    revisada: {
      type: DataTypes.DATE,
    },
    otorgada:{
      type: DataTypes.BOOLEAN,
    },
    validez:{
      type: DataTypes.ENUM("24", "48", "72"), // según propositos de la empresa,
    },
    derivacion:{
      type: DataTypes.BOOLEAN,
    },
    id_documentacion: {
    type: DataTypes.UUID,
    allowNull: false,
    }
  });
};