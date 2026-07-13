# Paso 1: Compilar la aplicación con Maven ingresando a la subcarpeta
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
# Cambiamos el directorio de trabajo a donde realmente está tu pom.xml
WORKDIR /proyecto laura
RUN mvn clean package -DskipTests

# Paso 2: Ejecutar la aplicación con Java 17
FROM openjdk:17-jdk-slim
# Copiamos el archivo compilado desde la ruta correcta de la subcarpeta
COPY --from=build "/proyecto laura/target/inventario-1.0.0.jar" inventario.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "inventario.jar"]
