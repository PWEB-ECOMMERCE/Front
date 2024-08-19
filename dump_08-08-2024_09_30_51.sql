--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

-- ALTER TABLE ONLY public.venda DROP CONSTRAINT fk_usuario_id;
-- ALTER TABLE ONLY public.produto DROP CONSTRAINT fk_categoria_id;
-- DROP INDEX public.usuario_login_email_key;
-- DROP INDEX public.flyway_schema_history_s_idx;
-- ALTER TABLE ONLY public.venda DROP CONSTRAINT venda_pkey;
-- ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
-- ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_pkey;
-- ALTER TABLE ONLY public.venda_produto DROP CONSTRAINT pk_venda_produto;
-- ALTER TABLE ONLY public.flyway_schema_history DROP CONSTRAINT flyway_schema_history_pk;
-- ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
-- DROP TABLE public.venda_produto;
-- DROP TABLE public.venda;
-- DROP TABLE public.usuario;
-- DROP TABLE public.produto;
-- DROP TABLE public.flyway_schema_history;
-- DROP TABLE public.categoria;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    descricao character varying(255) NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
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
-- Name: venda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda (
    id integer NOT NULL,
    data_hora timestamp without time zone NOT NULL,
    usuario_id character varying(255) NOT NULL
);


ALTER TABLE public.venda OWNER TO postgres;

--
-- Name: venda_produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda_produto (
    venda_id integer NOT NULL,
    produto_id integer NOT NULL,
    quantidade integer NOT NULL
);


ALTER TABLE public.venda_produto OWNER TO postgres;

--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id, descricao) FROM stdin;
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	create-usuario-table	SQL	V1__create-usuario-table.sql	1619974148	postgres	2024-08-06 08:35:37.885639	19	t
2	2	create-produto-table	SQL	V2__create-produto-table.sql	-1811602630	postgres	2024-08-06 08:35:37.924005	14	t
3	3	create-usuario-indexes	SQL	V3__create-usuario-indexes.sql	1913036053	postgres	2024-08-06 08:35:37.954997	7	t
4	4	create-categoria-table	SQL	V4__create-categoria-table.sql	2125414010	postgres	2024-08-06 08:35:37.974266	8	t
5	5	alter-produto-table	SQL	V5__alter-produto-table.sql	1775299649	postgres	2024-08-06 08:35:37.995169	4	t
6	6	create-venda-table	SQL	V6__create-venda-table.sql	1153420772	postgres	2024-08-06 08:35:38.010779	8	t
7	7	create-venda produto-table	SQL	V7__create-venda_produto-table.sql	1862997980	postgres	2024-08-06 08:35:38.027008	6	t
\.


--
-- Data for Name: produto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produto (id, nome, descricao, preco, imagem_url, quantidade, cat_id) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, login, senha, endereco, email, administrador) FROM stdin;
261f52d4-901d-4112-be2b-89a62278be45	Dante Araújo	dantearaujo	$2a$10$9DkZ7VLGEJsiSOyiCULjUe1Og9uQd72PP7jZUUX70GODdNt7szCry	Rua Antonele Bezerra	danteeng@hotmail.com	f
6d9cdcce-93ff-48e1-9c54-7fb62fa2ba11	Dante Araujo	dantedante	$2a$10$9DkZ7VLGEJsiSOyiCULjUe1Og9uQd72PP7jZUUX70GODdNt7szCry	Rua Antonele Bezerra	dante@hotmail.com	f
15273df2-e11c-48d2-bf3d-9bcbf98a87a3	Admin Admin	admin	$2a$10$KJkPWhZYpahbNPAffk.atOM.WccDjGgUU8FgVz5U1RQb84bdr5O9G	smd	admin@domain.com	t
\.


--
-- Data for Name: venda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venda (id, data_hora, usuario_id) FROM stdin;
\.


--
-- Data for Name: venda_produto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.venda_produto (venda_id, produto_id, quantidade) FROM stdin;
\.


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: venda_produto pk_venda_produto; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT pk_venda_produto PRIMARY KEY (venda_id, produto_id);


--
-- Name: produto produto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: venda venda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT venda_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: usuario_login_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX usuario_login_email_key ON public.usuario USING btree (login, email);


--
-- Name: produto fk_categoria_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT fk_categoria_id FOREIGN KEY (cat_id) REFERENCES public.categoria(id);


--
-- Name: venda fk_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


--
-- PostgreSQL database dump complete
--

