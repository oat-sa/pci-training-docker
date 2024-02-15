#!/usr/bin/env bash
cd tao/views/build

lowercase() {
    echo $(echo $1 | awk '{print tolower($0)}')
}

case $1 in
    "install")
        npm ci
        exit $?
    ;;
    "bundle")
        if [ "$2" == "" ]; then
            echo "An extension name is required!"
            echo "ex: $0 bundle yourExtensionName"
            exit 1
        fi
        task="$(lowercase $2)bundle"
        echo "running task ${task}"
        npx grunt ${task}
        exit $?
    ;;
    "pci")
        task="portableelement"
        ext=$2
        pci=$3
        if [ "$ext" == "" ]; then
            echo "An extension name is required!"
            echo "ex: $0 pci yourExtensionName"
            exit 1
        else
            ext="-e=$ext"
        fi
        if [ "$pci" != "" ]; then
            pci="-i=$pci"
        fi
        echo "running task ${task} for $2 $3"
        npx grunt ${task} ${ext} ${pci}
        exit $?
    ;;
    "sass")
        if [ "$2" == "" ]; then
            echo "An extension name is required!"
            echo "ex: $0 sass yourExtensionName"
            exit 1
        fi
        task="$(lowercase $2)sass"
        echo "running task ${task}"
        npx grunt ${task}
        exit $?
    ;;
esac

echo "$0 [install|[[bundle|sass|pci] extension]]"
echo "    install                Install the tools"
echo "    bundle  extension      Bundles the JavaScript for the given extension"
echo "    pci     extension      Compiles and packages all PCI for the given extension"
echo "    pci     extension  id  Compiles and packages the given PCI for the given extension"
echo "    sass    extension      Bundles the CSS for the given extension"
