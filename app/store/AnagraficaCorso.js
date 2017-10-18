Ext.define('Gestionale.store.AnagraficaCorso', {
    extend: 'Ext.data.Store',

    alias: 'store.anagraficaCorso',

    fields: [
    	{ name: 'data', type: 'date'},
    	{ name: 'tipologia'},
    	{ name: 'numeroLezioni'},
    	{ name: 'minutiLezioni'},
    	{ name: 'lunedi'},
    	{ name: 'martedi'},
    	{ name: 'mercoledi'},
    	{ name: 'giovedi'},
    	{ name: 'venerdi'},
    	{ name: 'sabato'},
    	{ name: 'personalizzato'},
    	{ name: 'assicurazione'},
    	{ name: 'certificatoMedico'},
    	{ name: 'scadenzaCertificato', type: 'date'},
    	{ name: 'acconto'},
    	{ name: 'deletedData', type: 'date'},
    	
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/anagraficaCorso/list',
        api: {
        	read: '/gspRiva/ws/anagraficaCorso/list',
        	create: '/gspRiva/ws/anagraficaCorso/save',
        	update: '/gspRiva/ws/anagraficaCorso/update',
        	destroy: '/gspRiva/ws/anagraficaCorso/delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
