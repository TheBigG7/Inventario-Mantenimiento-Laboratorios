# Sistema de Gestión de Inventario y Mantenimiento de Laboratorios (Frontend - Angular)

Este repositorio contiene la aplicación cliente (SPA) desarrollada en **Angular**, diseñada para interactuar directamente con la API REST de gestión de inventarios. La interfaz permite a los Administradores TIC, Encargados de Laboratorio y Super Usuarios gestionar de forma visual e intuitiva el hardware, controlar los periodos académicos, registrar mantenimientos y generar reportes operativos del Instituto Tecnológico Superior Azuay (TECAZUAY).

### 🔬 [Sistema de Gestión de Inventario para Laboratorios BACKEND](https://github.com/TheBigG7/Inventario-Mantenimiento-Laboratorios_Backend.git)

---

## 🛠️ Stack Tecnológico & Requisitos

- **Framework:** Angular (SPA Architecture)
- **Lenguaje:** TypeScript
- **Estilos:** CSS3 nativo / Flexbox / Grid (según componentes de diseño modular)
- **Cliente HTTP:** Angular `HttpClientModule` para consumo de servicios REST
- **Entorno de Ejecución recomendado:** Node.js (versión LTS compatible con Angular CLI integrado)

---

## 📂 Arquitectura del Módulo Frontend (`src/app`)

El proyecto está estructurado de manera modular y desacoplada, separando la lógica de componentes, la definición de interfaces de datos (modelos) y el consumo de servicios API:

- **`🔐 login / Auth`:** Control de acceso unificado. Implementa `Auth.service.ts` para capturar credenciales y discernir las vistas del panel de control según el rol retornado por la API (`AdministradorTIC` o `EncargadoLaboratorio`).
- **`📊 dashboard-a / dashboard-e`:** Paneles de administración diferenciados por perfil, optimizando la experiencia de usuario y restringiendo acciones críticas.
- **`🖥️ equipos / laboratorios`:** Componentes dedicados al CRUD completo de la infraestructura tecnológica (registro de procesadores, memoria RAM, almacenamiento, estados de máquina y asociación a sus respectivos laboratorios).
- **`🔧 mantenimiento / repuestos`:** Módulos encargados de registrar las hojas de servicio técnico sobre las computadoras y descontar existencias del stock de componentes disponibles.
- **`📅 super-ad / periodos`:** Gestión de ciclos académicos y asignación temporal de personal técnico a los distintos laboratorios habilitados.
- **`📝 reportes`:** Interfaz dedicada a la centralización de datos y visualización de métricas clave del estado de la infraestructura.

---

## ⚙️ Integración con la API REST (Backend)

La aplicación web está configurada por defecto para comunicarse con los endpoints de la API Spring Boot ejecutándose en el entorno local. Los servicios de Angular (`*.service.ts`) apuntan hacia las siguientes rutas base del servidor:

- **Autenticación:** `http://localhost:8080/api_auth/auth/login`
- **Equipos & Laboratorios:** `http://localhost:8080/api`
- **Periodos Académicos:** `http://localhost:8080/api_p`
- **Administradores:** `http://localhost:8080/api_a`
- **Encargados de Laboratorio:** `http://localhost:8080/api_e`

> ⚠️ **Nota de Configuración de CORS:** Para permitir que esta SPA se comunique correctamente desde `http://localhost:4200`, el backend de Spring Boot debe tener activa la anotación `@CrossOrigin(origins = {"http://localhost:4200"})` en todos sus controladores REST.

---

## 🖥️ Instalación y Despliegue Local

Sigue estos pasos en tu terminal para clonar, instalar dependencias y levantar el servidor de desarrollo local:

### 1. Instalar las dependencias del proyecto
Accede a la raíz del directorio del frontend y ejecuta el gestor de paquetes de Node para reconstruir el árbol de `node_modules`:

  npm install

### 2. Levantar el servidor de desarrollo
Para compilar la aplicación en memoria y levantar el servidor local con recarga automática ante cambios en el código, ejecuta:

  npm start

# O alternativamente si cuentas con Angular CLI de forma global:
# ng serve

Una vez compilado el proyecto de forma exitosa, abre tu navegador web e ingresa a la siguiente dirección:
👉 **http://localhost:4200**

---

## 📦 Compilación para Producción (Build)

Para generar los artefactos de distribución optimizados (minificados y empaquetados listos para ser desplegados en servidores de hosting estático o servidores web tradicionales como Nginx / Apache), ejecuta:

  npm run build

Este comando creará una carpeta llamada `dist/` en la raíz del proyecto conteniendo los archivos HTML, JS y CSS estáticos definitivos.
