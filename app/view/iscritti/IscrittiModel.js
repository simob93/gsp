Ext.define('Gestionale.view.iscritti.IscrittiModel', {
   extend: 'Ext.data.Model',
   fields: [
	   	{ name: 'id'},
	   	{ name: 'idAnagrafica'},
	   	{ name: 'idAnagraficaCorso'},
	   	{ name: 'idCorso'},
	   	{ name: 'quota', type: 'float'},
	   	{ name: 'saldo'},
	   	{ name: 'deletedData'}
   ],
   idProperty: 'fakeId'
    
});