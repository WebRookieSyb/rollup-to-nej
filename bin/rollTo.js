#!/usr/bin/env node
const registCommander = require("../lib/commander");
const curVersion = require("../package.json").version;
registCommander(curVersion);
