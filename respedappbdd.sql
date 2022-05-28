/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/*==============================================================*/


drop table if exists CATEGORIA;

drop table if exists DIRECCION;

drop table if exists PEDIDO;

drop table if exists PRODUCTO;

drop table if exists RELACIONPEDIDOPRODUCTO;

drop table if exists RESERVA;

drop table if exists TIPOPEDIDO;

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
   IDUSUARIO            int not null,
   REFERENCE            varchar(150),
   STREET1              varchar(100) not null,
   STREET2              varchar(100) not null,
   primary key (IDDIRECCION)
);

/*==============================================================*/
/* Table: PEDIDO                                                */
/*==============================================================*/
create table PEDIDO
(
   IDPEDIDO             int not null auto_increment,
   IDTIPOPEDIDO         int not null,
   IDDIRECCION          int not null,
   IDUSUARIO            int not null,
   TOTALPRICE           float not null,
   NOTE                 varchar(150),
   STATE                varchar(20) not null,
   primary key (IDPEDIDO)
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
   IDPEDIDO             int not null,
   IDPRODUCTO           int not null,
   PRICE                float not null
);

/*==============================================================*/
/* Table: RESERVA                                               */
/*==============================================================*/
create table RESERVA
(
   IDRESERVA            int not null auto_increment,
   IDUSUARIO            int not null,
   IDPEDIDO             int,
   PEOPLE               int not null,
   NOTE                 varchar(150),
   RESERVATIONDATE      date not null,
   RESERVATIONTIME      varchar(5) not null,
   primary key (IDRESERVA)
);

/*==============================================================*/
/* Table: TIPOPEDIDO                                            */
/*==============================================================*/
create table TIPOPEDIDO
(
   IDTIPOPEDIDO         int not null auto_increment,
   TIPO                 varchar(20) not null,
   EXTRA                float not null,
   primary key (IDTIPOPEDIDO)
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
   unique key AK_KEY_2 (USERNAME)
);

alter table DIRECCION add constraint FK_RELATIONSHIP_10 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete restrict on update restrict;

alter table PEDIDO add constraint FK_RELATIONSHIP_11 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete restrict on update restrict;

alter table PEDIDO add constraint FK_RELATIONSHIP_13 foreign key (IDDIRECCION)
      references DIRECCION (IDDIRECCION) on delete restrict on update restrict;

alter table PEDIDO add constraint FK_RELATIONSHIP_15 foreign key (IDTIPOPEDIDO)
      references TIPOPEDIDO (IDTIPOPEDIDO) on delete restrict on update restrict;

alter table PRODUCTO add constraint FK_RELATIONSHIP_17 foreign key (IDCATEGORIA)
      references CATEGORIA (IDCATEGORIA) on delete restrict on update restrict;

alter table RELACIONPEDIDOPRODUCTO add constraint FK_REFERENCE_18 foreign key (IDPEDIDO)
      references PEDIDO (IDPEDIDO) on delete restrict on update restrict;

alter table RELACIONPEDIDOPRODUCTO add constraint FK_REFERENCE_19 foreign key (IDPRODUCTO)
      references PRODUCTO (IDPRODUCTO) on delete restrict on update restrict;

alter table RESERVA add constraint FK_RELATIONSHIP_12 foreign key (IDPEDIDO)
      references PEDIDO (IDPEDIDO) on delete restrict on update restrict;

alter table RESERVA add constraint FK_RELATIONSHIP_14 foreign key (IDUSUARIO)
      references USUARIO (IDUSUARIO) on delete restrict on update restrict;

alter table USUARIO add constraint FK_RELATIONSHIP_16 foreign key (IDTIPOUSUARIO)
      references TIPOUSUARIO (IDTIPOUSUARIO) on delete restrict on update restrict;

