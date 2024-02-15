# PCI Training

# Table of contents
- [TL; DR](#tl-dr)
  - [Install the stack](#install-the-stack)
  - [Stop the stack](#stop-the-stack)
  - [Start the stack](#start-the-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Commands](#commands)
- [Troubleshoot](#troubleshoot)
  - [Windows specific](#windows-specific)
- [Manual installation](#manual-installation)
- [Manual uninstallation](#manual-uninstallation)

# TL; DR

Once the stack is installed, you can open TAO on your browser at https://training.pci.localhost

### Install the stack
```bash
$ make
```

### Stop the stack
```bash
$ make down
```

### Start the stack
```bash
$ make up
```

### Open a terminal on the server
```bash
$ make bash
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
$ make
```

Open TAO on your browser at https://training.pci.localhost

# Commands

- Start the server
```bash
$ make up
```

- Stop the server
```bash
$ make down
```

- Stop and delete the server
```bash
$ make tear-down
```

- Install TAO
```bash
$ make tao-install
```

- Update TAO
```bash
$ make tao-update
```

- Install the TAO tooling
```bash
$ make tao-install-tools
```

- Install a TAO extension
```bash
$ make tao-install-extension theTaoExtensionToInstall
```

- Bundle the JavaScript for a TAO extension
```bash
$ make tao-bundle theTaoExtensionToBundle
```

- Bundle the CSS for a TAO extension
```bash
$ make tao-sass theTaoExtensionToBundle
```

- Compile and package PCI for a TAO extension
```bash
$ make tao-pci theTaoExtensionToBundle
```

```bash
$ make tao-pci theTaoExtensionToBundle thePCIidentifier
```

- Open a terminal on the TAO server
```bash
$ make tao-bash
```

- Install the source code
```bash
$ make composer-install
```

- Update the source code
```bash
$ make composer-update
```

- Install the stack
```bash
$ make install
```

- Uninstall the stack
```bash
$ make uninstall
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
$ cd stack
```

- Open the `certs` folder:
```bash
$ cd certs
```

- Generate a self-signed certificate:
```bash
$ mkcert \
-cert-file pci.localhost-cert.pem \
-key-file pci.localhost-key.pem \
pci.localhost "*.pci.localhost"
```

- Install the generated self-signed certificate to your OS:
```bash
$ mkcert -install
```

- Go back to the root of the project:
```bash
$ cd ..
```
- Create `pci-docker` docker network:

```bash
$ docker network create pci-docker
```

- Build docker services:

```bash
$ docker-compose up -d
```

- Enter TAO directory:

```bash
$ cd tao
```

- Install the sources:

```bash
$ composer install --prefer-source
```

- Enter package directory:

```bash
$ cd ../stack
```

- Install the platform:

```bash
$ docker exec -it pci-training-phpfpm php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
```

# Manual uninstallation

- Enter package directory:

```bash
$ cd stack
```

- Tear down the docker services:

```bash
$ docker-compose down --rmi all -v
```

- Remove the `pci-docker` docker network:

```bash
$ docker network rm pci-docker
```

- Open the `certs` folder:
```bash
$ cd certs
```

- Uninstall the generated self-signed certificate to your OS:
```bash
$ mkcert -uninstall
```
