Ext.define('Gestionale.store.TipologiaCorsi', {
    extend: 'Ext.data.ArrayStore',

    alias: 'store.tipologiaCorsi',

    fields: [
        'codice', 'valore', 'extra'
    ],

    data: [
    	[1, 'Individuale'],
    	[2, 'Gruppo'],
    	[3, 'Disabili'],
    	[4, 'APSS'],
    	[5, 'Riservato']
    ]
});
