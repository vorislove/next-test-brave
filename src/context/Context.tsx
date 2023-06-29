import { createContext, useReducer, useContext, useMemo } from 'react';
import { ContextProps, IState, ActionsType, ContextActionsType, ProviderProps } from './type';
const initialState: IState = {
	operators: [
		{ name: 'Мегафон', id: '1', img: '/megafon.png' },
		{ name: 'МТС', id: '2', img: '/mts.png' },
		{ name: 'Билайн', id: '6', img: '/beeline.png' }
	],
	modal: [
		{
			message: 'sds',
			id: 'sdsdsdsdfrgr2'
		}
	]
};
export const Context = createContext<ContextProps>({} as ContextProps);
const DispatchContext = createContext(null);
export const ContextReducer = (state: IState, action?: ContextActionsType) => {
	switch (action?.type) {
		case ActionsType.ADD_OPERATOR:
			return { ...state, operators: [...state.operators, action.payload] };
		case ActionsType.MESSAGE_ADD:
			return { ...state, modal: [...state.modal, action.payload] };
		case ActionsType.MESSAGE_DELETE: {
			const updatedMessage = state.modal.filter((e) => e.id !== action.payload);
			return {
				...state,
				modal: updatedMessage
			};
		}
		default:
			return state;
	}
};
export const ContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(ContextReducer, initialState);
	const memoizedValue = useMemo(() => ({ state }), [state]);
	return (
		<Context.Provider value={memoizedValue}>
			<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
		</Context.Provider>
	);
};
export const useDispatchContext = () => useContext(DispatchContext);
export const useStateContext = () => useContext(Context);
