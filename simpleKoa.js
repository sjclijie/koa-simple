'use strict';

const co = require( "co" );

function SimpleKoa(){
    this.middlewares = [];
}

SimpleKoa.prototype = {

    constructor: SimpleKoa,

    use(generatorFunction){
        this.middlewares.push( generatorFunction );
    },

    listen(){
        this._run();
    },

    _run(){
        var ctx = this;
        var middlewares = ctx.middlewares;

        return co( function*(){

            var prev = null;
            var i = middlewares.length;

            //从最后一个中间件到第一个中间件的顺序开始遍历
            while( i-- ) {
                //实际koa的ctx应该指向server的上下文,这里做了简化
                //prev 将前面一个中间件传递给当前中间件
                prev = middlewares[i].call( ctx, prev );
            }


            //执行第一个中间件
            yield prev;
        } );
    }
};

const koa = new SimpleKoa();

koa.use( function*(next){
    this.body = "1";
    yield next;
    this.body += "5";
    console.log( this.body );
} );

koa.use( function*(next){
    this.body += "2";
    yield next;
    this.body += "4";
} );

koa.use( function*(next){
    this.body += "3";
} );

//koa.listen();

var test = function*(){

    var f1 = function*(next){
        console.log( 111 );
        yield next;
        console.log( 222);
    };

    var f2 = function*(next){
        console.log( 333 );
        yield next;
        console.log( 444 );
    };

    var f3 = function*(){
        console.log( 555 );
        //yield next;
        //console.log( 666 );
    };

    var f3result = f3.call( null, null );
    var f2result = f2.call( null, f3result );
    var f1result = f1.call( null, f2result );

    yield f1result;
};

co( test );



