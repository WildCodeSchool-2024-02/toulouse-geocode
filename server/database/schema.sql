create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

CREATE TABLE charging_station(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
id_station_itinerance VARCHAR(255) NULL,
station_name VARCHAR(255) NULL,
station_implantation VARCHAR(255) NULL,
station_adress TEXT NULL,
consolidated_longitude FLOAT NULL,
consolidated_latitude FLOAT NULL,
geojson_coordinates VARCHAR(255) NULL,
nbr_poc INT NULL,
power_voltage FLOAT NULL,
free TINYINT NULL,
access_condition VARCHAR(255) NULL,
is_booked TINYINT NULL,
hourly_access VARCHAR(255) NULL,
access_prm TEXT NULL,
motor_cycle_station TINYINT NULL,
launching_date VARCHAR(255) NULL,
update_date VARCHAR(255) NULL,
datagouv_organization_or_owner TEXT NULL);

CREATE TABLE payment_type(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    prepaid_payment TINYINT NULL,
    c_card_payment TINYINT NULL,
    cash_payment TINYINT NULL
    );

CREATE TABLE plug_type(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
plug_type_ef TINYINT NULL,
plug_type_2 TINYINT NULL,
plug_type_combo_ccs TINYINT NULL,
plug_type_chadeLu TINYINT NULL,
plug_type_autre TINYINT NULL
);

CREATE TABLE contact_message(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
message TEXT NOT NULL,
topic VARCHAR(255) NULL
)


