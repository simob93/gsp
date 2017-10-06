Ext.define('Gestionale.store.Comuni', {
    extend: 'Ext.data.Store',

    alias: 'store.comuni',

    fields: [
    	{name: 'id'},
    	{name: 'descrizione'}
    ],
    
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/comuni/list',
        api: {
        	read: '/gspRiva/ws/comuni/list',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true
});
