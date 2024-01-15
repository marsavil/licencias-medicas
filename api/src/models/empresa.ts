import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize)  {
  sequelize.define("Empresa", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, // Puede cambiarse a ENUM si se transforma en una app multi clientes o con un default value
      allowNull: false,
    },
  });
};