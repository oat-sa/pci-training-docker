# PCI Training

A Docker stack for working with PCI in TAO.

# Table of contents
- [Checkout](#checkout)
- [TL; DR](#tl-dr)
  - [Install the stack](#install-the-stack)
  - [Stop the stack](#stop-the-stack)
  - [Start the stack](#start-the-stack)
  - [Open a terminal on the server](#open-a-terminal-on-the-server)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Commands](#commands)
- [Troubleshoot](#troubleshoot)
  - [Windows specific](#windows-specific)
- [Manual installation](#manual-installation)
- [Manual uninstallation](#manual-uninstallation)
- [Manual commands](#manual-commands)

# Checkout

To install the project, you can either check it out using Git, or [download a Zip file](https://github.com/oat-sa/pci-training-docker/archive/refs/heads/main.zip).

```bash
git clone https://github.com/oat-sa/pci-training-docker.git
```

> **Note:** The command above assumes you opened a terminal and changed the current directory to a parent folder. A sub-folder will be created to contain the project: `pci-training-docker`.

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

# Prerequisites

- Install `mkcert` following the [official guide](https://github.com/FiloSottile/mkcert)
- Install Docker and Docker Compose
[[OSX](https://docs.docker.com/docker-for-mac/install/)]
[[Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)]
[[Windows](https://docs.docker.com/docker-for-windows/install/)]
- Make sure you have a minimum of **4GB** RAM assigned to Docker

# Installation
```bash
make
```

Open TAO on your browser at https://training.pci.localhost

# Commands

- Start the server
```bash
make up
```

- Stop the server
```bash
make down
```

- Stop and delete the server
```bash
make tear-down
```

- Install TAO
```bash
make tao-install
```

- Update TAO
```bash
make tao-update
```

- Install the TAO tooling
```bash
make tao-install-tools
```

- Install a TAO extension
```bash
make tao-install-extension theTaoExtensionToInstall
```

- Bundle the JavaScript for a TAO extension
```bash
make tao-bundle theTaoExtensionToBundle
```

- Bundle the CSS for a TAO extension
```bash
make tao-sass theTaoExtensionToBundle
```

- Compile and package PCI for a TAO extension
```bash
make tao-pci theTaoExtensionToBundle
```

```bash
make tao-pci theTaoExtensionToBundle thePCIidentifier
```

- Open a terminal on the TAO server
```bash
make tao-bash
```

- Install the source code
```bash
make composer-install
```

- Update the source code
```bash
make composer-update
```

- Install the stack
```bash
make install
```

- Uninstall the stack
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

- Enter package directory:

```bash
cd stack
```

- Open the `certs` folder:
```bash
cd certs
```

- Generate a self-signed certificate:
```bash
mkcert \
-cert-file pci.localhost-cert.pem \
-key-file pci.localhost-key.pem \
pci.localhost "*.pci.localhost"
```

- Install the generated self-signed certificate to your OS:
```bash
mkcert -install
```

- Go back to the root of the project:
```bash
cd ..
```
- Create `pci-docker` docker network:

```bash
docker network create pci-docker
```

- Build docker services:

```bash
docker compose up -d
```

- Enter TAO directory:

```bash
cd ../tao
```

- Install the sources:

```bash
composer install --prefer-source
```

- Enter package directory:

```bash
cd ../stack
```

- Install the platform:

```bash
docker exec -it pci-training-phpfpm php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
```

# Manual uninstallation

- Enter package directory:

```bash
cd stack
```

- Tear down the docker services:

```bash
docker compose down --rmi all -v
```

- Remove the `pci-docker` docker network:

```bash
docker network rm pci-docker
```

- Open the `certs` folder:
```bash
cd certs
```

- Uninstall the generated self-signed certificate to your OS:
```bash
mkcert -uninstall
```


# Manual commands

- Start the server
```bash
docker compose -p pci-training -f ./stack/docker-compose.yml up -d
```

- Stop the server
```bash
docker compose -p pci-training -f ./stack/docker-compose.yml down
```

- Install TAO
```bash
docker exec -it pci-training-phpfpm composer install --prefer-source --no-interaction --no-progress
docker exec -it pci-training-phpfpm bash ./tao-cleanup.sh
docker exec -it pci-training-phpfpm php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
docker exec -it pci-training-phpfpm bash ./tao-build.sh install
docker exec -it pci-training-phpfpm bash ./tao-mathjax.sh
```

- Update TAO
```bash
docker exec -it pci-training-phpfpm composer update --prefer-source --no-interaction --no-progress
docker exec -it pci-training-phpfpm php tao/scripts/taoUpdate.php -vvv
```

- Install a TAO extension
```bash
docker exec -it pci-training-phpfpm php tao/scripts/installExtension.php theTaoExtensionToInstall
```

- Bundle the JavaScript for a TAO extension
```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh bundle theTaoExtensionToBundle
```

- Bundle the CSS for a TAO extension
```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh sass theTaoExtensionToBundle
```

- Compile and package PCI for a TAO extension
```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh pci theTaoExtensionToBundle
```

```bash
docker exec -it pci-training-phpfpm bash ./tao-build.sh pci theTaoExtensionToBundle thePCIidentifier
```

- Open a terminal on the TAO server
```bash
docker exec -it pci-training-phpfpm bash
```
