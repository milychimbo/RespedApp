/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     6/3/2022 11:04:38 PM                         */
/*==============================================================*/


drop table if exists CATEGORIA;

drop table if exists DIRECCION;

drop table if exists ESTADO;

drop table if exists PEDIDODOMICILIO;

drop table if exists PEDIDOLOCAL;

drop table if exists PEDIDORESERVA;

drop table if exists PEDIDOTOTAL;

drop table if exists PRODUCTO;

drop table if exists RELACIONPEDIDOPRODUCTO;

drop table if exists RELACIONUSUARIODIRECCION;

drop table if exists RESERVA;

drop table if exists TIPOUSUARIO;

drop table if exists USUARIO;

/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA
(
   IDCATEGORIA          int not null auto_increment,
   NAME                 varchar(20) not null,
   primary key (IDCATEGORIA)
);

/*==============================================================*/
/* Table: DIRECCION                                             */
/*==============================================================*/
create table DIRECCION
(
   IDDIRECCION          int not null auto_increment,
   REFERENCE            varchar(150),
   STREET1              varchar(100) not null,
   STREET2              varchar(100) not null,
   primary key (IDDIRECCION)
);

/*==============================================================*/
/* Table: ESTADO                                                */
/*==============================================================*/
create table ESTADO
(
   IDSTATE              int not null auto_increment,
   STATE                varchar(20) not null,
   primary key (IDSTATE)
);

/*==============================================================*/
/* Table: PEDIDODOMICILIO                                       */
/*==============================================================*/
create table PEDIDODOMICILIO
(
   IDPEDIDO             int not null auto_increment,
   IDRELACIONUD         int not null,
   IDPEDIDOTOTAL        int not null,
   ENVIO                float not null,
   primary key (IDPEDIDO)
);

/*==============================================================*/
/* Table: PEDIDOLOCAL                                           */
/*==============================================================*/
create table PEDIDOLOCAL
(
   IDPEDIDO             int not null auto_increment,
   IDUSUARIO            int not null,
   IDPEDIDOTOTAL        int not null,
   MESA                 int not null,
   primary key (IDPEDIDO)
);

/*==============================================================*/
/* Table: PEDIDORESERVA                                         */
/*==============================================================*/
create table PEDIDORESERVA
(
   IDPEDIDO             int not null auto_increment,
   IDRESERVA            int not null,
   IDPEDIDOTOTAL        int not null,
   primary key (IDPEDIDO)
);

/*==============================================================*/
/* Table: PEDIDOTOTAL                                           */
/*==============================================================*/
create table PEDIDOTOTAL
(
   IDPEDIDOTOTAL        int not null auto_increment,
   IDSTATE              int not null,
   VALORTOTAL           float not null,
   NOTE                 varchar(150),
   primary key (IDPEDIDOTOTAL)
);

/*==============================================================*/
/* Table: PRODUCTO                                              */
/*==============================================================*/
create table PRODUCTO
(
   IDPRODUCTO           int not null auto_increment,
   IDCATEGORIA          int not null,
   NAME                 varchar(100) not null,
   DETAIL               varchar(200),
   PRICE                float not null,
   IMAGE                longtext,
   AVAILABILITY         int not null,
   primary key (IDPRODUCTO)
);

/*==============================================================*/
/* Table: RELACIONPEDIDOPRODUCTO                                */
/*==============================================================*/
create table RELACIONPEDIDOPRODUCTO
(
   IDRELACIONPP         int not null auto_increment,
   IDPEDIDOTOTAL        int not null,
   IDPRODUCTO           int not null,
   PRICE                float not null,
   primary key (IDRELACIONPP)
);

/*==============================================================*/
/* Table: RELACIONUSUARIODIRECCION                              */
/*==============================================================*/
create table RELACIONUSUARIODIRECCION
(
   IDRELACIONUD         int not null auto_increment,
   IDUSUARIO            int not null,
   IDDIRECCION          int not null,
   primary key (IDRELACIONUD)
);

/*==============================================================*/
/* Table: RESERVA                                               */
/*==============================================================*/
create table RESERVA
(
   IDRESERVA            int not null auto_increment,
   IDUSUARIO            int not null,
   PEOPLE               int not null,
   NOTE                 varchar(150),
   RESERVATIONDATE      date not null,
   RESERVATIONTIME      varchar(5) not null,
   primary key (IDRESERVA)
);

/*==============================================================*/
/* Table: TIPOUSUARIO                                           */
/*==============================================================*/
create table TIPOUSUARIO
(
   IDTIPOUSUARIO        int not null auto_increment,
   TIPO                 varchar(20) not null,
   primary key (IDTIPOUSUARIO)
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO
(
   IDUSUARIO            int not null auto_increment,
   IDTIPOUSUARIO        int not null,
   USERNAME             varchar(20) not null,
   EMAIL                varchar(100) not null,
   NAME                 varchar(100),
   LASTNAME             varchar(100),
   PASSWORD             varchar(12) not null,
   PHONE                varchar(15) not null,
   primary key (IDUSUARIO),
   key AK_IDENTIFIER_2 (USERNAME)
);

alter table PEDIDODOMICILIO add constraint FK_RELATIONSHIP_10 foreign key (IDRELACIONUD)
      references RELACIONUSUARIODIRECCION (IDRELACIONUD) on delete cascade on update cascade;

alter table PEDIDODOMICILIO add constraint FK_RELATIONSHIP_15 foreign key (IDPEDIDOTOTAL)
      references PEDIDOTOTAL (IDPEDIDOTOTAL) on delete cascade on update cascade;

alter table PEDIDOLOCAL add constraint FK_RELATIONSHIP_13 foreign key (IDPEDIDOTOTAL)
      references PEDIDOTOTAL (IDPEDIDOTOTAL) on delete cascade on update cascade;

alter table PEDIDOLOCAL add constraint FK_RELATIONSHIP_9 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete cascade on update cascade;

alter table PEDIDORESERVA add constraint FK_RELATIONSHIP_12 foreign key (IDRESERVA)
      references RESERVA (IDRESERVA) on delete cascade on update cascade;

alter table PEDIDORESERVA add constraint FK_RELATIONSHIP_14 foreign key (IDPEDIDOTOTAL)
      references PEDIDOTOTAL (IDPEDIDOTOTAL) on delete cascade on update cascade;

alter table PEDIDOTOTAL add constraint FK_RELATIONSHIP_18 foreign key (IDSTATE)
      references ESTADO (IDSTATE) on delete cascade on update cascade;

alter table PRODUCTO add constraint FK_RELATIONSHIP_17 foreign key (IDCATEGORIA)
      references CATEGORIA (IDCATEGORIA) on delete cascade on update cascade;

alter table RELACIONPEDIDOPRODUCTO add constraint FK_REFERENCE_18 foreign key (IDPEDIDOTOTAL)
      references PEDIDOTOTAL (IDPEDIDOTOTAL) on delete cascade on update cascade;

alter table RELACIONPEDIDOPRODUCTO add constraint FK_REFERENCE_19 foreign key (IDPRODUCTO)
      references PRODUCTO (IDPRODUCTO) on delete cascade on update cascade;

alter table RELACIONUSUARIODIRECCION add constraint FK_RELATIONSHIP_19 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete cascade on update cascade;

alter table RELACIONUSUARIODIRECCION add constraint FK_RELATIONSHIP_20 foreign key (IDDIRECCION)
      references DIRECCION (IDDIRECCION) on delete cascade on update cascade;

alter table RESERVA add constraint FK_RELATIONSHIP_11 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete cascade on update cascade;

alter table USUARIO add constraint FK_RELATIONSHIP_16 foreign key (IDTIPOUSUARIO)
      references TIPOUSUARIO (IDTIPOUSUARIO) on delete cascade on update cascade;

