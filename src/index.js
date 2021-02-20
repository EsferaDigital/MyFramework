
import style from './scss/styles.scss';
import logo from './assets/img/webpack.svg';
import gemini from './assets/img/saga-kanon.png';
import data from './assets/data/data.json';
import batman from './assets/img/batman.jpg';
import chalet from './assets/fonts/chalet.woff';

const arr = [1,2,3,4]
const codeESNext = () => console.log(...arr)

console.log('Hola Mundo')

codeESNext();

// document.getElementById('app').innerHTML = `<img src="${logo}" alt="webpack">`;

const d = document
const $app = d.getElementById('app')
const $h1 = d.createElement('h1')
const $logo = d.createElement('img')
const $img = d.createElement('img')
const $nav = d.createElement('nav')

let menu = ''

data.links.forEach((link) => (menu += `<a href='${link[1]}'>${link[0]}</a>`))

$h1.textContent = 'Hola Mundo Webpack';
$logo.src = logo
$logo.classList.add('icon')
$img.src = gemini
$nav.innerHTML = menu
$nav.classList.add('menu')

$app.appendChild($h1)
$app.appendChild($logo)
$app.appendChild($nav)
$app.appendChild($img)
