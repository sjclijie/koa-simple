'use strict';

const fs = require( "fs" );
const co = require("co");

const readFilePromise = function( fileName ){
    return new Promise( function( resolve, reject ){
        fs.readFile( fileName, function(err, data){
            if ( err ){
                reject( err );
            }
            resolve( data );
        } );
    } );
};

var readFile = function *(){
    var f1 = yield readFilePromise("./1.txt");
    var f2 = yield readFilePromise("./2.txt");
    var f3 = yield readFilePromise("./3.txt");

    console.log( f1.toString() );
    console.log( f2.toString() );
    console.log( f2.toString() );
};

co( readFile ).then( function(){
    console.log( "generator 执行完成." );
} );
