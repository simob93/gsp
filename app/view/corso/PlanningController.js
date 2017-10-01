Ext.define('Gestionale.view.corso.PlanningController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.planningController',
    requires: [
    	'Gestionale.store.Planning'
    ],
    
    aggiornaStore: function(params) {
    	let date = new Date();
    	this.store.load({
    		params: {
    			dal: new Date(date.getFullYear(), date.getMonth(), 1),
    			al: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    		},
    		callback: (records, operation, success)=> {
    			this.lookupReference('Calendar').generaCalendario(date, records);
    		} 
    	});
    	 
	},
	
	aggiornaLabelMese: function(text) {
		let label = this.lookupReference('TxtMeseVisualizzato');
		label.update(text + ' ' + new Date().getFullYear());
	},
	
    launch: function() {
    	this.store = Ext.create('Gestionale.store.Planning');
    	this.aggiornaStore();
		this.mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
		this.aggiornaLabelMese(this.mesi[new Date().getMonth()]);
    }

});