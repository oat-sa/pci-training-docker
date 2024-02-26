define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'simplePCI/runtime/helper/properties',
    'tpl!simplePCI/creator/tpl/propertiesForm'
], function (stateFactory, Question, formElement, simpleEditor, propHelper, formTpl) {
    'use strict';

    var stateQuestion = stateFactory.extend(
        Question,
        function enterQuestionState() {
            const { widget } = this;
            const { $container, element: interaction } = widget;
            const { pci } = interaction.metaData;
            const pciMarkup = widget.$original.find('.simple_pci').get(0);

            simpleEditor.create($container, '.simple-pci-message', value => {
                const renderer = pci.getRenderer();
                renderer.setMessage(value);
                interaction.prop('message', value);
            });

            // notify the runtime renderer that we entered the authoring mode
            pciMarkup.classList.add('authoring');
            // pciMarkup.dispatchEvent(new CustomEvent('enteringcreator'));
            interaction.triggerPci('enteringcreator');
        },
        function leaveQuestionState() {
            const { widget } = this;
            const { $container, element: interaction } = widget;
            const pciMarkup = widget.$original.find('.simple_pci').get(0);

            simpleEditor.destroy($container);

            // notify the runtime renderer that we exited the authoring mode
            pciMarkup.classList.remove('authoring');
            // pciMarkup.dispatchEvent(new CustomEvent('leavingcreator'));
            interaction.triggerPci('leavingcreator');
        }
    );

    /**
     * Setup the property panel
     */
    stateQuestion.prototype.initForm = function () {
        const { widget } = this;
        const { element: interaction } = widget;
        const { pci } = interaction.metaData;
        const $form = this.widget.$form;

        const props = propHelper.getProperties(interaction.properties);
        let { submit, prompt } = props;

        //render the form using the form template
        this.widget.$form.html(
            formTpl({
                submit,
                prompt
            })
        );

        //init form javascript
        formElement.initWidget(this.widget.$form);

        //init data change callbacks
        formElement.setChangeCallbacks($form, interaction, {
            //example
            // propertyName: function(i, value){
            //    i.properties[propertyName] = value;
            // }
            submit(i, value) {
                i.prop('submit', value);

                // modify the rendering using an event
                interaction.triggerPci('setsubmit', [value]);
            },
            prompt(i, value) {
                i.prop('prompt', value);

                // modify the rendering through the renderer
                const renderer = pci.getRenderer();
                renderer.setPrompt(value);
                renderer.renderInput();
            }
        });
    };
    return stateQuestion;
});
