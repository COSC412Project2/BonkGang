/*create schema, delete existing one if already exists*/
DROP SCHEMA IF EXISTS mydb ;

CREATE SCHEMA IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8;
USE mydb;

/*Delete users tables if exists and create new one with proper columns and datatypes*/
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL,
    name VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id)
);