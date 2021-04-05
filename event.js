const EventEmiter = require('events');

class Log extends EventEmiter {
    constructor() {
        super();
    }
}

const event = new Log();

Log.on('log', () => {
    console.log('i log a line');
});

event.emit('log');