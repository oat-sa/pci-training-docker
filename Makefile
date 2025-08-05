.DEFAULT_GOAL := welcome
PROJECT_NAME := pci-training
TAO_DOMAIN := pci.localhost
TAO_URL := https://training.${TAO_DOMAIN}/
TAO_CONTAINER := ${PROJECT_NAME}-phpfpm
COMPOSER_INSTALL := composer install --prefer-source --no-interaction --no-progress
COMPOSER_UPDATE := composer update --prefer-source --no-interaction --no-progress
DOCKER_DIR := ./stack
DOCKER_NETWORK := pci-docker
DOCKER_COMPOSE := docker compose -p ${PROJECT_NAME} -f ${DOCKER_DIR}/docker-compose.yml
CERTS_DIR := ${DOCKER_DIR}/certs

C_RST := \033[0m
C_ERR := \033[0;31m
C_MSG := \033[0;32m
C_SEL := \033[0;33m

welcome:
	@echo "${C_MSG}Welcome to ${C_SEL}${PROJECT_NAME}${C_RST}!"
	@make install

install:
	@echo "${C_MSG}Installing ${C_SEL}${PROJECT_NAME}${C_MSG}...${C_RST}"
	@make create-network
	@make create-certs
	@make up
	@make composer-install
	@make tao-install-tools
	@make tao-install
	@echo ""
	@echo "${C_MSG}Installation is completed! Please read the ${C_SEL}README.md${C_MSG} for more information.${C_RST}"

uninstall:
	@echo "${C_MSG}Uninstalling ${C_SEL}${PROJECT_NAME}${C_MSG}...${C_RST}"
	@make tear-down
	@make remove-certs
	@make destroy-network
	@echo "${C_MSG}Uninstallation is completed!${C_RST}"

create-network:
	@echo "${C_MSG}Installing the network${C_RST}"
	@if ! docker network inspect $(DOCKER_NETWORK) > /dev/null 2>&1; then \
		echo "Creating docker network $(DOCKER_NETWORK)..."; \
		docker network create $(DOCKER_NETWORK); \
	else \
		echo "Docker network $(DOCKER_NETWORK) already exists."; \
	fi

destroy-network:
	@echo "${C_MSG}Removing the network${C_RST}"
	docker network rm ${DOCKER_NETWORK}

create-certs:
	@if [ -f ${CERTS_DIR}/${TAO_DOMAIN}-cert.pem ] && [ -f ${CERTS_DIR}/${TAO_DOMAIN}-key.pem ]; then \
		echo "Certificates already exist in ${CERTS_DIR}. Skipping creation."; \
	else \
		echo "Generating trusted certificate for localhost using mkcert ..."; \
		mkdir -p ${CERTS_DIR}; \
		command -v mkcert >/dev/null 2>&1 || { echo "${C_ERR}mkcert is not installed. Please install it with 'brew install mkcert' and run 'mkcert -install' once.${C_RST}"; exit 1; }; \
		mkcert -cert-file ${CERTS_DIR}/${TAO_DOMAIN}-cert.pem -key-file ${CERTS_DIR}/${TAO_DOMAIN}-key.pem ${TAO_DOMAIN} "*.${TAO_DOMAIN}"; \
		cd ${CERTS_DIR} && mkcert -install && cd ..; \
		echo "Certificate: ${CERTS_DIR}/${TAO_DOMAIN}-cert.pem"; \
		echo "Key: ${CERTS_DIR}/${TAO_DOMAIN}-key.pem"; \
		echo "All certificates in ${CERTS_DIR} have been installed. Consider restarting your browser to trust the new certificates."; \
	fi

remove-certs:
	@echo "Removing trusted certificate for localhost using mkcert ..."
	@command -v mkcert >/dev/null 2>&1 || { echo "${C_ERR}mkcert is not installed. Please install it with 'brew install mkcert'.${C_RST}"; exit 1; }
	cd ${CERTS_DIR} && mkcert -uninstall && cd ..
	rm -rf ${CERTS_DIR}
	@echo "All certificates in ${CERTS_DIR} have been removed. Consider restarting your browser to remove the trusted certificates."

up:
	@echo "${C_MSG}Starting the TAO server${C_RST}"
	$(DOCKER_COMPOSE) up -d

down:
	@echo "${C_MSG}Stopping the TAO server${C_RST}"
	$(DOCKER_COMPOSE) down

tear-down:
	@echo "${C_MSG}Stopping and removing the TAO server${C_RST}"
	$(DOCKER_COMPOSE) down --rmi all -v

bash:
	@echo "${C_MSG}Opening a console on the TAO server${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash

composer-install:
	@echo "${C_MSG}Installing the source code of TAO${C_RST}"
	docker exec -it ${TAO_CONTAINER} $(COMPOSER_INSTALL)

composer-update:
	@echo "${C_MSG}Updating the source code of TAO${C_RST}"
	docker exec -it ${TAO_CONTAINER} $(COMPOSER_UPDATE)

tao-install:
	@echo "${C_MSG}Installing the TAO server${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash ./tao-cleanup.sh
	docker exec -it ${TAO_CONTAINER} php tao/scripts/taoSetup.php /var/stack/setup.json -vvv
	@echo "${C_MSG}*************************************************${C_RST}"
	@echo "${C_MSG}** Server: ${C_SEL}${TAO_URL}${C_MSG} **${C_RST}"
	@echo "${C_MSG}** Credentials: ${C_SEL}admin${C_MSG} / ${C_SEL}Admin.12345${C_MSG} **${C_RST}"
	@echo "${C_MSG}*************************************************${C_RST}"

tao-install-tools:
	@echo "${C_MSG}Installing the TAO tooling${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash ./tao-build.sh install
	docker exec -it ${TAO_CONTAINER} bash ./tao-mathjax.sh

tao-install-extension:
	@echo "${C_MSG}Installing the TAO extension ${C_SEL}$(filter-out $@,$(MAKECMDGOALS))${C_RST}"
	docker exec -it ${TAO_CONTAINER} php tao/scripts/installExtension.php $(filter-out $@,$(MAKECMDGOALS))

tao-update:
	@echo "${C_MSG}Updating the TAO server${C_RST}"
	docker exec -it ${TAO_CONTAINER} php tao/scripts/taoUpdate.php -vvv

tao-bundle:
	@echo "${C_MSG}Bundling JavaScript for the TAO extension ${C_SEL}$(filter-out $@,$(MAKECMDGOALS))${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash ./tao-build.sh bundle $(filter-out $@,$(MAKECMDGOALS))

tao-pci:
	@echo "${C_MSG}Compiling and packaging the PCI ${C_SEL}$(filter-out $@,$(MAKECMDGOALS))${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash ./tao-build.sh pci $(filter-out $@,$(MAKECMDGOALS))

tao-sass:
	@echo "${C_MSG}Bundling CSS for the TAO extension ${C_SEL}$(filter-out $@,$(MAKECMDGOALS))${C_RST}"
	docker exec -it ${TAO_CONTAINER} bash ./tao-build.sh sass $(filter-out $@,$(MAKECMDGOALS))

export:
	@echo "${C_MSG}Exporting the stack${C_RST}"
	git archive --format zip --output ./${PROJECT_NAME}.zip main

# dummy action for allowing command parameters
%:
	@:
