// src/types/database.ts

/**
 * 1. Tabla: Empleados
 */
export interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  salario: number; // NUMERIC(10, 2)
}

// ---------------------------------------------------

/**
 * 2. Tabla: Proveedores
 */
export interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  email: string;
  terminos_pago: string; // Ej: 'Neto 30 días'
}

// ---------------------------------------------------

/**
 * 3. Tabla: Egresos (Gastos Operativos)
 */
export interface Egreso {
  id?: number;
  fecha: string; // DATE (usar string o Date, dependiendo de cómo lo manejes en JS)
  monto: number; // NUMERIC(10, 2)
  tipo: string; // Ej: 'Alquiler', 'Nómina'
  descripcion: string | null;
}

// ---------------------------------------------------

/**
 * 4. Tabla: Productos (Inventario)
 */
export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string | null;
  precio_venta: number; // NUMERIC(10, 2)
  costo: number | null; // NUMERIC(10, 2)
  stock: number;
  categoria: string | null;
  proveedor_id: number | null; // FOREIGN KEY, puede ser NULL (ON DELETE SET NULL)
}

// Interfaz extendida para mostrar el proveedor en el inventario
export interface ProductoConProveedor extends Producto {
    proveedor?: Proveedor;
}

// ---------------------------------------------------

/**
 * 5. Tabla: Ventas (Transacciones)
 */
export interface Venta {
  id: number;
  fecha: string; // TIMESTAMP WITH TIME ZONE
  total: number; // NUMERIC(10, 2)
  metodo_pago: string;
  cliente: string | null;
  empleado_id: number; // FOREIGN KEY
}

// Interfaz extendida para mostrar el empleado que realizó la venta
export interface VentaConEmpleado extends Venta {
    empleado?: Empleado;
}

// ---------------------------------------------------

/**
 * 6. Tabla: DetalleVenta (Relación Ventas <-> Productos)
 */
export interface DetalleVenta {
  venta_id: number; // FOREIGN KEY (Parte de la PRIMARY KEY compuesta)
  producto_id: number; // FOREIGN KEY (Parte de la PRIMARY KEY compuesta)
  cantidad: number;
  precio_unitario: number; // NUMERIC(10, 2)
}

// Interfaz extendida para mostrar los detalles del producto en una transacción
export interface DetalleVentaConProducto extends DetalleVenta {
    producto: Producto; 
}