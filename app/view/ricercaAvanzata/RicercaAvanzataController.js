Ext.define('Gestionale.view.ricercaAvanzata.RicercaAvanzataController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.ricercaAvanzata',
    
    
    onClickConferma: function(th) {
    	if (this.extraParams.controller) {
    		this.extraParams.controller.aggiornaStore();
    		th.up('window').hide();
    	}
    },
        
    launch: function() {
    	let form = this.lookupReference('FormFiltri');
    	if (this.extraParams.personFiltri) {
    		form.add(this.extraParams.personFiltri);
    	}
    }

});