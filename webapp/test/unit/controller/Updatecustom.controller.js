/*global QUnit*/

sap.ui.define([
	"updatecustom/controller/Updatecustom.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Updatecustom Controller");

	QUnit.test("I should test the Updatecustom controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
