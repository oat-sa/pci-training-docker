define([], function () {
    const defaultProperties = {
        prompt: 'Please enter your name:',
        submit: 'OK',
        output: 'Hello dear {name}! How is your day?',
        name: '{name}'
    };

    return {
        formatOutput(message, name) {
            return message.replaceAll('{name}', name);
        },

        getProperties(properties) {
            return Object.assign({}, defaultProperties, properties);
        }
    };
});
