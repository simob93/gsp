Ext.define('Gestionale.store.Iscritti_Corso', {
    extend: 'Ext.data.Store',

    alias: 'store.iscrittiCorso',
    model: 'Gestionale.view.iscritti.IscrittiModel',
    proxy: {
        type: 'ajax',
        url: '/gspRiva/ws/corso/listIscrittiByIdCorso',
        api: {
        	read: '/gspRiva/ws/corso/listIscrittiByIdCorso',
        	create: '/gspRiva/ws/corso/registra',
        	destroy: '/gspRiva/ws/corso/delete',
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true
});
