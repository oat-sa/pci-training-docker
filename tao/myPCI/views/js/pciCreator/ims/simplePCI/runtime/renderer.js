define([
    'taoQtiItem/portableLib/handlebars',
    'simplePCI/runtime/helper/properties',
    'tpl!simplePCI/runtime/tpl/main',
    'tpl!simplePCI/runtime/tpl/input',
    'tpl!simplePCI/runtime/tpl/output',
    'css!simplePCI/runtime/css/simplePCI'
], function (Handlebars, propHelper, mainTpl, inputTpl, outputTpl) {
    'use strict';

    return function rendererFactory(container, pci, properties) {
        const props = propHelper.getProperties(properties);
        let name = null;
        let { prompt, submit, message } = props;
        let creatorMode = false;

        return {
            setPrompt(value) {
                prompt = value;
            },
            setSubmit(value) {
                submit = value;
            },
            setMessage(value) {
                message = value;
            },
            getMarkup() {
                return container.querySelector('.simple_pci');
            },
            getInputArea() {
                return this.getMarkup().querySelector('.pci-input');
            },
            getOutputArea() {
                return this.getMarkup().querySelector('.pci-output');
            },
            renderMain() {
                const markup = this.getMarkup();
                markup.innerHTML = mainTpl();
            },
            renderInput() {
                const inputArea = this.getInputArea();
                inputArea.innerHTML = inputTpl({ name, prompt, submit });

                const input = inputArea.querySelector('input[type=text]');
                const button = inputArea.querySelector('button');
                button.addEventListener('click', () => {
                    name = input.value;
                    this.renderOutput();
                });
            },
            renderOutput() {
                const outputArea = this.getOutputArea();
                outputArea.innerHTML = outputTpl({ message: propHelper.formatOutput(message, name) });
            },
            clearOutput() {
                const outputArea = this.getOutputArea();
                outputArea.innerHTML = outputTpl({ message: '' });
            },
            enterCreatorMode() {
                name = props.name;
                this.renderOutput();
                creatorMode = true;
            },
            leaveCreatorMode() {
                name = '';
                this.renderInput();
                this.clearOutput();
                creatorMode = false;
            },
            render() {
                this.renderMain();
                this.renderInput();
                // this.renderOutput()

                pci.on('enteringcreator', () => this.enterCreatorMode());
                pci.on('leavingcreator', () => this.leaveCreatorMode());

                pci.on('setsubmit', value => {
                    this.setSubmit(value);
                    this.renderInput();
                });

                // markup.addEventListener('enteringcreator', () => enterCreatorMode());
                // markup.addEventListener('leavingcreator', () => leaveCreatorMode());
            },

            destroy() {
                /** TODO: implement me */
                console.log('oncompleted called');
                pci.off('enteringcreator');
                pci.off('leavingcreator');
            },

            get name() {
                return name;
            }
        };
    };
});
