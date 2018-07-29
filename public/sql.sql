
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
   role VARCHAR(100) NOT NULL DEFAULT 'user',
   imgSrc VARCHAR(100)
   
);

CREATE TABLE IF NOT EXISTS item(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   price INT NOT NULL ,
   oldPrice INT NOT NULL ,
   quantity INT NOT NULL,
   type VARCHAR(100) NOT NULL,
   imgSrc VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS inCart(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   userId INT NOT NULL,
   itemId  INT NOT NULL,
   itemName VARCHAR(100) NOT NULL,
    price INT NOT NULL ,
   oldPrice INT NOT NULL ,
   quantity  INT NOT NULL,
    imgSrc VARCHAR(100),
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
values ('USB 16GB siêu tốt',100000,2000000,100,'Điện tử','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Điện thoại',100000,2000000,100,'Điện tử','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Tai nghe',100000,2000000,100,'Điện tử','/image/ava.png');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Loa bluetooth',100000,2000000,100,'Điện tử','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Lumia',100000,2000000,100,'Điện tử','/image/cart.png');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Iphone x',100000,2000000,100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Laptop Asus',100000,2000000,100,'Điện tử','/image/3.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Xe điều khiển',100000,2000000,100,'Điện tử','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Máy hút bụi',100000,2000000,100,'Điện tử','/image/logo.png');


insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask2',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask1',100000,2000000,100,'Mỹ phẩm','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask1',100000,2000000,100,'Mỹ phẩm','/image/3.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask23',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/3.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/3.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Mask',100000,2000000,100,'Mỹ phẩm','/image/1.jpg');




insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/3.jpg');

insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Áo thun USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('USB 16GB siêu tốt',100000,2000000,100,'Quần áo','/image/item.jpg');


insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/2.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/item.jpg');


insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan',100000,2000000,100,'Sách vở','/image/item.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/3.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/1.jpg');
insert into item(name, price,oldPrice, quantity,type,imgSrc) 
values ('Conan USB 16GB siêu tốt',100000,2000000,100,'Sách vở','/image/ava.png');




-- pass 123--
insert into users(username,phone,email,pass,role,dateDK,gender,bDate,imgSrc) 
values('danhnguyen','0123233','nguyenhoaidanh2096@gmail.com','40bd001563085fc35165329ea1ff5c5ecbdbbeef','admin',Now(),'male',Curdate(),'');
insert into users(username,phone,email,pass,dateDK,gender,bDate,imgSrc) 
 values('danhnguyen1','01232333','nguyenhoaidanh2097@gmail.com','40bd001563085fc35165329ea1ff5c5ecbdbbeef',Now(),'male',Curdate(),'');




DELIMITER //
DROP PROCEDURE IF EXISTS `getUserInfo`//

CREATE PROCEDURE `getUserInfo`(
    IN  _email  VARCHAR(100))
    
BEGIN
    SELECT id,pass,username,role,phone,dateDK,bDate,imgSrc,email,gender FROM users WHERE email = _email ;
END;//


DELIMITER //
DROP PROCEDURE IF EXISTS `updateItem`//

CREATE PROCEDURE `updateItem`(
  IN  _id  int,
    IN  _name  VARCHAR(100),
    IN  _price  Int,
    IN  _oldPrice  Int,
  IN  _quantity  Int,
    IN  _type  VARCHAR(100),
    IN  _imgSrc  VARCHAR(100))
    
BEGIN 
    declare cur int;
    select price into cur from item where id=_id;
    if cur<> _price then
     update item
      set price=_price, oldPrice=cur
      where id=_id;
    end if;
    
    update item
  set 
    name=_name,
       
        quantity=_quantity,
        type=_type,
        imgSrc=_imgSrc
  where id=_id;
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


DROP FUNCTION IF EXISTS `emailIsAvailable`//

CREATE FUNCTION `emailIsAvailable` (_email VARCHAR(100)) 
RETURNS VARCHAR(100) 

BEGIN 
  declare countEmail INT unsigned DEFAULT 0;
   
  SELECT count(*) into countEmail FROM users WHERE email = _email ;
   
    if countEmail=0
    then
    RETURN 'Email chưa tồn tại trong hệ thống';
     else RETURN '';
    end if;
    
END;//




DROP PROCEDURE IF EXISTS `updateUserInfo`//

CREATE PROCEDURE `updateUserInfo`(
    IN  _id          INT,
    IN  _username  VARCHAR(100),
    IN  _Bdate       DATE,
    IN  _phone       VARCHAR(15),
    IN  _imgSrc      VARCHAR(100))
BEGIN
    UPDATE users
    SET     username = _username,
     
        Bdate      = _Bdate,
        phone      = _phone,
        imgSrc      = _imgSrc
  WHERE  id = _id;
END;//


DROP PROCEDURE IF EXISTS `getUserInfoById`//

CREATE PROCEDURE `getUserInfoById`(
    IN  _id  INT(11))
BEGIN
    SELECT id,username,pass,role,phone,dateDK,bDate,imgSrc,email,gender  
    FROM users WHERE id = _id;
END;//



DELIMITER //
DROP PROCEDURE IF EXISTS search //
CREATE PROCEDURE 
  search( keyword varchar(100))
BEGIN  
  IF CHARACTER_LENGTH(keyword) = 0 THEN
    select *from item; 
  ELSE
    select *from item where name like CONCAT('%', keyword,'%')
        or type like CONCAT('%', keyword,'%'); 
    END IF;
END 
//
DELIMITER ;
