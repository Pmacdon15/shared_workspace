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
    ('user2@example.com', 'User2', 'password2', 1),
    ('user3@example.com', 'User3', 'password3', 1),
    ('user4@example.com', 'User4', 'password4', 1),
    ('user5@example.com', 'User5', 'password5', 0),
    ('user6@example.com', 'User6', 'password6', 0);


INSERT INTO buildings (name, user_email, street, street_number, city, province, postal_code, location, smoking, parking, public_transport)
VALUES 
    ('The Apollo', 'user1@example.com', 'Oliver road', 1, 'Thunder Bay', 'Ontario', 'P7B 4M2', 'Port Arthur', 1, 1, 1), 
    ('The Daily Grind', 'user1@example.com', 'Banning St', 1, 'Nippon', 'Alberta', 'P7B 4M3', 'Fort William', 0, 1, 1),
    ('Studio Bell', 'user1@example.com', 'High St', 2, 'Kelowna', 'British Columbia', 'P7B 4M5', 'Current River', 1, 0, 0),
    ('The Event Centre', 'user2@example.com', 'Hill St', 3, 'North Bay', 'New Brunswick', 'P7B 4M6', 'East End', 0, 0, 1),
    ('Some Would Call it an Arena', 'user3@example.com', 'Memorial Ave', 4, 'Toronto', 'Newfoundland', 'P7B 4M7', 'Downtown', 1, 1, 0),
    ('Saddle Dome', 'user4@example.com', 'Cumberland st', 5, 'Kenora', 'Manitoba', 'P7B 4M8', 'North End', 0, 1, 0);



INSERT INTO workspaces (name, buildings_id, number_of_seats, price, lease_term, available, size, type)
VALUES 
    ('The Quite Place', 1, 1, 10.00, 1, 1, 100, 'Desk'),
    ('Conferences Palooza', 1, 2, 20.00, 2, 1, 200, 'Room'),
    ('Meeting Room A', 2, 3, 30.00, 3, 0, 300, 'Meeting Room'),
    ('Not Your Average Meeting Room', 2, 3, 35.00, 13, 0, 380, 'Meeting Room'),
    ('This Desk Makes You More Productive', 3, 1, 30.00, 1, 0, 300, 'Desk'),
    ('The Cabana Room', 3, 2, 40.00, 15, 1, 400, 'Room'),
    ('Collaboration Town', 4, 3, 50.00, 5, 1, 500, 'Meeting Room'),
    ('Work Gets Done Here', 4, 3, 55.00, 7, 0, 550, 'Meeting Room');
