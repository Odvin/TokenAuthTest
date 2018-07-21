INSERT INTO 
  users
VALUES
  (default, 'Ivan Mazepa', crypt('IvanPassword', gen_salt('bf', 8)), 'Ivan@gmail.com'),
  (default, 'Bogdan Hmelnitskiy', crypt('BogdanPassword', gen_salt('bf', 8)), 'Bogdan@gmail.com');