#!/bin/node




// inject compiled module to repl context
Object.assign(
    require("repl").start({}).context, {
        redshift: require("../dist/redshift.js"),
    }
)
