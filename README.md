# WorkIndia-API
This is done using NodeJs, Express and MySQL

Clone the project.
Install all the dependencies by running npm i
Create tables in MySQl

Schema for tables :
   User table:
     create table users (
       email_id varchar(50),
       name varchar(50),
       dob date,
       aadhar_number varchar(12),
       pancard_number varchar(10),
       address varchar(255),
       pin varchar(255),
       account_number varchar(16),
       balance bigint default 0,
       account_state varchar(25) default "Active",
       last_transaction_timestamp timestamp
     )

   Transaction table:
     create table transaction (
       transaction_type varchar(10),
       transaction_timestamp timestamp,
       beneficiary_name varchar(25),
       sender_name varchar(25),
       amount bigint,
       transaction_name varchar(50),
       transaction_mode varchar(50)
     )
