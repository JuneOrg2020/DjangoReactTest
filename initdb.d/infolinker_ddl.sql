SET client_encoding = 'UTF8';

DROP TABLE IF EXISTS api_user;

CREATE TABLE api_user (
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    uuid uuid NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(255) NOT NULL,
    profile character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    is_admin boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);

ALTER TABLE api_user OWNER TO postgres;

ALTER TABLE ONLY api_user
    ADD CONSTRAINT api_user_email_key UNIQUE (email);

ALTER TABLE ONLY api_user
    ADD CONSTRAINT api_user_pkey PRIMARY KEY (uuid);

ALTER TABLE ONLY api_user
    ADD CONSTRAINT api_user_username_key UNIQUE (username);

CREATE INDEX api_user_email_9ef5afa6_like ON api_user USING btree (email varchar_pattern_ops);
CREATE INDEX api_user_username_cf4e88d2_like ON api_user USING btree (username varchar_pattern_ops);


DROP TABLE IF EXISTS infos;
CREATE TABLE infos(
	info_id serial,
	text VARCHAR(200) not null,
	tolink_id INT,
  user_id VARCHAR(50) not null,
  stock_count INT default 0,
  linked_count INT default 0,

	primary key(info_id)
);

drop index IF EXISTS idx_infos_01;
drop index IF EXISTS idx_infos_02;
drop index IF EXISTS idx_infos_03;

create index idx_infos_01 on infos (text);
create index idx_infos_02 on infos (user_id);
create index idx_infos_03 on infos (tolink_id);

DROP TABLE IF EXISTS linkers;
CREATE TABLE linkers(
	linker_id serial,
  link_type smallint CONSTRAINT positive_price CHECK (link_type <= 2),
	text VARCHAR(75) not null,
  info_1 INT not null,
  info_2 INT not null,
  user_id VARCHAR(50) not null,
  
	primary key(linker_id)
);
drop index IF EXISTS idx_linkers_01;
drop index IF EXISTS idx_linkers_02;
drop index IF EXISTS idx_linkers_03;
drop index IF EXISTS idx_linkers_04;
drop index IF EXISTS idx_linkers_05;
create index idx_linkers_01 on linkers (text);
create index idx_linkers_02 on linkers (link_type);
create index idx_linkers_03 on linkers (info_1);
create index idx_linkers_04 on linkers (info_2);
create index idx_linkers_05 on linkers (user_id);

DROP TABLE IF EXISTS stocks;
CREATE TABLE stocks(
  user_id VARCHAR(50) not null,
  info_id INT not null,
  is_stocked INT default 1,

	primary key(user_id, info_id)
);
drop index IF EXISTS idx_stocks_01;
create index idx_stocks_01 on stocks (user_id);
