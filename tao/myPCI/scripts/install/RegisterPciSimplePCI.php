<?php

namespace oat\myPCI\scripts\install;

use oat\taoQtiItem\model\portableElement\action\RegisterPortableElement;

class RegisterPciSimplePCI extends RegisterPortableElement
{
    protected function getSourceDirectory()
    {
        $viewDir = \common_ext_ExtensionsManager::singleton()->getExtensionById('myPCI')->getConstant('DIR_VIEWS');
        return $viewDir . implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'ims', 'simplePCI']);
    }
}
