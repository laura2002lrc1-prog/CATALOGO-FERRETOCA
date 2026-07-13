# Paso 1: Compilar la aplicación con Maven
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Paso 2: Ejecutar la aplicación con Java 17
FROM openjdk:17-jdk-slim
COPY --from=build /target/inventario-1.0.0.jar inventario.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "inventario.jar"]
