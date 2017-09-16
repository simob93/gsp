Ext.define('Gestionale.store.AnagraficaStore', {
    extend: 'Ext.data.Store',

    alias: 'store.anagrafica',

    fields: [
    	{ name: 'nome'},
    	{ name: 'cognome'},
    	{ name: 'dataNascita', type: 'date'},
    	{ name: 'luogoNascita'},
    	{ name: 'indirizzo'},
    	{ name: 'cap'},
    	{ name: 'citta'},
    	{ name: 'telefono'},
    	{ name: 'nomeGenitore'},
    	{ name: 'codiceFiscale'}
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/anagrafica/get',
        api: {
        	read: '/gspRiva/ws/anagrafica/get',
        	create: '/gspRiva/ws/anagrafica/save',
        	update: '/gspRiva/ws/anagrafica/update',
        	destroy: '/gspRiva/ws/anagrafica/delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
