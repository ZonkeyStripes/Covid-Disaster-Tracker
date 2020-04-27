module.exports = function(sequelize, DataTypes) {
    let DisasterKit = sequelize.define("DisasterKit", {
        item: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    DisasterKit.associate = function(models) {
        DisasterKit.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return DisasterKit;
  };
  