import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize) {
  sequelize.define("sector", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, //puede ser cambiado a ENUM una vez determinados los sectores
      //type: DataTypes.ENUM('value', 'another value')
      allowNull: false,
    },
  });
};