-- CREATE DATABASE
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS reviews_photos CASCADE;
DROP TABLE IF EXISTS characteristics CASCADE;
DROP TABLE IF EXISTS characteristic_reviews CASCADE;

-- CREATE reviews csv
-- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating INT,
  date BIGINT,
  summary VARCHAR(500),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(60),
  reviewer_email VARCHAR(60),
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
  id SERIAL PRIMARY KEY,
  review_id INT,
  url TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- LOAD reviews_photos csv
COPY reviews_photos
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

-- characteristics csv
-- id,product_id,name
CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

-- LOAD characteristics csv
COPY characteristics
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- id,product_id,name
-- 1,1,"Fit"
-- 2,1,"Length"
-- 3,1,"Comfort"
-- 4,1,"Quality"
-- 5,2,"Quality"
-- 6,3,"Fit"
-- 7,3,"Length"

-- characteristic_reviews csv
-- id,characteristic_id,review_id,value
CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value INT,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- LOAD characteristic_reviews csv
COPY characteristic_reviews
FROM '/Users/madelineking/hack-reactor/rfp2210/rfp2210-sdc/reviews-csv-files/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

-- id,characteristic_id,review_id,value
-- 1,1,1,4
-- 2,2,1,3
-- 3,3,1,5
-- 4,4,1,4