Ext.define('Gestionale.store.Iscritti', {
    extend: 'Ext.data.Store',

    alias: 'store.iscritti',

    fields: [
    	{ name: 'idAnagrafica'},
    	{ name: 'idAnagraficaCorso'},
    	{ name: 'nome'},
    	{ name: 'cognome'},
    	{ name: 'dataNascita', type: 'date'},
    	{ name: 'tipologia'},
    	{ name: 'data', type: 'date'},
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/anagraficaCorso/search',
        api: {
        	read: '/gspRiva/ws/anagraficaCorso/search'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
