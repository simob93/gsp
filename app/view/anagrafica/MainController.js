Ext.define('Gestionale.view.anagrafica.MainController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.mainController',
    
    onBeforeTabChange: function(th, newCard, oldCard) {
    	
    	let form = this.lookupReference('TabPanel').down('form');
    	
    	if (newCard.getItemId().includes('TabPreferenze') 
    			&& (Ext.isEmpty(this.extraParams.idAnagrafica)
    				||  form.isDirty())) {
    		
			StdGenerali.showToastMessage('Attenzione', 'compilare prima la registrazione');
			return false;
		} 
    }, 
    
    onTabChange: function(th, newCard, oldCard) {
    	
		
		if (newCard.getItemId().includes('TabPreferenze')) {
			newCard.removeAll(true);	
			newCard.add(Ext.create('Gestionale.view.anagrafica.AnagraficaCorso', {
				extraParams: {
					controllerMain: this
				}
			}));
		}
    },
    
        
    launch: function() {
    	
    	this.lookupReference('TabDatiGenerali').add(Ext.create('Gestionale.view.anagrafica.Inserimento', {
    		extraParams: {
				controllerMain: this
			}
    	}))
    }

});