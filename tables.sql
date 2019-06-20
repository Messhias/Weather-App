CREATE TABLE my_locations (
   ID serial NOT NULL PRIMARY KEY,
   city varchar(200),
   country varchar(200),
   is_default bool default false
);

create table countries_list (
    id serial not null primary key,
    country varchar(200),
    capital varchar(200),
    info json not null
);

create table locations_data (
    id serial not null primary key,
    country varchar(200),
    city varchar(200),
    info json not null
);