import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize)  {
  sequelize.define("empresa", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, // Puede cambiarse a ENUM si se transforma en una app multi clientes o con un default value
      defaultValue: "Empresa 1",
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};