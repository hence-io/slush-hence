#!/usr/bin/env bash

cd ../
npm i -g slush-hence/
cd test
slush hence card:ui user:schema user-card:model --pre test
cd slush-hence
