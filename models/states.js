module.exports = function(sequelize, DataTypes) {
    let States = sequelize.define("States", {
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fips: {
        type: DataTypes.STRING,
        allowNull: false
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

    return States;
}