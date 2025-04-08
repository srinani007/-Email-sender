# Use a base image with Java
FROM openjdk:17-jdk-slim

# Add metadata (optional but nice)
LABEL maintainer="venkat@srinani007.com"
LABEL app="email-sender"

# Set working directory
WORKDIR /app

# Copy the built jar file into the container
COPY target/Email-sender-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on (usually 8080)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
