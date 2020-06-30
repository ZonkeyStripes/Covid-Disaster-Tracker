module.exports = function(sequelize, DataTypes) {
    let Counties = sequelize.define("Counties", {
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fips: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cases: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deaths: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    return Counties;
}