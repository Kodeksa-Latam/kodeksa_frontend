# Kodeksa Website

Sitio web corporativo de Kodeksa, desarrollado con Astro y Tailwind CSS.

![Kodeksa Website](https://res.cloudinary.com/dcm9ovoys/image/upload/v1744232387/kodeksa/bjl0f2bmlgot9txqu20x.png)

## 🚀 Tecnologías

- [Astro](https://astro.build/) - Framework web moderno y rápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [GSAP](https://greensock.com/gsap/) - Librería de animaciones
- [Swiper](https://swiperjs.com/) - Biblioteca de carrusel/slider

## 📂 Estructura del Proyecto

```
/
├── public/             # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes y otros activos
│   ├── components/     # Componentes reutilizables
│   ├── layouts/        # Layouts de página
│   └── pages/          # Páginas de la aplicación
├── .env                # Variables de entorno locales
├── .env.example        # Plantilla de variables de entorno
├── astro.config.mjs    # Configuración de Astro
└── tailwind.config.mjs # Configuración de Tailwind CSS
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                | Acción                                           |
| :--------------------  | :----------------------------------------------- |
| `npm install`          | Instala dependencias                             |
| `npm run dev`          | Inicia un servidor de desarrollo local en `localhost:4321` |
| `npm run build`        | Construye el sitio de producción en `./dist/`    |
| `npm run preview`      | Vista previa local de la build de producción     |
| `npm run astro ...`    | Ejecuta comandos de CLI de Astro                 |
| `astro dev --port 4000`| Inicia un servidor de desarrollo local en un puerto específico|

## 🌐 Variables de Entorno

Antes de ejecutar el proyecto, crea un archivo `.env` basado en el archivo `.env.example`:

```bash
# URL base de la API
PUBLIC_API_URL=http://localhost:3000
```

## 📝 API y Endpoints

El sitio se integra con una API para obtener datos dinámicos. Endpoints principales:

- `/api/solutions` - Obtiene las soluciones y servicios ofrecidos
- `/api/users?page=1&limit=4&isActive=true` - Obtiene información del equipo

## 🎨 Componentes Principales

### Solutions.astro

Muestra los servicios y soluciones ofrecidos por la empresa, consumiendo datos desde la API.

### Team.astro

Presenta al equipo de profesionales con tarjetas personalizadas, obteniendo datos desde la API.

### TeamMemberCard.astro

Componente para mostrar tarjetas de miembro del equipo con estilos personalizados.

### Contact.astro

Formulario de contacto para que los visitantes se comuniquen con la empresa.

## 📐 Estilos y Diseño

El sitio utiliza Tailwind CSS con una paleta de colores personalizada definida en `tailwind.config.mjs`:

```js
colors: {
  kodeksa: {
    primary: '#1A4D2E',
    secondary: '#FF9B50',
    accent: '#C7E8CA',
    dark: '#151515',
    light: '#F5F5F5'
  }
}
```

## 📱 Responsive

El sitio está completamente optimizado para dispositivos móviles, tablets y escritorio mediante el uso de las clases responsive de Tailwind CSS.

## 🧩 Funcionalidades Interactivas

- **Navegación entre soluciones/servicios:** Permite a los usuarios cambiar entre diferentes servicios con una interfaz intuitiva
- **Tarjetas de equipo personalizadas:** Cada miembro tiene una presentación visual única
- **Formulario de contacto:** Permite a los usuarios enviar mensajes directamente desde el sitio

## 🔧 Desarrollo

Para contribuir al proyecto:

1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Copia `.env.example` a `.env` y configura tus variables
4. Inicia el servidor de desarrollo con `npm run dev`

## 📄 Licencia

[MIT](LICENSE)

---

Desarrollado por [Kodeksa](https://kodeksa.lat)