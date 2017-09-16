Ext.define('Gestionale.view.istruttori.ListController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.listIstruttori',
    
    onEditGrid: function(editor, context) {
    	let grid = this.lookupReference('Grid'),
    		record = context.record.data;
    	
    	delete record.fakeId;
    	StdGenerali.salvaRecord(grid, record);
    },
    
    onBeforeEditGrid: function(editor) { debugger;
    	//StdGenerali.isolaCmp(this.lookupReference('Grid'));
    },
    
    onValidateEditGrid: function() {
    	
    },
    
    onCancelEditGrid: function(editor, value) {
    	let store = this.lookupReference('Grid').getStore(),
    		record = editor.context.record;
    	store.remove(record);
    	
    },
    
    onClickBtnNuovo: function() { 
    	let grid = this.lookupReference('Grid'),
    		store = grid.getStore();
    	store.insert(0, {
    		id:  null
    	});
    	grid.editingPlugin.startEdit(0, 0);
    },
    
    onClickBtnElimina: function() {  debugger;
    	
    	let grid = this.lookupReference('Grid'),
    		recSel = grid.getSelectionModel().getSelection();
    	
    	if (recSel.length > 0) {
    		let id = recSel[0].data.id;
    		StdGenerali.eliminaRecord(grid.getStore(), id, () => this.aggiornaStore());
    	} else {
    		StdGenerali.messaggio('Attenzione', 'Nessun dato selezionato', null, 'OK');
    	}
    },
    
    aggiornaStore: function(id) {
    	let grid = this.lookupReference('Grid');
    	grid.getStore().load({
    		callback: (records, operation, success) => {
    			if (success) {
    				if (records.length > 0) {
    					let record = null;
	    				if (id) {
	    					record = StdGenerali.findRecord(grid.getStore(), 'id', id);
	    				}
	    				grid.getSelectionModel().deselectAll();
	    				grid.getSelectionModel().select(record ? record : 0);
    				}
    			}
    		}
    	});
    },

    launch: function() {
    	this.lookupReference('Grid').controller = this;
    	this.aggiornaStore();
    }

});