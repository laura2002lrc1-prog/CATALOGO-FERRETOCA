# Backend real (Spring Boot) + SQLite (persistente)

Este proyecto genera un backend mínimo para que:
- Los productos (incluyendo imágenes) se guarden en SQLite.
- Al copiar/descomprimir la carpeta, los productos permanezcan.

## Requisitos
- Java 17+
- Maven
- (Opcional) IDE para ejecutar, o usar consola.

## Cómo iniciar
1) Abrir terminal en la carpeta `backend`.
2) Ejecutar:
   - `mvn spring-boot:run`

El archivo SQLite se crea automáticamente en `backend/data/ferretoca.db`.

## Endpoints
- `POST /api/auth/login`
- `GET /api/products`
- `GET /api/products/{codigo}`
- `POST /api/products` (multipart: portada + múltiples imágenes descripción)
- `PUT /api/products/{codigo}/precio`
- `DELETE /api/products/{codigo}`
- `PUT /api/products/{codigo}/images` (opcional)

