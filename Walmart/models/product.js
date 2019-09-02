'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      code: DataTypes.STRING
    },
    {}
  )
  Product.associate = function(models) {
    // 商品属于分类
    models.Product.belongsTo(models.Category)
  }
  return Product
}
