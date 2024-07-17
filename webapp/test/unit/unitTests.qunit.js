/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"updatecustom/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
