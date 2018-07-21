-- CREATE EXTENSION pgcrypto;

-- Users
CREATE TABLE users (
  id           uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  password     text NOT NULL,
  email        text UNIQUE NOT NULL
);

CREATE INDEX users_email on users (email);