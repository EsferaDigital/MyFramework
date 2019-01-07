const screen = document.getElementById('calculatorScreen');
const keys = document.getElementById('calculatorKeys');

screen.textContent = '0';

const calculator = () => {
  // Por si keys da null salimos de la función porque escuchar un evento dentro de un elemento null da error
  if(!keys) return
  // captamos el click en el elemento padre y luego vemos que hijo disparo el evento
  keys.addEventListener('click', e => {
    // hijo que disparó el evento
    const t = e.target;
    // data- del t
    const d = t.dataset;
    // detectar si se pulsó un número
    if(d.number) writeScreen(d.number);
    // detectar si se pulsó una operación matemática
    if(d.math) getOperation(t, d.math);
    // detectar si se pulsó otra operación
    if(d.operation) runOperation();

  });
}

const writeScreen = number => {
  screen.textContent === '0'
  ? screen.textContent = number
  : screen.textContent += number
}

const getOperation = (element, operation) => {
  screen.textContent = element.textContent;
}

calculator();
