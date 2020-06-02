module.exports = function(sequelize, DataTypes) {
    let CountyData = sequelize.define("CountyData", {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        county: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fips: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cases: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deaths: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return CountyData;
  };
  