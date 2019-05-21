exports.handler = async(event, context, callback) => {

    console.log(event);

    if (event.request.type === 'LaunchRequest') {
        const welcomeMessageCard = "Welcome to international news!"
        const welcomeMessage = `<speak><s>Welcome to international news!</s></speak>`;
        const message = {
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "SSML",
                    "ssml": welcomeMessage
                },
                "card": {
                    "type": "Simple",
                    "title": "Welcome",
                    "content": welcomeMessageCard
                },
                "shouldEndSession": false
            },
            sessionAttributes: {
                "count": 0
            }
        };
        callback(null, message);
    } else if (event.request.type ==='IntentRequest') {
        let newCount = event.session.attributes.count + 1;
        if (event.request.intent.name === 'InternationalNews') {
            const message = {
                "version": "1.0",
                "response": {
                    "outputSpeech": {
                        "type": "SSML",
                        "ssml": `<speak><s>The world unites into one country.</s><s><prosody volume="x-soft">Executed ${newCount} times.</prosody></s></speak>`
                    },
                    "card": {
                        "type": "Simple",
                        "title": "World united",
                        "content": "The world unites into one country."
                    },
                    "shouldEndSession": false
                },
                sessionAttributes: {
                    "count": newCount
                }
            };
            callback(null, message);
        } else if (event.request.intent.name === 'AMAZON.StopIntent') {
            const message = {
                "version": "1.0",
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": "I have stopped"
                    },
                    "shouldEndSession": false
                }
            };
            callback(null, message);
        }
    } else if (event.request.type === 'SessionEndedRequest') {
        console.log("***** THE SESSION HAS ENDED ***** ");
        const message = {
            "version": "1.0",
            "response": {
                "shouldEndSession": true
            }
        };
        callback(null, message);
        
    }
}
