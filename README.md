# PCI Training

A Docker stack for working with PCI in TAO.

# Table of contents

-   [Checkout](#checkout)
-   [TL; DR](#tl-dr)
    -   [Install the stack](#install-the-stack)
    -   [Stop the stack](#stop-the-stack)
    -   [Start the stack](#start-the-stack)
    -   [Open a terminal on the server](#open-a-terminal-on-the-server)
-   [PCI SDK](#pci-sdk)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Update](#update)
    -   [Update TAO](#update-tao)
    -   [Reinstall all](#reinstall-all)
-   [Commands](#commands)
-   [Troubleshoot](#troubleshoot)
    -   [Windows specific](#windows-specific)
-   [Manual installation](#manual-installation)
-   [Manual uninstallation](#manual-uninstallation)
-   [Manual commands](#manual-commands)
-   [PCI development](#pci-development)

# Checkout

To install the project, you can either check it out using Git, or [download a Zip file](https://github.com/oat-sa/pci-training-docker/archive/refs/heads/main.zip).

For checking it out from Git, run the following command:

```bash
git clone https://github.com/oat-sa/pci-training-docker.git
```

> **Note:** The command above assumes you opened a terminal and changed the current directory to a parent folder. A sub-folder will be created to contain the project: `pci-training-docker`.

The project also comes with external tools, as Git submodules. They can be all installed at once when checking out the repository:

```bash
git clone --recurse-submodules -j8 git@github.com:oat-sa/pci-training-docker.git
```

> **Note:** The command above assumes you have configured your account with SSH access. Please make sure your SSH (public) key is properly registered in your [GitHub profile](https://github.com/settings/keys). In case of trouble checking out, make sure your system is also properly configured, with your SSH key created and accessible from your Git client.
>
> These tools are optional, the stack can still work fine without them. They add convenient helpers for generating and updating PCI. For more information, please refer to [the related repository](https://github.com/oat-sa/pci-sdk).

# TL; DR

Once the stack is installed, you can open TAO on your browser at https://training.pci.localhost

```bash
cd pci-training-docker
make up
```

> **Note:** the commands listed below assume you opened a terminal and changed the current directory to the root of the project:

## Install the stack

```bash
make
```

## Stop the stack

```bash
make down
```

## Start the stack

```bash
make up
```

## Open a terminal on the server

```bash
make bash
```

## PCI SDK

The project also comes with external tools, from the [PCI SDK](https://github.com/oat-sa/pci-sdk).

They are added as Git submodules, which can be all installed at once when checking out the repository:

```bash
git clone --recurse-submodules -j8 git@github.com:oat-sa/pci-training-docker.git
```

> **Note:** The command above assumes you have configured your account with SSH access. Please make sure your SSH (public) key is properly registered in your [GitHub profile](https://github.com/settings/keys). In case of trouble checking out, make sure your system is also properly configured, with your SSH key created and accessible from your Git client.
>
> These tools are optional, the stack can still work fine without them. They add convenient helpers for generating and updating PCI. For more information, please refer to [the related repository](https://github.com/oat-sa/pci-sdk).

Submodules can still be added, if you already cloned the repository:

```bash
cd pci-training-docker
git submodule init
git submodule update
```

To use the [PCI SDK](https://github.com/oat-sa/pci-sdk) submodule, you need to install it too:

```bash
cd pci-training-docker/sdk
npm i
```

# Prerequisites

-   Install `mkcert` following the [official guide](https://github.com/FiloSottile/mkcert)
-   Install Docker and Docker Compose
    [[OSX](https://docs.docker.com/docker-for-mac/install/)]
    [[Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)]
    [[Windows](https://docs.docker.com/docker-for-windows/install/)]
-   Make sure you have a minimum of **4GB** RAM assigned to Docker

# Installation

A [make](https://www.gnu.org/software/make/) script takes care of installing everything, assuming you already have cloned the repository and have a running Docker.

```bash
make
```

Open TAO on your browser at https://training.pci.localhost

# Update

To update the cloned repository, check out the last changes:

```bash
git fetch origin
git pull
```

If you also have the submodules, you may need to update them:

```bash
git submodule update
```

Depending on the nature of the changes, you may need either to update TAO, or reinstall all.

## Update TAO

```bash
make composer-install
make tao-update
```

## Reinstall all

> **Note:** this will destroy and recreate the TAO instance. Be sure to backup your data before doing so.

```bash
make composer-install
make tao-install
```

# Commands

-   Start the server

```bash
make up
```

-   Stop the server

```bash
make down
```

-   Stop and delete the server

```bash
make tear-down
```

-   Install TAO

```bash
make tao-install
```

-   Update TAO

```bash
make tao-update
```

-   Install the TAO tooling

```bash
make tao-install-tools
```

-   Install a TAO extension

```bash
make tao-install-extension theTaoExtensionToInstall
```

-   Bundle the JavaScript for a TAO extension

```bash
make tao-bundle theTaoExtensionToBundle
```

-   Bundle the CSS for a TAO extension

```bash
make tao-sass theTaoExtensionToBundle
```

-   Compile and package PCI for a TAO extension

```bash
make tao-pci theTaoExtensionToBundle
```

```bash
make tao-pci theTaoExtensionToBundle thePCIidentifier
```

-   Open a terminal on the TAO server

```bash
make tao-bash
```

-   Install the source code

```bash
make composer-install
```

-   Update the source code

```bash
make composer-update
```

-   Install the stack

```bash
make install
```

-   Uninstall the stack

```bash
make uninstall
```

# Troubleshoot

## Windows specific

On **Windows** be sure to modify the `ROOT_FS` environment variable to `c:/` in the `.env` file:

```dotenv
ROOT_FS=c:/
```

# Manual installation

-   Enter package directory:

```bash
cd stack
```

-   Open the `certs` folder:

```bash
cd certs
```

-   Generate a self-signed certificate:

```bash
mkcert \
-cert-file pci.localhost-cert.pem \
-key-file pci.localhost-key.pem \
pci.localhost "*.pci.localhost"
```

-   Install the generated self-signed certificate to your OS:

```bash
mkcert -install
```

-   Go back to the root of the project:

```bash
cd ..
```

-   Create `pci-docker` docker network:

```bash
docker network create pci-docker
```

-   Build docker services:

```bash
docker compose up -d
```

-   Enter TAO directory:

```bash
cd ../tao
```

-   Install the sources:

```bash
composer install --prefer-source
```

-   Enter package directory:

```bash
cd ../stack
```

-   Install the platform:

```bash
docker exec -it pci-training-phpfpm php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
```

# Manual uninstallation

-   Enter package directory:

```bash
cd stack
```

-   Tear down the docker services:

```bash
docker compose down --rmi all -v
```

-   Remove the `pci-docker` docker network:

```bash
docker network rm pci-docker
```

-   Open the `certs` folder:

```bash
cd certs
```

-   Uninstall the generated self-signed certificate to your OS:

```bash
mkcert -uninstall
```

# Manual commands

-   Start the server

```bash
docker compose -p pci-training -f ./stack/docker-compose.yml up -d
```

-   Stop the server

```bash
docker compose -p pci-training -f ./stack/docker-compose.yml down
```

-   Install TAO

```bash
docker exec -it pci-training-phpfpm composer install --prefer-source --no-interaction --no-progress
docker exec -it pci-training-phpfpm bash ./tao-cleanup.sh
docker exec -it pci-training-phpfpm php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
docker exec -it pci-training-phpfpm bash ./tao-build.sh install
docker exec -it pci-training-phpfpm bash ./tao-mathjax.sh
```

-   Update TAO

```bash
docker exec -it pci-training-phpfpm composer update --prefer-source --no-interaction --no-progress
docker exec -it pci-training-phpfpm php tao/scripts/taoUpdate.php -vvv
```

-   Install a TAO extension

```bash
docker exec -it pci-training-phpfpm php tao/scripts/installExtension.php theTaoExtensionToInstall
```

-   Bundle the JavaScript for a TAO extension

```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh bundle theTaoExtensionToBundle
```

-   Bundle the CSS for a TAO extension

```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh sass theTaoExtensionToBundle
```

-   Compile and package PCI for a TAO extension

```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh pci theTaoExtensionToBundle
```

```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh pci theTaoExtensionToBundle thePCIidentifier
```

-   Open a terminal on the TAO server

```bash
docker exec -it pci-training-phpfpm bash
```

## PCI development

The project comes configured with a development mode for the PCI. Out of the box, the following PCI are already configured:

-   Geogebra
-   textReaderInteraction
-   audioRecordingInteraction
-   likertScoreInteraction
-   mathEntryInteraction

To manage this list, open the file `config/taoQtiItem/debug_portable_element.conf.php`, and add/remove the PCI, following this format:

```php
<?php
return [
    ...
    'pciIdentifier' => 'path/to/pci/source/folder/',
    ...
];
```

Any PCI listed in this configuration will be reloaded in the authoring after each page refresh without having to bundle the PCI again.

The process is as follows:

1. Register the PCI in the `debug_portable_element` configuration.
2. Make a change in the source code.
3. Refresh the Item editor (you will need to re-enter the authoring mode).
4. When entering the authoring, all the source files declared in the PCI manifest are copied to the registry (make sure the manifest file lists them all).
5. The PCI in the authored item is up to date with your changes.

> **Note:** This does not remove the need to bundle the PCI, when releasing it. This only helps not re-bundle and re-install the PCI after each change to see it in TAO.
