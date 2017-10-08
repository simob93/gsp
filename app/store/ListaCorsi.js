Ext.define('Gestionale.store.ListaCorsi', {
    extend: 'Ext.data.Store',

    alias: 'store.listaCorsi',
    fields: [
    	{name: 'convalidato'},
    	{name: 'dal', type: 'date'},
    	{name: 'al', type: 'date'},
    	{name: 'oraDal'},
    	{name: 'oraAl'},
    	{name: 'istruttoreNominativo'},
    	{name: 'tipo'},
    	{name: 'numeroLezioni'},
    	{name: 'durata'},
    	{name: 'orario'},
    	{name: 'giorni'},
    	{name: 'periodo'},
    	{name: 'partecipanti'},
    	{name: 'tariffaTot'},
    	{name: 'descrTipologia'},
    	{name: 'operatoreNominativo'},
    	
    ],
    proxy: {
        type: 'ajax',
        url:'/gspRiva/ws/corso/partecipanti/list',
        api: {
        	read: '/gspRiva/ws/corso/partecipanti/list'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: false,
    autoDestroy: true
});
