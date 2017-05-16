const greetings = 'Bonjour|Hola|Ciao|Guten Tag|Konnichiwa|Hello|Namaste'.split('|');
const greeting = greetings[Math.floor(Math.random() * greetings.length)];

export default greeting;
