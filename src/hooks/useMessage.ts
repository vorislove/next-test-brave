import { useDispatchContext } from '../context/Context';
import { ActionsType } from '../context/type';

export function useMessage(delay: number) {
	const dispatch = useDispatchContext();

	function message(message: string) {
		const id = Math.random().toString(36).substring(2, 9);
		dispatch({
			type: ActionsType.MESSAGE_ADD,
			payload: { message, id }
		});

		setTimeout(() => {
			dispatch({ type: ActionsType.MESSAGE_DELETE, payload: id });
		}, delay);
	}

	return message;
}
