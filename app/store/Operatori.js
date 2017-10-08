Ext.define('Gestionale.store.Operatori', {
    extend: 'Ext.data.Store',

    alias: 'store.operatori',
    model: 'Gestionale.view.operatori.OperatoriModel',
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/operatore/list',
        api: {
        	read: '/gspRiva/ws/operatore/list',
        	create: '/gspRiva/ws/operatore/save',
        	update: '/gspRiva/ws/operatore/update',
        	destroy: '/gspRiva/ws/operatore/delete'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false
});
