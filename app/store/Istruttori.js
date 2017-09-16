Ext.define('Gestionale.store.Istruttori', {
    extend: 'Ext.data.Store',

    alias: 'store.istruttori',
    model: 'Gestionale.view.istruttori.IstruttoriModel',
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/istruttori/list',
        api: {
        	read: '/gspRiva/ws/istruttori/list',
        	create: '/gspRiva/ws/istruttori/save',
        	update: '/gspRiva/ws/istruttori/update',
        	destroy: '/gspRiva/ws/istruttori/delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
