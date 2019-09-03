'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      number: DataTypes.INTEGER
    },
    {}
  )
  Cart.associate = function(models) {
    models.Cart.belongsTo(models.Product)
    models.Cart.belongsTo(models.User)
  }
  return Cart
}
