var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError){
        throw connectionError;
    }
    // connection is established now
    connection.createChannel((channelCreationError, channel) => {
        if(channelCreationError){
            throw channelCreationError;
        }
        // channel is created now => in channel most of the API for getting things done resides
        var queue = 'hello';
        var message = 'hello world3';

        // not sure what the below block does. Perhaps is just validates whether the 
        // channel.assertQueue(queue, {
        //     durable: false
        // });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message);
    })

    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);

})
