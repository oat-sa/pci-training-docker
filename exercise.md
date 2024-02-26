# PCI Development

## Simple PCI development I

We are going to implement a first PCI, that will:

-   Show an input field to ask for the name
-   Say hello, with the name
-   Return with the name as the response

So far we saw:

-   how to create a TAO extension, by using the TaoDevTools
-   how to install a local package into TAO
-   how to create a simple PCI (skeleton), using the PCI-SDK
-   how to add an install script for the PCI
-   how to install/update a PCI using a migration script

Now, we need to make our PCI useful.

## Simple PCI development II

We'll now iterate over the previous PCI and add an authoring part:

-   We want to have the possibility to change the greetings.
-   First, we need to rework the way it is building the layout: we must separate the input from the greetings.
-   We need also to bundle the PCI since it is composed of multiple modules.

## Advanced PCI development

-   Add the complete authoring part
-   Add the bundling
-   Embed a 3rd party library
-   Publish the PCI
