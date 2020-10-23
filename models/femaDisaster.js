module.exports = function(sequelize, DataTypes) {
    let FemaDisaster = sequelize.define("FemaDisaster", {
        disasterNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        declarationDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fyDeclared: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        disasterType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        incidentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        incidentBeginDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        declaredCountyArea: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placeCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        femaID: {
            type: DataTypes.STRING,
            allowNull: true,            
        }
    });

    return FemaDisaster;
  };
  