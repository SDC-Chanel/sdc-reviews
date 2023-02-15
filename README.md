# Ratings and Reviews System Design

API service built for an e-commerce web application

## Built With
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-brightgreen.svg?style=for-the-badge&logo=Nginx&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg?style=for-the-badge&logo=postgreSQL=white)

---

## Background

This project consisted of taking the functionality of an existing monolithic API for an e-commerce web app and dissecting it into a microservice architecture with the goal of improving the performance with higher traffic, with each microservice being built by a different developer.

The microservices contained in this repo are the ```/reviews ``` and ```/reviews/meta``` endpoints, which return data about a product's user-submitted rating and review, including information such as how many times a rating/review was reported and marked helpful.

This microservice was built from scratch in 1.5 weeks.

---

## Deployment & Performance

To test this microservice's performance with a large dataset, the PostgreSQL database was a seeded with roughly 7 million records.

This microservice was then deployed with the following configuration: 

- 4 API Servers 
    - AWS EC2 t2 micro instances
- 1 Database Server
    - AWS EC2 t2 micro instances
- 1 Nginx Load Balancer
    - AWS EC2 XXL instance

This configuration was stress tested with Loader.io and K6, resulting with the following stats:

- 1,000 RPS
- 4ms average request duration
- 0% error rate

---
