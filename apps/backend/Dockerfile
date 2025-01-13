FROM maven:3.9-eclipse-temurin-23-alpine AS builder
WORKDIR /backend
COPY ./src ./src
COPY ./pom.xml .
RUN mvn package -DskipTests

FROM eclipse-temurin:23-jdk
COPY --from=builder /backend/target/app.jar /app/app.jar
EXPOSE 8080
