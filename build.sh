#!/usr/bin/env bash

NODE_ENV=production
JSA_SRC=../jsa

rm -rf ./dist && rm -rf ${JSA_SRC}/app && \
    parcel build --no-cache --public-url ./ src/index.html && \
    cp -r dist ${JSA_SRC}/app && \
    find ${JSA_SRC}/app -name "*.map"|xargs rm -rf
