const MessageRouter = require( "./Message/router" );

module.exports = ( app ) => {
    app.use( "/message", MessageRouter );
};
