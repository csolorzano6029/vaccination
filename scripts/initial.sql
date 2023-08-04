CREATE SCHEMA IF NOT EXISTS vaccination_registry;

CREATE SEQUENCE vaccination_registry.person_id_seq START 1;
CREATE SEQUENCE vaccination_registry.employee_id_seq START 1;
CREATE SEQUENCE vaccination_registry.vaccine_id_seq START 1;
CREATE SEQUENCE vaccination_registry.employee_vaccination_id_seq START 1;
CREATE SEQUENCE vaccination_registry.user_id_seq START 1;
CREATE SEQUENCE vaccination_registry.role_id_seq START 1;
CREATE SEQUENCE vaccination_registry.user_role_id_seq START 1;


CREATE TABLE vaccination_registry.person (
    id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.person_id_seq'),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    dni NUMERIC(10) NOT NULL,
    status VARCHAR DEFAULT '1',
    created_date DATE,
    last_modified_date DATE
);

CREATE TABLE vaccination_registry.employee (
    id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.employee_id_seq'),
    person_id INTEGER REFERENCES vaccination_registry.person(id),
    email VARCHAR NOT NULL,
    birth_date DATE,
    home_address VARCHAR,
    mobile_phone VARCHAR,
    vaccination_status BOOLEAN,
    status VARCHAR DEFAULT '1',
    created_date DATE,
    last_modified_date DATE
);

CREATE TABLE vaccination_registry.vaccine (
    id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.vaccine_id_seq'),
    vaccine_type VARCHAR NOT NULL,
    status VARCHAR DEFAULT '1',
    created_date DATE,
    last_modified_date DATE
);

CREATE TABLE vaccination_registry.employee_vaccination (
    id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.employee_vaccination_id_seq'),
    employee_id INTEGER REFERENCES vaccination_registry.employee(id),
    vaccine_id INTEGER REFERENCES vaccination_registry.vaccine(id),
    vaccination_date DATE,
    dose_number INTEGER,
    status VARCHAR DEFAULT '1',
    created_date DATE,
    last_modified_date DATE
);

CREATE TABLE vaccination_registry.user (
    id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.user_id_seq'),
    employee_id INTEGER REFERENCES vaccination_registry.employee(id),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    status VARCHAR DEFAULT '1',
    created_date DATE,
    last_modified_date DATE
);

CREATE TABLE vaccination_registry.role (
  id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.role_id_seq'),
  name VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR DEFAULT '1',
  created_date DATE,
  last_modified_date DATE
);

CREATE TABLE vaccination_registry.user_role (
  id INTEGER PRIMARY KEY DEFAULT nextval('vaccination_registry.user_role_id_seq'),
  user_id INTEGER REFERENCES vaccination_registry.user(id),
  role_id INTEGER REFERENCES vaccination_registry.role(id),
  status VARCHAR DEFAULT '1',
  created_date DATE,
  last_modified_date DATE
);

INSERT INTO vaccination_registry.vaccine
(id, vaccine_type, status, created_date, last_modified_date)
VALUES(1, 'AstraZeneca', '1', '2023-04-16', NULL);
INSERT INTO vaccination_registry.vaccine
(id, vaccine_type, status, created_date, last_modified_date)
VALUES(2, 'Jhonson&Jhonson', '1', '2023-04-16', NULL);
INSERT INTO vaccination_registry.vaccine
(id, vaccine_type, status, created_date, last_modified_date)
VALUES(3, 'Pfizer', '1', '2023-04-16', NULL);
INSERT INTO vaccination_registry.vaccine
(id, vaccine_type, status, created_date, last_modified_date)
VALUES(4, 'Sputnik', '1', '2023-04-16', NULL);

INSERT INTO vaccination_registry."role"
(id, "name", status, created_date, last_modified_date)
VALUES(1, 'Administrator', '1', '2023-04-17', NULL);
INSERT INTO vaccination_registry."role"
(id, "name", status, created_date, last_modified_date)
VALUES(2, 'Employee', '1', '2023-04-17', NULL);


