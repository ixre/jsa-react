#!/usr/bin/env bash

NODE_ENV=production
JSA_SRC=../jsa

rm -rf ./dist && rm -rf ${JSA_SRC}/static/app && \
    parcel build --no-cache --public-url ./ src/index.html && \
    cp -r dist ${JSA_SRC}/static/app && \
    find ${JSA_SRC}/static/app -name "*.map"|xargs rm -rf
