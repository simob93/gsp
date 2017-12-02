Ext.define('Gestionale.view.anagrafica.ListController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.list',
    
    onItemDblClickGrid: function(th, record, item) {
    	let {id} = record.data;
    	let win = StdGenerali.creaWin('Gestionale.view.anagrafica.Main', {idAnagrafica: record.get('id')} ,'Anagrafica iscritti', 1024, 650, 'default',  true, true);
    	win.show();
    },
   
    aggiornaStore: function(params = {}) {
    	let grid = this.lookupReference('Grid');
    	grid.getStore().load({
    		params: params,
    		callback: (records, operation, success) => {
    			if (success) {
    				if (!Ext.isEmpty(records)) {
	    				let record = null;
	    				if (id) {
	    					record = StdGenerali.findRecord(grid.getStore(), 'id', id);
	    				}
	    				grid.getSelectionModel().deselectAll();
	    				grid.getSelectionModel().select(record ? record : 0);
    				}
    			}
    		}
    	})
    },
     
    onCerca: function() {
    	
    	let objParametri = {},
    		search = null;
    	
    	if (!Ext.isEmpty(this.lookupReference('TextSearch').getValue())) {
    		search = this.lookupReference('TextSearch').getValue();
    	}
    	
    	Object.assign(objParametri, {search});
    	this.aggiornaStore(objParametri);
    },
    
    launch: function() {
    
    	StdGenerali.createBaseFilter(this, this.lookupReference('CntFilter'));
    	this.lookupReference('Grid').getStore().getProxy().api.read = '/gspRiva/ws/anagrafica/list';
    	
    }

});