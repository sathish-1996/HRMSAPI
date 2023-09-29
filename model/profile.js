const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const GeneralInfo = require('./generalInfo');
const EducationInfo = require('./educationInfo');
const WorkInfo = require('./workInfo');
const DocumentInfo = require('./documentInfo');
const Profile = sequelize.define('Profile', {

    generalInfoId: {
        type: DataTypes.UUID,
        allowNull: true,

    },

    EducationInfo: {
        type: DataTypes.UUID,
        allowNull: true,

    },

    WorkInfo: {
        type: DataTypes.UUID,
        allowNull: true,

    },

    DocumentInfo: {
        type: DataTypes.UUID,
        allowNull: true,

    },
    user: {
        type: DataTypes.UUID,
        allowNull: true,

    },

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
});

Profile.hasMany(Profile, { foreignKey: 'id' })

Profile.belongsTo(GeneralInfo, {
    foreignKey: "generalInfoId",
    as: 'generalInfo'
})
Profile.belongsTo(EducationInfo, {
    foreignKey: "EducationInfo",
    as: 'educationInfo'
});
Profile.belongsTo(WorkInfo, {
    foreignKey: "WorkInfo",
    as: 'workInfo'
});
Profile.belongsTo(DocumentInfo, {
    foreignKey: "DocumentInfo",
    as: 'documentInfo'
});
module.exports = Profile;