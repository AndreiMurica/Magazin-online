DROP TYPE IF EXISTS categ_produse;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_produse AS ENUM( 'fotbal', 'baschet', 'papuci', 'sneakerși', 'ingrijire', 'accesorii');
CREATE TYPE tipuri_produse AS ENUM('nike', 'adidas', 'jordan', 'off-white', 'vans');


CREATE TABLE IF NOT EXISTS adidasi (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   imagine VARCHAR(300),
   categorie categ_produse DEFAULT 'sneakerși',
   tip_produs tipuri_produse ,
   pret NUMERIC(8,2) NOT NULL,
   numar_de_culori INT NOT NULL CHECK (numar_de_culori >=0),   
   

   marimi VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   rezerva_sireturi BOOLEAN NOT NULL DEFAULT FALSE,
   
   data_adaugare TIMESTAMP DEFAULT current_timestamp
); 

