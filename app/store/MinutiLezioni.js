Ext.define('Gestionale.store.MinutiLezioni', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.minutiLezioni',

    fields: [
        'codice', 'valore', 'extra'
    ],

    data: [
    	[30, 30],
    	[45, 45]
    ]
});
