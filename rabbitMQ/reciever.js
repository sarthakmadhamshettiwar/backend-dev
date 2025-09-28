var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError){
        throw connectionError;
    }

    connection.createChannel((channelCreationError, channel) => {
        if(channelCreationError){
            throw channelCreationError;
        }

        // channel created
        
        // now we need to recieve the message
        var queue = 'hello';
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        },{
            noAck:true,
        }
        )
    })
})
