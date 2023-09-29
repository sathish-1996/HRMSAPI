const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const EmployeeLeaveDetails = sequelize.define('EmployeeLeaveDetails', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    reportingPerson: {
        type: DataTypes.UUID,
        allowNull: false
    },
    employeeName: {
        type: DataTypes.STRING,
        allowNull: false

    },

    fromDateTs: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    toDateTs: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    fromDate: {
        type: DataTypes.STRING,
        allowNull: false

    },
    toDate: {
        type: DataTypes.STRING,
        allowNull: false

    },
    dateTs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reasonRequest: {
        type: DataTypes.STRING,
        allowNull: false

    },
    leaveType: {
        type: DataTypes.STRING,
        allowNull: false

    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    leaveStatus: {
        type: DataTypes.ENUM,
        values: ['APPLIED', 'PENDING', 'APPROVED', 'REJECTED', 'LOP'],
        defaultValue: 'APPLIED',
    },
    prePlan: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});

module.exports = EmployeeLeaveDetails;





