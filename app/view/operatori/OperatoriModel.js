Ext.define('Gestionale.view.operatori.OperatoriModel', {
    extend: 'Ext.data.Model',
   fields: [
	   	{ name: 'id'},
	   	{ name: 'nome'},
	   	{ name: 'cognome'},
	   	{ name: 'username'},
	   	{ name: 'password'},
	   	{ name: 'amministratore'},
   ],
   idProperty: 'fakeId'
    
});