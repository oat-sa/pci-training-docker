define([
    'qtiCustomInteractionContext',
    'simplePCI/runtime/renderer',
    'taoQtiItem/portableLib/OAT/util/event'
], function (qtiCustomInteractionContext, rendererFactory, eventModel) {
    'use strict';

    /**
     *
     */
    qtiCustomInteractionContext.register({
        typeIdentifier: 'simplePCI',

        /**
         * @param {HTMLElement} dom - the interaction DOM container
         * @param {Object} config
         * @param {Object} config.properties - PCI properties
         * @param {Object} config.boundTo - the response bound to the interaction
         * @param {Function} config.onready - to be called when the PCI is ready to be used by test taker
         * @param {Object} state - the state to restore
         */
        getInstance(dom, config, state) {
            /** TODO: implement me */
            console.log('Config', config);
            console.log('State', state);
            console.log('DOM', dom);

            let renderer;
            const getName = () => renderer.name;

            const myInteraction = {
                /**
                 * Called by the delivery engine to get the current response of the interaction
                 * @returns {Object} PCI formatted response
                 */
                getResponse() {
                    return { base: { string: getName() } };
                },

                /**
                 * Called by the delivery engine to get the current state of the interaction
                 * @returns {Object}
                 */
                getState() {
                    return { response: { base: { string: getName() } } };
                },

                /**
                 * Called back before the interaction destroys
                 */
                oncompleted() {
                    renderer.destroy();
                },

                // non-standard API
                getRenderer() {
                    return renderer;
                }
            };

            eventModel.addEventMgr(myInteraction);
            renderer = rendererFactory(dom, myInteraction, config.properties);
            renderer.render();

            // myInteraction.on('', () => {});

            //callback when the PCI is ready to be used
            if (typeof config.onready === 'function') {
                config.onready(myInteraction, state);
            }
        }
    });
});
