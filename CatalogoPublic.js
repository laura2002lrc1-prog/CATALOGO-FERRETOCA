spring.application.name=inventario

# SQLite file inside backend/data
spring.datasource.url=jdbc:sqlite:${user.dir}/backend/data/ferretoca.db
spring.datasource.driver-class-name=org.sqlite.JDBC

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.community.dialect.SQLiteDialect

# Multipart (imagenes)
spring.servlet.multipart.max-file-size=6MB
spring.servlet.multipart.max-request-size=30MB

# Login único (simulado)
ferretoca.admin.usuario=admin@ferretoca.com
ferretoca.admin.contrasena=Ferretoca123!

