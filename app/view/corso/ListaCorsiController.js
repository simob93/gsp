Ext.define('Gestionale.view.corso.ListaCorsiController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.listaCorsiController',
    
    onCerca: function() {
    	let form = this.lookupReference('MyForm');
    	record = form.getForm().getFieldValues();
    	record.escludiAnnullati = !(record.escludiAnnullati === 'T')
    	record = StdGenerali.convertiBool(record);
    	this.aggiornaStore(record)
    },
    
    aggiornaStore: function(params) {
    	let grid = this.lookupReference('Grid'),
    		store = grid.getStore();
    	
    	store.load({
    		params: params,
    		callback: (records, operation, success) => {
    			
    		}
    	});
    	
    	
    },
    
    onItemDblClick: function(th, record, item, index, e, eOpts ) {
    	let params = {
			record: record,
    		hideBtnNuovo: true,
    		corsoSingolo: record.get('tipologia') === 1 || record.get('tipologia') === 3 || record.get('tipologia') === 4,
    		tipologiaCorso: record.get('tipologia') === 1 || record.get('tipologia') === 3 || record.get('tipologia') === 4 ? 1 : record.get('tipologia')
    	}
    	let win = StdGenerali.creaWin('Gestionale.view.corso.Inserimento',params ,"Gestione corso", 1024, 650, 'win-corso', true, true)
    	win.show();
    	
    	win.on('close' , () => this.aggiornaStore());
    },
    
    launch: function() {
    	let oggi = new Date();
    	this.lookupReference('DataDal').setValue(Ext.Date.getFirstDateOfMonth(oggi));
    	this.lookupReference('DataAl').setValue(Ext.Date.subtract(Ext.Date.getFirstDateOfMonth(oggi), 'mo', -2));
    	this.lookupReference('CboxIstruttori').getStore().load();
    	this.onCerca();
    	
    }

});