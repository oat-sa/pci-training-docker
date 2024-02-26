module.exports = function (grunt) {
    'use strict';

    const extensionName = 'myPCI';
    const extension = extensionName.toLowerCase();
    const extensionCmd = `${extension}sass`;

    const sass = grunt.config('sass') || {};
    const watch = grunt.config('watch') || {};
    const notify = grunt.config('notify') || {};
    const extRoot = grunt.option('root') + `/${extensionName}/views/`;
    const pciRoot = `${extRoot}/js/pciCreator/ims/`;

    const addCSS = (pci, name, part) => {
        const root = `${pciRoot}${pci}/${part}`;
        sass[extension].files[`${root}/css/${name}.css`] = `${root}/scss/${name}.scss`;
    };

    sass[extension] = {
        options: {},
        files: {}
    };

    watch[extensionCmd] = {
        files: [extRoot + 'scss/**/*.scss', pciRoot + '**/*.scss'],
        tasks: [`sass:${extension}`, `notify:${extensionCmd}`],
        options: {
            debounceDelay: 1000
        }
    };

    notify[extensionCmd] = {
        options: {
            title: 'Grunt SASS',
            message: 'SASS files compiled to CSS'
        }
    };

    addCSS('simplePCI', 'simplePCI', 'runtime');

    grunt.config('sass', sass);
    grunt.config('watch', watch);
    grunt.config('notify', notify);

    grunt.registerTask(extensionCmd, [`sass:${extension}`]);
};
