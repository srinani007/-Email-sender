# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy only the built jar from the previous stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
