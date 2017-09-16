class OperatoreLog {
	
	constructor() {
		this._operatoreLog = null;
	}
	
	static set operatoreLog(operatore) {
		this._operatoreLog = operatore;
	}
	
	static get operatoreLog() {
		return this._operatoreLog;
	}
}