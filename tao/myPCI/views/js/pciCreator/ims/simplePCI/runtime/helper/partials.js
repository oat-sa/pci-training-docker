define([
    'taoQtiItem/portableLib/handlebars',
    'tpl!simplePCI/runtime/tpl/input',
    'tpl!simplePCI/runtime/tpl/output'
], function (Handlebars, inputTpl, outputTpl) {
    'use strict';

    Handlebars.registerPartial('pci-input', inputTpl);
    Handlebars.registerPartial('pci-output', outputTpl);

    return {
        inputTpl,
        outputTpl
    };
});
