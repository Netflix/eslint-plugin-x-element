#!/bin/bash

script_directory="$(dirname "$(realpath "${0}")")"
project_directory="$(dirname "${script_directory}")"
vendor_directory="${project_directory}/vendor"
modules_directory="${script_directory}/node_modules"
install_x_parser_js_file="${modules_directory}/@netflix/x-element/x-parser.js"
vendor_x_parser_js_file="${vendor_directory}/x-parser.js"

if [ -d "${modules_directory}" ]; then
  rm -r "${modules_directory}"
fi

if [ -d "${vendor_directory}" ]; then
  rm -r "${vendor_directory}"
fi

mkdir "${vendor_directory}"

npm install .

cp "${install_x_parser_js_file}" "${vendor_x_parser_js_file}"
