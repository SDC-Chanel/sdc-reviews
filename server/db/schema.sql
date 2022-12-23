-- CREATE DATABASE
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviews_photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristic_reviews CASCADE;

-- CREATE reviews csv
-- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  rating INT,
  date BIGINT,
  summary VARCHAR(500),
  body VARCHAR(500),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(200),
  response VARCHAR(500),
  helpfulness INT
);

-- LOAD reviews csv
COPY reviews
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/reviews.csv'
DELIMITER ','
CSV HEADER;

-- reviews_photos csv
-- id,review_id,url
CREATE TABLE reviews_photos (
  photo_id SERIAL PRIMARY KEY,
  review_id SERIAL,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- LOAD reviews_photos csv
COPY reviews_photos
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

-- characteristics csv
-- id,product_id,name
CREATE TABLE characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  name TEXT
);

-- LOAD characteristics csv
COPY characteristics
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- characteristic_reviews csv
-- id,characteristic_id,review_id,value
CREATE TABLE characteristic_reviews (
  characteristic_reviews_id SERIAL PRIMARY KEY,
  characteristic_id SERIAL,
  review_id SERIAL,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

-- LOAD characteristic_reviews csv
COPY characteristic_reviews
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;