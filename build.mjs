// Bask build file
// This script defines the list of actions that need to be applied to Bubble plugin
// code to make it production ready. These actions typically include minification and
// treeshaking but in practice they can be anything you want.
//
// When running `Bask Build`, this file is executed once for every plugin SSA, CSA and
// Visual Element. You can modify how certain files are processed (either to apply 
// different build parameters or to ignore them altogether) using "if" conditions. To
// facilitate this, for your convenience, we list all of the file names this build script
// will process as follows:

let all_file_names = [""]
let list_of_possible_function_types = [
    "SERVER_SIDE_ACTION", "CLIENT_SIDE_ACTION", "ELEMENT_ACTION", "ELEMENT_INITIALIZE",
    "ELEMENT_PREVIEW", "ELEMENT_UPDATE", "ELEMENT_RESET", "ELEMENT_STATE"
]

import * as esbuild from 'esbuild'
import process from 'process';
import * as fs from 'fs';

let file_name = process.argv[2] // Name of the source file to build from. Do not modify.
let resolve_directory = process.argv[3] // Directory containing `file_name`. Do not modify.
let unbuilt_file_path = process.argv[4] // Path to `file_name`. Do not modify.
let built_file_path = process.argv[5] // Path to production ready version of `file_name`. Do not modify.
let function_type = process.argv[6] // Current type of Bubble function. Do not modify.

const file_contents = fs.readFileSync(unbuilt_file_path, 'utf-8');

// Build files depending on function type
if (function_type == "SERVER_SIDE_ACTION" || function_type == "CLIENT_SIDE_ACTION") {
    esbuild.build({
        stdin: {
            contents: file_contents,
            resolveDir: resolve_directory,
            sourcefile: file_name,
        },
        bundle: true,
        minify: true,
        treeShaking: true,
        outfile: built_file_path,
        platform: 'node',
        sourcesContent: false,
    })
} else {
    esbuild.build({
        stdin: {
            contents: file_contents,
            resolveDir: resolve_directory,
            sourcefile: file_name,
        },
        bundle: true,
        minify: true,
        // treeShaking: true,
        outfile: built_file_path,
        platform: 'node',
        sourcesContent: false,
    })
}
