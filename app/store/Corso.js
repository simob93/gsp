Ext.define('Gestionale.store.Corso', {
    extend: 'Ext.data.Store',

    alias: 'store.corso',

    fields: [
    	{name: 'id'},
    	{ name: 'dal', type: 'date'},
    	{ name: 'al', type: 'date'},
    	{ name: 'oraAl', convert: val => StdGenerali.convertHours(val)},
    	{ name: 'oraDal', convert: val => StdGenerali.convertHours(val)},
    	{ name: 'tipologia'},
    	{ name: 'istruttore'},
    	{ name: 'numeroLezioni'},
    	{ name: 'minutiLezioni'},
    	{ name: 'lunedi'},
    	{ name: 'martedi'},
    	{ name: 'mercoledi'},
    	{ name: 'giovedi'},
    	{ name: 'venerdi'},
    	{ name: 'sabato'},
    	{ name: 'personalizzato'},
    	{ name: 'deletedData', type: 'date'},
    	
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/corso/list',
        api: {
        	read: '/gspRiva/ws/corso/list',
        	create: '/gspRiva/ws/corso/save',
        	update: '/gspRiva/ws/corso/update',
        	destroy: '/gspRiva/ws/corso/delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
