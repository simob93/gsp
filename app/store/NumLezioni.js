Ext.define('Gestionale.store.NumLezioni', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.numLezioni',

    fields: [
        'codice', 'valore', 'extra'
    ],

    data: [
    	[8, 8],
    	[9, 9]
    ]
});
