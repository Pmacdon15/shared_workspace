CREATE DATABASE IF NOT EXISTS shared_workspace;
USE shared_workspace;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,  -- Make email column unique
    first_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE building (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (user_email) REFERENCES users(email),
    street VARCHAR(255) NOT NULL,
    street_number VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    parking BOOLEAN NOT NULL,
    public_transport BOOLEAN NOT NULL
);

CREATE TABLE workspace (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    building_id INT NOT NULL,
    FOREIGN KEY (building_id) REFERENCES building(id),
    number_of_seats INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    lease_term INT NOT NULL,
    Available BOOLEAN NOT NULL,
    size INT NOT NULL,
    type VARCHAR(255) NOT NULL
);

INSERT INTO users (email, first_name, password)
VALUES 
    ('user1@example.com', 'User1', 'password1'),
    ('user2@example.com', 'User2', 'password2'),
    ('user3@example.com', 'User3', 'password3');

INSERT INTO building (name, user_email, street, street_number, city, province, postal_code, location, parking, public_transport)
VALUES 
    ('Building1', 'user1@example.com', 'Street1', '1', 'City1', 'Province1', 'PostalCode1', 'Location1', 1, 1), 
    ('Building2', 'user2@example.com', 'Street2', '2', 'City2', 'Province2', 'PostalCode2', 'Location2', 0, 1),
    ('Building3', 'user3@example.com', 'Street3', '3', 'City3', 'Province3', 'PostalCode3', 'Location3', 1, 0);

INSERT INTO workspace (name, building_id, number_of_seats, price, lease_term, Available, size, type)
VALUES 
    ('Workspace1', 1, 1, 1, 100, 1, 100, 'Desk'),
    ('Workspace2', 2, 2, 2, 200, 2, 200, 'Room'),
    ('Workspace3', 3, 3, 3, 300, 3, 300, 'Meeting Room');
