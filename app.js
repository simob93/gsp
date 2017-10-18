/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */


Ext.define('Ext.overrides.Base', {
	override: 'Ext.Base',
	initConfig: function(config) {
		this.callParent([config]);
		this.extraParams = this.extraParams || {};
	}
})

Ext.Loader.setConfig({enabled: true});
Ext.application({
    name: 'Gestionale',

    extend: 'Gestionale.Application',

    requires: [
        'Gestionale.view.main.Main',
        'Ext.overrides.Base',
        'Gestionale.componenti.stdWin',
        'Ext.plugin.Viewport',
        'Ext.form.TimeField',
        'Ext.window.Toast',
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'Gestionale.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to Gestionale.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
