Ext.define('Gestionale.view.istruttori.IstruttoriModel', {
    extend: 'Ext.data.Model',
   fields: [
	   	{ name: 'id'},
	   	{ name: 'nome'},
	   	{ name: 'cognome'},
	   	{ name: 'telefono'},
	   	{ name: 'email'},
   ],
   idProperty: 'fakeId'
    
});