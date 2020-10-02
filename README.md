# pokedex-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Sobre El projecto

Para realizar el proyecto se realizaron las siguientes actividades:
1. Evaluacion del alcance del Projecto 
2. Instalacion de Vuejs con las dependecias necesarias y realizando la configuaracion de las mismas
3. Se descargaron todos los assets necesarios para el proejecto y se realizo la modificacion para algunas imagenes para adaptar al diseño.

## Programacion y Maquetacion
Al tener todos los assets y entorno de desarrollo se procedio a realizar un diagrama para definir logica y como utluzar cada componentes para lueg comenzar con la maquetacion del sitio web tomando en cuenta el diseño solicitado. Al tener la maquetacio se inicio con la aplicacion de la logica necesaria para la el funcionamiento del sitio tomando en cuenta los siguentes puntos:

1. Listado Principal(se utilzio el Vuex para poder tener el llamado en cualquier parte del sistema)
2. Para lo tiempos de cargas (cuando el llamado a la api tarda ), se creo animacion css.
3. Se realizo la logica para crear los favoritos 
4. Creacion de la logica para llamar el detalle y llenar modal con nueva consulta 
5. Se Crea funcion para copiar los datos del modal
6. Para la funcion de busqueda tanto de la barra como filtrar por favoritos se utilizo un getters.
7. Se integra el localstorage para poder guardar informacion de favoritos.
