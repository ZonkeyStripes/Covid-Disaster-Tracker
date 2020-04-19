module.exports = function(sequelize, DataTypes) {
    let Location = sequelize.define("Location", {
        county: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Location.associate = function(models) {
        Location.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
    };


    return Location;
  };
  