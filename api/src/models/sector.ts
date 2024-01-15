import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize) {
  sequelize.define("Sector", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};