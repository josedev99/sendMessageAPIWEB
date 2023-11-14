/* const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
  */


const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

const destinatarios = ['+50374518248', '+50374482323', '+50376098500', '+50373981555', '+50360097577', '+50378556896'];

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('READY');

    // Array of 10 phone numbers
    const numbers =  ['50374518248', '50374482323', '50376098500', '50373981555', '50360097577', '50378556896'];

    // Send a message to each number
    for (const number of numbers) {
        const contactId = `${number}@c.us`;
        const message = 'Hello, this is a test message!';
        
        try {
            // Send message to the contact
            await client.sendMessage(contactId, message);
            console.log(`Message sent to ${contactId}`);
        } catch (error) {
            console.error(`Error sending message to ${contactId}: ${error}`);
        }
    }
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.initialize();