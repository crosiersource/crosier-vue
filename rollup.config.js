import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const fs = require('fs-extra');
const path = require('path');

let entries = [];

let globalDependencies = {
    'vue': 'Vue',
}

function addEntry(folder, inFile, outFile) {
    entries.push({
        input: 'src/components/' + folder + '/' + inFile,
        output: [
            {
                format: 'cjs',
                file: 'dist/' + folder + '/' + outFile + '.cjs.js',
            },
            {
                format: 'esm',
                file: 'dist/' + folder + '/' + outFile + '.esm.js'
            },
            {
                format: 'iife',
                name: 'crosier-vue.' + folder,
                file: 'dist/' + folder + '/' + outFile + '.js',
                globals: globalDependencies
            }
        ],
        plugins: [
            vue(),
            postcss()
        ]
    });

    entries.push({
        input: 'src/components/' + folder + '/' + inFile,
        output: [
            {
                format: 'cjs',
                file: 'dist/' + folder + '/' + outFile + '.cjs.min.js'
            },
            {
                format: 'esm',
                file: 'dist/' + folder + '/' + outFile + '.esm.min.js'
            },
            {
                format: 'iife',
                name: 'crosier-vue.' + folder,
                file: 'dist/' + folder + '/' + outFile + '.min.js',
                globals: globalDependencies
            }
        ],
        plugins: [
            vue(),
            postcss(),
            terser()
        ]
    });
}

function addSFC() {
    fs.readdirSync(path.resolve(__dirname, './src/components/')).forEach(folder => {
        fs.readdirSync(path.resolve(__dirname, './src/components/' + folder)).forEach(file => {
            let name = file.split(/(.vue)$|(.js)$/)[0].toLowerCase();
            if (/\.vue$/.test(file) && (name === folder)) {
                addEntry(folder, file, name);
            }
        });
    });
}

function addDirectives() {
    // addEntry('badgedirective', 'BadgeDirective.js', 'badgedirective');
    // addEntry('ripple', 'Ripple.js', 'ripple');
    // addEntry('tooltip', 'Tooltip.js', 'tooltip');
    // addEntry('styleclass', 'StyleClass.js', 'styleclass');
}

function addConfig() {
    
}

function addUtils() {
    // addEntry('utils', 'Utils.js', 'utils');
}

function addApi() {
    // addEntry('api', 'Api.js', 'api');
}

function addServices() {
    // addEntry('confirmationservice', 'ConfirmationService.js', 'confirmationservice');
    // addEntry('confirmationeventbus', 'ConfirmationEventBus.js', 'confirmationeventbus');
    // addEntry('useconfirm', 'UseConfirm.js', 'useconfirm');
    // addEntry('toastservice', 'ToastService.js', 'toastservice');
    // addEntry('toasteventbus', 'ToastEventBus.js', 'toasteventbus');
    // addEntry('overlayeventbus', 'OverlayEventBus.js', 'overlayeventbus');
    // addEntry('usetoast', 'UseToast.js', 'usetoast');
    // addEntry('terminalservice', 'TerminalService.js', 'terminalservice');
}

addSFC();
addDirectives();
addConfig();
addUtils();
addApi();
addServices();

export default entries;
