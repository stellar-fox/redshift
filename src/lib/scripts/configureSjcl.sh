#!/bin/bash

cd ./node_modules/sjcl/
./configure --with-sha512 --compress=none
make

