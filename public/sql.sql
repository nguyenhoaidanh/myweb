
DROP DATABASE IF EXISTS `myweb`;

CREATE DATABASE `myweb` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `myweb`;


CREATE TABLE IF NOT EXISTS users(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(100) NOT NULL UNIQUE,
   phone VARCHAR(15) NOT NULL ,
   email VARCHAR(100) NOT NULL UNIQUE,
   pass VARCHAR(100) NOT NULL,
   dateDK DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   gender VARCHAR(15) NOT NULL,
   bDate Date,
   imgSrc VARCHAR(100)
   
);

CREATE TABLE IF NOT EXISTS item(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   price VARCHAR(15) NOT NULL ,
   oldPrice VARCHAR(100) NOT NULL,
   quantity INT NOT NULL,
   type VARCHAR(100) NOT NULL,
   imgSrc VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS inCart(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   userId INT NOT NULL,
   itemId  INT NOT NULL,
   itemName VARCHAR(100) NOT NULL,
   quantity  INT NOT NULL,
   FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE RESTRICT,
    
  FOREIGN KEY (itemId)
        REFERENCES item(id)
        ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS cart(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   userId INT NOT NULL,
   FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE RESTRICT
);


insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Mỹ phẩm','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Mỹ phẩm','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Mỹ phẩm','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Mỹ phẩm','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt','100000đ','2000000đ',100,'Mỹ phẩm','/image/item.jpg');



insert into users(username,phone,email,pass,dateDK,gender,bDate,imgSrc) 
values('danhnguyen','0123233','nguyenhoaidanh2096@gmail.com','123',Now(),'male',Curdate(),'');
insert into users(username,phone,email,pass,dateDK,gender,bDate,imgSrc) 
 values('danhnguyen1','01232333','nguyenhoaidanh2097@gmail.com','123',Now(),'male',Curdate(),'');




DELIMITER //
DROP PROCEDURE IF EXISTS `getUserInfo`//

CREATE PROCEDURE `getUserInfo`(
    IN  _email  VARCHAR(100),
    IN  _pass   VARCHAR(100))
BEGIN
    SELECT id,username,phone,dateDK,bDate,imgSrc,email,gender FROM users WHERE email = _email AND pass = _pass;
END;//



DROP FUNCTION IF EXISTS `isAvailable`//

CREATE FUNCTION `isAvailable` (_email VARCHAR(100), _username VARCHAR(100)) 
RETURNS VARCHAR(100) 

BEGIN 
  declare countEmail INT unsigned DEFAULT 0;
    declare countUsername INT unsigned DEFAULT 0;
  SELECT count(*) into countEmail FROM users WHERE email = _email ;
  SELECT count(*) into countUsername FROM users WHERE username = _username;
  if countUsername<>0
    then
    RETURN 'This username was used';
    end if;
    
    if countEmail<>0
    then
    RETURN 'This email was used';
  else RETURN '';
    end if;
    
END;//









