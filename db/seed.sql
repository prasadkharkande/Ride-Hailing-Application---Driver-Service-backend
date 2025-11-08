USE driver_service_db;

USE driver_service_db;

LOAD DATA INFILE './rhfd_drivers.csv'
INTO TABLE rhfd_drivers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(driver_id, name, phone, vehicle_type, vehicle_plate, @is_active)
SET is_active = IF(@is_active = 'True', 1, 0);