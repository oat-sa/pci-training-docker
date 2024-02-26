define(['simplePCI/creator/widget/Widget', 'tpl!simplePCI/creator/tpl/markup'], function (Widget, markupTpl) {
    'use strict';

    const typeIdentifier = 'simplePCI';

    return {
        /**
         * (required) Get the typeIdentifier of the custom interaction
         *
         * @returns {String}
         */
        getTypeIdentifier() {
            return typeIdentifier;
        },

        /**
         * (required) Get the widget prototype
         * Used in the renderer
         *
         * @returns {Object} Widget
         */
        getWidget() {
            return Widget;
        },

        /**
         * (optional) Get the default properties values of the pci.
         * Used on new pci instance creation
         *
         * @returns {Object}
         */
        getDefaultProperties() {
            return {
                prompt: 'Please enter your name:',
                submit: 'OK',
                output: 'Hello dear {name}! How is your day?'
            };
        },

        /**
         * (optional) Callback to execute on the
         * new pci instance creation
         *
         * @returns {Object}
         */
        afterCreate() {},

        /**
         * (required) Gives the qti pci markup template
         *
         * @returns {function} template function
         */
        getMarkupTemplate() {
            return markupTpl;
        },

        /**
         * (optional) Allows passing additional data to xml template (see templateData)
         *
         * @returns {Object} template data
         */
        getMarkupData(pci, defaultData) {
            return Object.assign(
                {
                    serial: Date.now()
                },
                defaultData
            );
        }
    };
});
