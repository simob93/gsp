Ext.define('Gestionale.store.MinutiLezioni', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.minutiLezioni',

    fields: [
        'codice', 'valore', 'extra'
    ],

    data: [
    	[45, 45],
    	[50, 50]
    ]
});
