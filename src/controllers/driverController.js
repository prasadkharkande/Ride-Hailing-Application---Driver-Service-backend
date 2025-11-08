const db = require('../config/db');
const util = require('util');
const dbQuery = util.promisify(db.query).bind(db);

// Get all drivers
const getAllDrivers = async () => {
    const qry = 'SELECT * FROM rhfd_drivers';
    const results = await dbQuery(qry);
    return results;
};

// Get driver by id
const getDriverById = async (driverId) => {
    const qry = 'SELECT * FROM rhfd_drivers WHERE driver_id = ?';
    const results = await dbQuery(qry, [driverId]);
    return results;
};

// Create a new driver and return the created record
const createDriver = async ({ name, phone, vehicle_type, vehicle_plate }, user) => {
    if (user) console.log('createDriver called by user:', user.id || user);
    const insertQry = 'INSERT INTO rhfd_drivers (name, phone, vehicle_type, vehicle_plate) VALUES (?, ?, ?, ?)';
    const insertDriverResult = await dbQuery(insertQry, [name, phone, vehicle_type, vehicle_plate]);

    const selectQry = 'SELECT * FROM rhfd_drivers WHERE driver_id = ?';
    const newlyCreatedDriver = await dbQuery(selectQry, [insertDriverResult.insertId]);
    return newlyCreatedDriver;
};

// Update driver
const updateDriver = async (driverId, { name, phone, vehicle_type, vehicle_plate, is_active }, user) => {
    if (user) console.log('updateDriver called by user:', user.id || user);
    const qry = 'UPDATE rhfd_drivers SET name = ?, phone = ?, vehicle_type = ?, vehicle_plate = ?, is_active = ? WHERE driver_id = ?';
    const result = await dbQuery(qry, [name, phone, vehicle_type, vehicle_plate, is_active, driverId]);
    return result;
};

// Toggle driver status and return new status
const toggleDriverStatus = async (driverId, user) => {
    if (user) console.log('toggleDriverStatus called by user:', user.id || user);
    const selectQry = 'SELECT is_active FROM rhfd_drivers WHERE driver_id = ?';
    const rows = await dbQuery(selectQry, [driverId]);
    if (!rows || rows.length === 0) return null;

    const newStatus = rows[0].is_active === 'true' ? 'false' : 'true';
    const updateQry = 'UPDATE rhfd_drivers SET is_active = ? WHERE driver_id = ?';
    await dbQuery(updateQry, [newStatus, driverId]);
    return newStatus;
};

// Delete driver
const deleteDriver = async (driverId, user) => {
    if (user) console.log('deleteDriver called by user:', user.id || user);
    const qry = 'DELETE FROM rhfd_drivers WHERE driver_id = ?';
    const result = await dbQuery(qry, [driverId]);
    return result;
};

module.exports = {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    toggleDriverStatus,
    deleteDriver
};
