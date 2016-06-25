
'use strict';

const fs = require( "fs" );
const promiseReadFile = require( "fs-readfile-promise" );

const readFile = function( fileName ){
    return new Promise( function( resolve,  reject){
        fs.readFile( fileName, function( err, data){

            if ( err ) reject( err );

            resolve( data );
        });
    } );
};

readFile("./1.txt").then( function( data ){

    console.log( data.toString() );

} ).then( function(){

    return readFile( "./2.txt");

} ).then( function( data ){

    console.log( data.toString() );

} ).then( function(){

    return readFile("./3.txt");

} ).then( function( data ){

    console.log( data.toString() );
}).catch( function( err ){
    console.log( err.message );
    console.log( err.code );
} );

