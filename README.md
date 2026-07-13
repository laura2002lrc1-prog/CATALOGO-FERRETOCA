<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FERRETOCA | Panel Administrativo</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="app-header">
    <div class="container header-row">
      <div class="brand">
        <span class="brand-mark">◆</span>
        <h1>FERRETOCA</h1>
      </div>
      <a class="admin-link" href="index.html">Volver al Catálogo</a>
    </div>
  </header>

  <main class="container">
    <section id="authSection" class="panel">
      <h2>Acceso Administrativo</h2>
      <form id="loginForm" class="form">
        <div class="field">
          <label for="usuario">Usuario</label>
          <input id="usuario" type="email" required placeholder="admin@ferretoca.com" />
        </div>
        <div class="field">
          <label for="contrasena">Contraseña</label>
          <input id="contrasena" type="password" required placeholder="Ferretoca123!" />
        </div>
        <button class="btn btn-primary" type="submit">Iniciar Sesión</button>
        <p id="loginMsg" class="msg" role="status" aria-live="polite"></p>
      </form>
    </section>

    <section id="adminSection" class="panel" style="display:none;">
      <div class="panel-head">
        <h2>Inventario Digital (Admin)</h2>
        <div class="small-actions" style="justify-content:flex-end;">
          <button id="mensajesTabBtn" class="small-btn" type="button" aria-label="Ver mensajes de clientes">Mensajes</button>
          <button id="logoutBtn" class="btn btn-ghost" type="button">Cerrar sesión</button>
        </div>
      </div>

      <hr class="divider" />

      <div id="adminViews">
        <section id="inventarioView" class="admin-view">
          <h3>Agregar Nuevo Repuesto</h3>

      <form id="addForm" class="form">
        <div class="form-grid">
          <div class="field">
            <label for="codigoProducto">Código</label>
            <input id="codigoProducto" type="text" required maxlength="64" />
          </div>
          <div class="field">
            <label for="nombre">Nombre</label>
            <input id="nombre" type="text" required maxlength="255" />
          </div>
          <div class="field">
            <label for="categoria">Categoría</label>
            <select id="categoria" required>
              <option value="Motor">Motor</option>
              <option value="Frenos">Frenos</option>
              <option value="Transmisión">Transmisión</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </div>
          <div class="field">
            <label for="precio">Precio (venta - lo ve el cliente)</label>
            <input id="precio" type="number" required step="0.01" min="0" />
          </div>
          <div class="field">
            <label for="precioCompra">Precio de compra (solo admin)</label>
            <input id="precioCompra" type="number" required step="0.01" min="0" />
          </div>
          <div class="field">
            <label for="cantidadStock">Stock</label>
            <input id="cantidadStock" type="number" required step="1" min="0" />
          </div>
          <div class="field">
            <label for="imagen">Agregar imagen de portada</label>
            <input id="imagen" type="file" accept="image/*" />
            <small class="help">Se guardará localmente en el navegador.</small>
          </div>
          <div class="field">
            <label for="imagenesDescripcion">Agregar imagenes de la descripcion</label>
            <input id="imagenesDescripcion" type="file" accept="image/*" multiple />
            <small class="help">Puedes seleccionar varias imágenes.</small>
          </div>

        </div>

        <button class="btn btn-primary" type="submit">Guardar producto</button>
        <p id="addMsg" class="msg" role="status" aria-live="polite"></p>
      </form>

      <hr class="divider" />

      <h3>Inventario</h3>
      <div class="table-wrap" style="overflow:auto;">
        <table class="table" aria-label="Tabla administrativa">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="adminTableBody"></tbody>
        </table>
      </div>
        </section>

        <section id="mensajesView" class="admin-view" style="display:none;">
          <h3 style="margin-top:0;">Mensajes de Clientes</h3>
          <div class="table-wrap" style="overflow:auto;">
            <table class="table" aria-label="Tabla de mensajes">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Mensaje (Cliente + Precios)</th>

                </tr>
              </thead>
              <tbody id="mensajesBody"></tbody>
            </table>
          </div>
          <div style="display:flex; gap:12px; align-items:center; justify-content:flex-end; margin-top:14px;">
            <button id="clearMensajesBtn" class="small-btn" type="button">Limpiar mensajes</button>
          </div>
        </section>
      </div>
  </main>


  <script type="module" src="frontend/admin.js"></script>
</body>
</html>

