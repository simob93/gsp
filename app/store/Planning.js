Ext.define('Gestionale.store.Planning', {
    extend: 'Ext.data.Store',

    alias: 'store.planning',

    fields: [
    	{name: 'idCorso'},
    	{ name: 'data', type: 'date'},
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/calendar/list',
        api: {
        	read: '/gspRiva/ws/calendar/list',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
