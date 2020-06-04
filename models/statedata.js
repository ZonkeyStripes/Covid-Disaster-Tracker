module.exports = function(sequelize, DataTypes) {
    let StateData = sequelize.define("StateData", {
        date: {
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deaths: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return StateData;
  };
  