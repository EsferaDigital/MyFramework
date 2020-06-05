# La idea Principal es crear componentes reutilizables y Layout flexible

Las clases creadas se añadiran a los archivos correspondientes en el siguiente orden:

(Los estilos de configuración resetearan estilos generales y estableceran variables y funciones para ser usadas a lo largo de la libreria)

Tendremos componentes (secciones o elementos), cada uno con su clase principal capitalizada (ej: .Header, .Section, .Formulario).
Luego tendremos clases que modificaran el layout y luego clases que añadiran animaciones, ambos tipos de clases seran con minuscula (ej: .column-3, .row-3, .zoom-in)

1° Las clases principales que dan estilos generales a las secciones (las secciones son aquellas que, por default, ocupan todo el ancho o son hijas directas del container central)

2° Las clases de tipo layout que añadiran columnas, filas, padding y margenes

3° Las clases de tipo textos que añadiran familia tipografica, grupo de textos (titulo, subtitulo, parrafo(ej: parrafo-main, parrafo-card), slogan, menu, ) para manejar los tamaños de las fuentes

4° Las clases que añadiran animaciones

## Estrcutura de archivos y carpetas

### Archivo de entrada style.scss

Contiene los archivos para transpilarlos en el orden necesario para aprovechar la cascada (podemos añadir la carpeta wordpress para sobre-escribir clases de wordpress, elementor, woocommerce, etc)

1° Los archivos de la carpeta config:
- reset
- capas
- colores
- breakpoints
- var-roots
2° Los archivos de la carpeta secciones
3° Los archivos de la carpeta layout
4° Los archivos de la carpeta textos
5° Los archivos de la carpeta elementos
6° Los archivos de la carpeta animaciones (esta siempre al final)

### Carpetas

config: contiene los archivos de configuración de la librería

secciones: contiene los archivos para modificar secciones principales (header, main, aside, footer y una section para los contenidos de ancho completo)

layout: Contiene todos los archivos que establecen las clases que modificaran el layout de las secciones y/o elementos

textos: contiene los archivos que definen los tipos de fuentes, fuentes principales, secundarias, auxiliares, tamaños de fuente para etiquetas (h1, p, small textarea), input(por tipo) y otras

animaciones: contiene las animaciones

elementos: (irá creciendo) contiene todos los elementos que sean más pequeños que una section (card, formularios, botones, iconos)


### Archivos 

Cada archivo contiene clases construidas a partir de un mixin, cada variación del mixin principal de cada archivo se escribirá con un guion de separacion. Ejemplo
btn-success, btn-alert, mg-top-1

Al mismo tiempo, cada archivo tendrá sus propias variables adicionale a las que hereda de var-root, en caso de necesitarlas

#### En la carpeta config:

reset: Para resetear los estilos

capas: Para establecer capas z-index

colores: Para guardar la paleta de colores y los colores degradados que usaremos en cada proyecto. Se modifica en función de cada proyecto

breakpoints: Para establecer los puntos en los que los estilos pueden cambiar

var-root: para guardar variables globales que podamos reutilizar, por ejemplo, sombras.

#### En la carpeta secciones

header: Para los estilos de la etiqueta header y todo lo que contenga dicha etiqueta, puedo crear distintos tipos de header con distinta distribución de los elementos clasico (menu, logo, iconos a redes sociales)

container-central: para contener main, aside y secciones según se requiera. Podremos acá manejar el ancho máximo del contenido central (todo menos header y footer) el margen respecto al header y respecto al footer. El layaout se maneja con otra clase que modifica columnas y filas en otra carpeta

secciones: Para los diferentes tipos de seccion (seccion, seccion-slider, seccion-banner)

main: Para manejar los estilos de la etiqueta main

aside: Para manejar los estilos de la etiqueta aside

footer: Para los estilos de la etiqueta footer y todo lo que contenga dicha etiqueta, puedo crear distintos tipos de footer con distinta distribución de los elementos clasico (copyrigth, link al autor, redes sociales, contacto, menu, etc)

#### En la carpeta layout

columnas: Para las clases que añaden distintos tipos de columnas que puede tener un elemento

filas: Para las clases que añaden distintos tipos de filas que puede tener un elemento

margenes: Para las clases que añaden margenes a los elementos

padding: Para las clases que añaden padding a los elementos

#### En la carpeta textos

fuentes: para establecer los tipos de fuente (principal, secundaria, auxiliar), los tamaños de los textos por defecto según su etiqueta

titulos: Para manejar los estilos de los titulos

parrafos: Para manejar los estilos de los parrafos. Podemos crear variaciones de los parrafos segun si son para un card o para un artículo, por ejemplo

subtitulos: Para manejar los estilos de los subtítulos

menu: Para manejar el estilo de los textos de el o los menus.

#### En la carpeta elementos

Para elementos especificos como cards, formularios, etc. En ellos se añadiran clases que permitiran hacer configurar colores, backgraund, before y after

#### En la carpeta animaciones

