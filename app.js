'use strict';

const koa = require("koa");
const debug = require( "debug" );
const router =  require("koa-router")();
const middlewares = require( 'koa-middlewares' );
const error = require( "koa-onerror" );

const app = koa();

app.use( middlewares.bodyParser({limit: "10m"}) );
app.use( middlewares.etag() );
app.use( middlewares.logger() );
//middlewares.csrf( app );

router.get( "/app/:id", function*(next){
    console.log( this.params.id );
    this.body = "app";
} );


router.get( "user", "/users/:id", function*(next){

    console.log( this.request );

    this.body = "user";

} );


app.use( router.routes() );



error(app, {
    json: function(){
        this.status = 500;
        this.body = {
            msg: "error"
        }
    }
});

app.on( "error", function( err, ctx ){
    //console.log( err );
} );


app.listen(6000);









