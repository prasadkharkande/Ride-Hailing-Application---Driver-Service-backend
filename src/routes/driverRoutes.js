const express = require('express');
const router = express.Router();
const driver = require('../controllers/driverController');

router.get('/', async (req, res) => {
    try {
        const drivers = await driver.getAllDrivers();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rows = await driver.getDriverById(req.params.id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, phone, vehicle_type, vehicle_plate } = req.body;
        const created = await driver.createDriver({ name, phone, vehicle_type, vehicle_plate });
        const newDriver = Array.isArray(created) ? created[0] : created;
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, phone, vehicle_type, vehicle_plate, is_active } = req.body;
        await driver.updateDriver(req.params.id, { name, phone, vehicle_type, vehicle_plate, is_active });
        res.json({ message: 'Driver updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id/toggle-status', async (req, res) => {
    try {
        const newStatus = await driver.toggleDriverStatus(req.params.id);
        if (newStatus === null) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json({ message: 'Driver status updated successfully', is_active: newStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await driver.deleteDriver(req.params.id);
        res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;