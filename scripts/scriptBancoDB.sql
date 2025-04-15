
-- -----------------------------------------------
-- Script de base de datos para proyecto Banco  --
-- -----------------------------------------------


-- -----------------------------------------------
-- create Schema                                --
-- -----------------------------------------------
drop schema if exists "bancoDB" CASCADE;
create schema "bancoDB" authorization postgres;


-- -----------------------------------------------
-- create tables                            --
-- -----------------------------------------------
drop table if exists "bancoDB"."user" cascade;
create table "bancoDB"."user" (
  id serial not null,
  rut varchar(50) not null unique,
  nombre varchar(50) not null,
  apellido varchar(50) not null,
  email varchar(50) not null,
  password varchar(100) not null,
  rol_id integer not null,
  createdAT timestamp not null,
  updatedAT timestamp null
);


drop table if exists "bancoDB"."rol" cascade;
create table "bancoDB"."rol" (
  id serial not null,
  rol varchar(50) not null,
  descripcion varchar(200) null
);


drop table if exists "bancoDB"."cards" cascade;
create table "bancoDB"."cards" (
  id serial not null,
  card_number varchar(20) not null,
  pin varchar(5) not null,
  balance numeric(10,2) not null,
  createdAt timestamp not null,
  updatedAt timestamp null,
  user_id integer not null
);


drop table if exists "bancoDB"."transactions" cascade;
create table "bancoDB"."transactions" (
  id serial not null, 
  tarjeta_origen_id integer not null,
  tarjeta_destino_id integer not null,
  monto numeric(10,2) not null,
  transaction_fecha timestamp not null
);



-- -----------------------------------------------
-- create primary Key--
-- -----------------------------------------------

ALTER TABLE "bancoDB"."user"  ADD constraint "PK_user" PRIMARY KEY (id);
ALTER TABLE "bancoDB"."rol" ADD constraint "PK_rol" PRIMARY KEY(id);
ALTER TABLE "bancoDB"."cards" ADD constraint "PK_cards" PRIMARY KEY(id);
ALTER TABLE "bancoDB"."transactions" ADD constraint "PK_transactions" PRIMARY KEY(id);



-- -----------------------------------------------
-- create foreign Key--
-- -----------------------------------------------


ALTER TABLE "bancoDB"."user" ADD constraint "FK_user" foreign key(rol_id)
references "bancoDB"."rol" (id) ON DELETE cascade;

ALTER TABLE "bancoDB"."cards" ADD constraint "FK_cards" foreign key(user_id)
references "bancoDB"."user" (id) ON DELETE cascade;

ALTER TABLE "bancoDB"."transactions" ADD constraint "FK_cards_origen" foreign key(tarjeta_origen_id)
references "bancoDB"."cards" (id) ON DELETE cascade;

ALTER TABLE "bancoDB"."transactions" ADD constraint "FK_cards_destino" foreign key(tarjeta_destino_id)
references "bancoDB"."cards" (id) ON DELETE cascade;




-- -----------------------------------------------
-- records --
-- -----------------------------------------------

-- -----------------------------------------------
-- records rol--
-- -----------------------------------------------
insert into "bancoDB"."rol" values(default, 'admin', 'usuario administrador');
insert into "bancoDB"."rol" values(default, 'cliente', 'usuario logiado');


-- -----------------------------------------------
-- records user--
-- -----------------------------------------------
--                                                                                                             123456789
insert into "bancoDB"."user" values(default, '50530729-1', 'Maria', 'Gonzales', 'maria.gonzales@gmail.com', '$2a$12$9PikddlynQLmaRBfNv2tdOh5mBAxb84jW.XijpOwkxOAOtox8AK1a', 1, NOW(), null);
--                                                                                                                   1234567890
insert into "bancoDB"."user" values(default, '28649715-2', 'Fulatino', 'Martinez', 'fulanito.martinez@gmail.com', '$2a$12$0HiX0.liKLLLEY3ZyNioSORtFrBdF.geANsogLZIynU650r6.1.ye', 2, NOW(), null);
insert into "bancoDB"."user" values(default, '28649715-3', 'Pedro', 'Hernandez', 'pedro.hernandez@gmail.com', '$2a$12$0HiX0.liKLLLEY3ZyNioSORtFrBdF.geANsogLZIynU650r6.1.ye', 2, NOW(), null);
insert into "bancoDB"."user" values(default, '28649715-4', 'Carlitos', 'Mamani', 'carlitos.mamani@gmail.com', '$2a$12$0HiX0.liKLLLEY3ZyNioSORtFrBdF.geANsogLZIynU650r6.1.ye', 2, NOW(), null);
insert into "bancoDB"."user" values(default, '28649715-5', 'Manuel', 'Hourvilleur', 'manuel.hourvilleur@gmail.com', '$2a$12$0HiX0.liKLLLEY3ZyNioSORtFrBdF.geANsogLZIynU650r6.1.ye', 2, NOW(), null);
insert into "bancoDB"."user" values(default, '28649715-6', 'Daniel', 'Martinez', 'daniel.martinez@gmail.com', '$2a$12$0HiX0.liKLLLEY3ZyNioSORtFrBdF.geANsogLZIynU650r6.1.ye', 2, NOW(), null);



-- -----------------------------------------------
-- records cards--
-- -----------------------------------------------
insert into "bancoDB"."cards" values(default, '4546-8574-1856-5565', '4345', 40555, now(), null, 2);
insert into "bancoDB"."cards" values(default, '5595-3458-9989-7125', '1595', 3566, now(), null, 3);
insert into "bancoDB"."cards" values(default, '4858-6696-5887-1578', '1234', 23, now(), null, 4);
insert into "bancoDB"."cards" values(default, '5854-6656-2587-1547', '4345', 300, now(), null, 5);
insert into "bancoDB"."cards" values(default, '4546-9896-2357-1478', '0023', 35621, now(), null, 6);



-- -----------------------------------------------
-- records cards--
-- -----------------------------------------------
insert into "bancoDB"."transactions" values(default, 1, 3, 1000, now());
insert into "bancoDB"."transactions" values(default, 2, 4, 500, now());









