export enum ActionsType {
	ADD_OPERATOR = 'ADD_OPERATOR',
	MESSAGE_ADD = 'MESSAGE_ADD',
	MESSAGE_DELETE = 'MESSAGE_DELETE'
}

interface OperatorAdd {
	type: ActionsType.ADD_OPERATOR;
	payload: IOperator;
}
interface MsgAdd {
	type: ActionsType.MESSAGE_ADD;
	payload: IModal;
}
interface MsgDelete {
	type: ActionsType.MESSAGE_DELETE;
	payload: string;
}

export type ContextProps = {
	state: IState;
};

export type ContextActionsType = OperatorAdd | MsgAdd | MsgDelete;

export interface IOperator {
	name: string;
	id: string;
	img: string;
}

export interface IModal {
	message: string;
	id: string;
}

export interface IState {
	operators: IOperator[];
	modal: IModal[];
}

export interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}
