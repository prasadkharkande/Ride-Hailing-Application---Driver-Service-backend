CREATE DATABASE IF NOT EXISTS driver_service_db;
USE driver_service_db;

CREATE TABLE IF NOT EXISTS rhfd_drivers (
    driver_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    vehicle_type VARCHAR(20) NOT NULL,
    vehicle_plate VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT true
);