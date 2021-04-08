const controller = require( "./controller" );

const express = require( "express" );

const router = express.Router( );

router.post( "/send", controller.sendMessage );

module.exports = router;
