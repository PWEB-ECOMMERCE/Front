--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-13 11:38:10 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE ecommerce;
--
-- TOC entry 3441 (class 1262 OID 19808)
-- Name: ecommerce; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LC_COLLATE = 'C' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE ecommerce OWNER TO postgres;

\connect ecommerce

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 19833)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    descricao character varying(255) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 19809)
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 19825)
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao character varying(255) NOT NULL,
    preco integer NOT NULL,
    imagem_url character varying(255) NOT NULL,
    quantidade integer NOT NULL,
    cat_id integer
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 19818)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    login character varying(255) NOT NULL,
    senha character varying(255) NOT NULL,
    endereco character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    administrador boolean NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 19843)
-- Name: venda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda (
    id integer NOT NULL,
    data_hora timestamp without time zone NOT NULL,
    usuario_id character varying(255) NOT NULL
);


ALTER TABLE public.venda OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 19853)
-- Name: venda_produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda_produto (
    venda_id integer NOT NULL,
    produto_id integer NOT NULL,
    quantidade integer NOT NULL
);


ALTER TABLE public.venda_produto OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 19833)
-- Dependencies: 218
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3430 (class 0 OID 19809)
-- Dependencies: 215
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.flyway_schema_history VALUES (1, '1', 'create-usuario-table', 'SQL', 'V1__create-usuario-table.sql', 1619974148, 'postgres', '2024-08-08 11:03:44.677576', 15, true);
INSERT INTO public.flyway_schema_history VALUES (2, '2', 'create-produto-table', 'SQL', 'V2__create-produto-table.sql', -1811602630, 'postgres', '2024-08-08 11:03:44.715056', 11, true);
INSERT INTO public.flyway_schema_history VALUES (3, '3', 'create-usuario-indexes', 'SQL', 'V3__create-usuario-indexes.sql', 1913036053, 'postgres', '2024-08-08 11:03:44.743963', 6, true);
INSERT INTO public.flyway_schema_history VALUES (4, '4', 'create-categoria-table', 'SQL', 'V4__create-categoria-table.sql', 2125414010, 'postgres', '2024-08-08 11:03:44.761935', 7, true);
INSERT INTO public.flyway_schema_history VALUES (5, '5', 'alter-produto-table', 'SQL', 'V5__alter-produto-table.sql', 1775299649, 'postgres', '2024-08-08 11:03:44.780159', 6, true);
INSERT INTO public.flyway_schema_history VALUES (6, '6', 'create-venda-table', 'SQL', 'V6__create-venda-table.sql', 1153420772, 'postgres', '2024-08-08 11:03:44.796208', 9, true);
INSERT INTO public.flyway_schema_history VALUES (7, '7', 'create-venda produto-table', 'SQL', 'V7__create-venda_produto-table.sql', 1862997980, 'postgres', '2024-08-08 11:03:44.815047', 7, true);


--
-- TOC entry 3432 (class 0 OID 19825)
-- Dependencies: 217
-- Data for Name: produto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3431 (class 0 OID 19818)
-- Dependencies: 216
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES ('b2fd337e-726f-4028-8697-01d8b837a324', 'dante araujo', 'dantearaujo', '$2a$10$9Fm7ulkgUDzvOc1Abgj4DOoU1SV9ZxmwU0SiLegxZDl5J7oJGOoga', 'rua antonele', 'danteeng@hotmail.com', false);
INSERT INTO public.usuario VALUES ('48116543-df63-43de-8ce6-6ea71e97c4e0', 'Leo Professor', 'leoprofessor', '$2a$10$kofjvUhE3EX4gTrz8DdYROwVkv0H5lArvOzBmvF5mMQHQTN/F4B02', 'SMD', 'leo@domain.com', false);
INSERT INTO public.usuario VALUES ('f7108fce-560c-4ab5-831d-0e45f7f67d6a', 'Dante Teste', 'testedante', '$2a$10$QWTrgB6P14vtXHuc/eUJCufOwRIiTqX/ZlDUkqHWmCCjn4bTjSaG.', 'Endereco', 'testeteste@domain.com', false);
INSERT INTO public.usuario VALUES ('9eeddd33-23dd-40ed-8193-1ea8b48b79ad', 'Ola Meu nome', 'adminadmin', '$2a$10$LrWXOYzNdQ1GkwAae0e5MeEkVQkSiTkW.RMmzuPBXxpJOYiw1SwX6', 'Endereco', 'adminadmin@hotmail.com', false);


--
-- TOC entry 3434 (class 0 OID 19843)
-- Dependencies: 219
-- Data for Name: venda; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3435 (class 0 OID 19853)
-- Dependencies: 220
-- Data for Name: venda_produto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3280 (class 2606 OID 19837)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 19816)
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 3284 (class 2606 OID 19857)
-- Name: venda_produto pk_venda_produto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT pk_venda_produto PRIMARY KEY (venda_id, produto_id);


--
-- TOC entry 3278 (class 2606 OID 19831)
-- Name: produto produto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 19824)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 3282 (class 2606 OID 19847)
-- Name: venda venda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT venda_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 1259 OID 19817)
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- TOC entry 3274 (class 1259 OID 19832)
-- Name: usuario_login_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX usuario_login_email_key ON public.usuario USING btree (login, email);


--
-- TOC entry 3285 (class 2606 OID 19838)
-- Name: produto fk_categoria_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT fk_categoria_id FOREIGN KEY (cat_id) REFERENCES public.categoria(id);


--
-- TOC entry 3286 (class 2606 OID 19848)
-- Name: venda fk_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


-- Completed on 2024-08-13 11:38:10 -03

--
-- PostgreSQL database dump complete
--

