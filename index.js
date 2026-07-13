package com.ferretoca.inventario.web;

import com.ferretoca.inventario.domain.ProductEntity;
import com.ferretoca.inventario.domain.ProductImageEntity;
import com.ferretoca.inventario.repo.ProductRepository;
import com.ferretoca.inventario.web.dto.ProductDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductRepository repo;

  public ProductController(ProductRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public List<ProductDTO> listAll() {
    return repo.findAll().stream().map(this::toDTO).toList();
  }

  @GetMapping("/{codigo}")
  public ProductDTO getByCodigo(@PathVariable String codigo) {
    Optional<ProductEntity> p = repo.findById(codigo);
    return p.map(this::toDTO).orElse(null);
  }

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ProductDTO create(
      @RequestParam("codigo_producto") String codigoProducto,
      @RequestParam("nombre") String nombre,
      @RequestParam("categoria") String categoria,
      @RequestParam("precio") BigDecimal precio,
      @RequestParam("cantidad_stock") Integer cantidadStock,
      @RequestPart(value = "imagen_portada", required = false) MultipartFile imagenPortada,
      @RequestPart(value = "imagenes_descripcion", required = false) List<MultipartFile> imagenesDescripcion
  ) throws IOException {

    if (repo.existsById(codigoProducto)) {
      return null;
    }

    ProductEntity p = new ProductEntity();
    p.setCodigoProducto(codigoProducto);
    p.setNombre(nombre);
    p.setCategoria(categoria);
    p.setPrecio(precio);
    p.setCantidadStock(cantidadStock);

    if (imagenPortada != null && !imagenPortada.isEmpty()) {
      p.setImagenPortada(imagenPortada.getBytes());
    } else {
      p.setImagenPortada(new byte[0]);
    }

    if (imagenesDescripcion != null) {
      for (MultipartFile f : imagenesDescripcion) {
        if (f == null || f.isEmpty()) continue;
        ProductImageEntity img = new ProductImageEntity();
        img.setProducto(p);
        img.setImagen(f.getBytes());
        p.getImagenesDescripcion().add(img);
      }
    }

    ProductEntity saved = repo.save(p);
    return toDTO(saved);
  }

  @PutMapping(path = "/{codigo}/precio")
  public Boolean updatePrecio(@PathVariable String codigo, @RequestBody PriceBody body) {
    Optional<ProductEntity> opt = repo.findById(codigo);
    if (opt.isEmpty()) return false;
    ProductEntity p = opt.get();
    p.setPrecio(body.nuevoPrecio);
    repo.save(p);
    return true;
  }

  @DeleteMapping("/{codigo}")
  public Boolean deleteByCodigo(@PathVariable String codigo) {
    if (!repo.existsById(codigo)) return false;
    repo.deleteById(codigo);
    return true;
  }

  private ProductDTO toDTO(ProductEntity p) {
    ProductDTO dto = new ProductDTO();
    dto.codigoProducto = p.getCodigoProducto();
    dto.nombre = p.getNombre();
    dto.categoria = p.getCategoria();
    dto.precio = p.getPrecio();
    dto.cantidadStock = p.getCantidadStock();

    if (p.getImagenPortada() != null && p.getImagenPortada().length > 0) {
      dto.imagenPortadaBase64 = Base64.getEncoder().encodeToString(p.getImagenPortada());
    } else {
      dto.imagenPortadaBase64 = "";
    }


    for (ProductImageEntity img : p.getImagenesDescripcion()) {
      if (img.getImagen() == null) continue;
      dto.imagenesDescripcionBase64.add(Base64.getEncoder().encodeToString(img.getImagen()));
    }
    return dto;
  }

  public static class PriceBody {
    public BigDecimal nuevoPrecio;
  }
}

