Ext.define('Gestionale.componenti.MyController', {
	alias: 'widget.MyController',
	extend: 'Ext.app.ViewController',
	init: function( config ) {
		if (Ext.isDefined(config.extraParams)) {
			this.extraParams = config.extraParams;
		} else {
			this.extraParams = {};
		}
		this.launch();
	}
});