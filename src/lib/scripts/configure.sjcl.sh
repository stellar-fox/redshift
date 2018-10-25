#!/bin/bash

cd ./node_modules/sjcl/
./configure --without-all --with-bitArray --with-codecString --with-codecHex --with-sha512 --with-hmac --compress=none
make
