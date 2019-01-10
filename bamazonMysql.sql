Drop Database if Exists bamazon_db;
create database bamazon_db; 
use bamazon_DB;
create table products (
item_id int not null auto_increment, 
product_name varchar (30) not null, 
department_name varchar(45) not null, 
price int default 0,
stock_quantity int default 0, 
primary key (item_id) ); 

alter table products change departtment_name department_name varchar(45) not null;

select * from products;
insert into products (product_name,department_name,price,stock_quantity)
values ("vacuum cleaner", "Appliances", 200, 10);

insert into products (product_name,department_name,price,stock_quantity)
values ("Samsung 9 Note", "Electronics", 800, 20);

insert into products (product_name,department_name,price,stock_quantity)
values ("Apple 10", "Electronics", 900, 20);

insert into products (product_name,department_name,price,stock_quantity)
values ("Refrigerator", "Appliances", 400, 2);

insert into products (product_name,department_name,price,stock_quantity)
values ("Sofa", "Furnature", 150, 12);

insert into products (product_name,department_name,price,stock_quantity)
values ("Freezer", "Appliances", 350, 20);

insert into products (product_name,department_name,price,stock_quantity)
values ("Game of Thrones", "Books", 45, 5);

insert into products (product_name,department_name,price,stock_quantity)
values ("Buzz saw", "Tools", 65, 7);

insert into products (product_name,department_name,price,stock_quantity)
values ("Diamond ring", "Jewelry", 500, 10);

insert into products (product_name,department_name,price,stock_quantity)
values ("Food", "Groceries", 75, 100);

insert into products (product_name,department_name,price,stock_quantity)
values ("Dumb bells", "Sports", 75, 9);

