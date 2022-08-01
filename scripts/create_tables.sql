SHOW search_path;
SET search_path TO public;

CREATE SEQUENCE roles_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 11
  CACHE 1;

CREATE SEQUENCE employees_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 11
  CACHE 1;  

-- Creation of roles table
CREATE TABLE IF NOT EXISTS roles (
  id integer NOT NULL DEFAULT nextval('roles_seq') PRIMARY KEY,
  role_code varchar(100) NOT NULL UNIQUE,
  role_name varchar(250) NOT NULL
);

-- Creation of employees table
CREATE TABLE IF NOT EXISTS employees (
  id integer NOT NULL DEFAULT nextval('employees_seq') PRIMARY KEY,
  name varchar(250) NOT NULL,
  email varchar(250) NOT NULL UNIQUE,
  username varchar(250) NOT NULL UNIQUE,
  role_id INT NOT NULL,
  CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	  REFERENCES roles(id)
);