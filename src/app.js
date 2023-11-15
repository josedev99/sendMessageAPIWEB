const fs = require('fs');
const readline = require('readline');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const { MessageMedia } = require('whatsapp-web.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const destinatarios = [];

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    // Send a message to each number
    menu();
});

client.initialize();

function menu() {
    console.log('******MENU*****');
    console.log('1. Enviar por lote mensajes');
    console.log('2. Cerrar sesion');
    console.log('3. Salir');

    rl.question('Por favor, digita una opcion: ', (respuesta) => {
        if (respuesta == 1) {
            sendMessage();
        } else if (respuesta == 2) {
            // Assuming client is some object or variable you want to destroy
            console.log('Closing session...');
            client.destroy();
            rl.close(); // Close the readline interface after destroying the session
        } else if (respuesta == 3) {
            rl.close(); // Close the readline interface to end the program
        } else {
            console.log('Opción no válida. Por favor, elige una opción válida.');
            menu(); // Show the menu again for an invalid option
        }
    });
}

// Start the menu


function sendMessage(){
    rl.question('Ingresar los numeros telefonicos: ', async(numbers_tel) => {
        let numbers = numbers_tel.split(',');
        console.log(numbers)
        for (const number of numbers) {
            const imagePath = 'C:\\Users\\Admin\\Desktop\\whatsapp-js\\src\\promocion.jpg';
            const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
            const contactId = `${number}@c.us`;
            const caption = `*Gracias por preferirnos.*
        Gánate una entrada para la final competition miss universe 2023!!! 
        *Pasos a seguir* 
        •Sigue las cuentas de *@opticaavplus* en Instagram y fb  
        •Dale like a la publicación y etiqueta a tres personas. 
        •Comparte la publicación en tus historias y listo estarás participando para ver miss universe 2023.
        El ganador será anunciado el día *sábado 18 a las 10:00 am.*
            `;
            const media = new MessageMedia('image/png', base64Image, 'image.png');
            try {
               // Send image with text using sendMessage
                await client.sendMessage(
                    contactId,media,{caption: caption}
                );
                console.log(`Mensaje enviado a: ${contactId}`);
            } catch (error) {
                console.error(`Error sending message to ${contactId}: ${error}`);
            }
        }
        menu();
    });
}

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});