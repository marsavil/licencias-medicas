import { Sequelize, DataTypes, Model } from 'sequelize';

export default function defineModel(sequelize: Sequelize) {
  sequelize.define("admin", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("High", "Mid", "Low" ),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    active: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
  })
}