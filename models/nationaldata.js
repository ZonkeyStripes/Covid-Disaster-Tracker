module.exports = function(sequelize, DataTypes) {
    let NationalData = sequelize.define("NationalData", {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cases: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deaths: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return NationalData;
  };
  