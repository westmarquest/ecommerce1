const { Model, DataTypes } = require("sequelize");
const Product = require("./Product");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

ProductTag.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
}); // This will add the foreign key constraint

module.exports = ProductTag;
