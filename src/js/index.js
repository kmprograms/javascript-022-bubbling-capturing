import '../css/index.css';

// Trzy fazy przetwarzania zdarzenia:
// Faza numer 1 - capturing phase - zdarzenie idzie w dol do elementu - PRZECHWYTYWANIE

// Faza numer 2 - target phase    - zdarzenie osiaga element w ktorym mamy wystapienie zdarzenia - NAMIERZANIE

// Faza numer 3 - bubbling phase  - zdarzenie jest rozglaszane od elementu ktory osiagnieto
//                                  w fazie numer 1 - PROPAGACJA

// Scenariusz numer 1

/*const div1Element = document.getElementById('div-1');
div1Element.addEventListener('click', event => {
    // Odwolanie do elementu, z ktorego pochodzi zdarzenie
    console.log(event.target);
    // Odwolanie do elementu na rzecz ktorego jest wykonywana metoda do obslugi zdarzenia
    console.log(event.currentTarget);
    // Mozesz podgladac w ktorej fazie przetwarzania zdarzenia jestes
    console.log(event.eventPhase); // capturing=1, target=2, bubbling=3
});*/

// Mozesz zatrzymac rozsylanie zdarzenia w gore drzewa w sposob pokazany ponizej
const messageElement = document.getElementById('message');
messageElement.addEventListener('click', event => {
    console.log('Inside message element');
    // event.stopPropagation(); // Nie naduzywac stopPropagation poniewaz wywolywane
    // w duzych ilosciach moze powodowac pewne nieoczekiwane zachowania elementow
    // modelu DOM
});

// Scenariusz numer 2

// Zeby aktywowac ta faze musimy przekazac do addEventListener dodatkowy obiekt
// konfiguracyjny jak ponizej:

// const messageElement = document.getElementById('message');
messageElement.addEventListener('click', event => {
    console.log('Inside message element - capturing');
}, {capture: true}); // lub po prostu podac jako trzeci argument true

const div1Element = document.getElementById('div-1');
div1Element.addEventListener('click', event => {
    console.log('Inside div-1 element - capturing');
}, true);

const div2Element = document.getElementById('div-2');
div2Element.addEventListener('click', event => {
    console.log('Inside div-2 element - capturing');
}, true);

div1Element.addEventListener('click', event => {
    console.log('Inside div-1 element - bubbling');
});

div2Element.addEventListener('click', event => {
    console.log('Inside div-2 element - bubbling');
});
