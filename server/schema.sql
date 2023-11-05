CREATE DATABASE IF NOT EXISTS shared_workspaces;
USE shared_workspaces;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    owner BOOLEAN NOT NULL
);

CREATE TABLE buildings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE,
    street VARCHAR(255) NOT NULL,
    street_number INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    smoking BOOLEAN NOT NULL,
    parking BOOLEAN NOT NULL,
    public_transport BOOLEAN NOT NULL
);

CREATE TABLE workspaces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    buildings_id INT NOT NULL,  
    FOREIGN KEY (buildings_id) REFERENCES buildings(id) ON DELETE CASCADE,
    number_of_seats INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    lease_term INT NOT NULL,
    available BOOLEAN NOT NULL,
    size INT NOT NULL,
    type VARCHAR(255) NOT NULL
);

INSERT INTO users (email, first_name, password, owner)
VALUES 
    ('user1@example.com', 'User1', 'password1', 1),
    ('user2@example.com', 'User2', 'password2', 0),
    ('user3@example.com', 'User3', 'password3', 1),
    ('user4@example.com', 'User4', 'password4', 0);


INSERT INTO buildings (name, user_email, street, street_number, city, province, postal_code, location, smoking, parking, public_transport)
VALUES 
    ('Building1', 'user1@example.com', 'Street1', 1, 'City1', 'Province1', 'PostalCode1', 'Location1', 1, 1, 1), 
    ('Building2', 'user2@example.com', 'Street2', 1, 'City2', 'Province2', 'PostalCode2', 'Location2', 0, 1, 1),
    ('Building3', 'user3@example.com', 'Street3', 2, 'City3', 'Province3', 'PostalCode3', 'Location3', 1, 0, 0),
    ('Building4', 'user4@example.com', 'Street4', 3, 'City4', 'Province4', 'PostalCode4', 'Location4', 0, 0, 1);


INSERT INTO workspaces (name, buildings_id, number_of_seats, price, lease_term, available, size, type)
VALUES 
    ('Workspace1', 1, 1, 10.00, 100, 1, 100, 'Desk'),
    ('Workspace2', 1, 2, 20.00, 200, 1, 200, 'Room'),
    ('Workspace3', 2, 3, 30.00, 300, 0, 300, 'Meeting Room'),
    ('Workspace4', 2, 3, 35.00, 350, 0, 380, 'Meeting Room'),
    ('Workspace5', 3, 1, 30.00, 300, 0, 300, 'Desk'),
    ('Workspace6', 3, 2, 40.00, 400, 1, 400, 'Room'),
    ('Workspace7', 4, 3, 50.00, 500, 1, 500, 'Meeting Room'),
    ('Workspace8', 4, 3, 55.00, 550, 0, 550, 'Meeting Room');
