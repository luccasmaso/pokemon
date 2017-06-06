module.exports = (sequelize, DataTypes) => {
  return sequelize.define("pokemon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name should not be empty'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: [0.01],
          msg: 'price should be greater than 0'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [0],
          msg: 'quantity should not be less than 0'
        }
      }
    }
  }, {
    underscored: true,
    timestamps: true
  })
}
