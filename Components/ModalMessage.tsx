import { FC } from 'react';
import ButtonClosed from './ui/Buttons/ClosedButton';
import { Wrapper } from './ui/Container.styled';
import { useDispatchContext } from './context/Context';
import { ActionsType } from './context/type';


const ModalMessage: FC<{ message: string; id: string }> = ({ message, id }) => {
	const dispatch = useDispatchContext();

	const closeHandler = () => {
		dispatch({
			type: ActionsType.MESSAGE_DELETE,
			payload: id
		});
	};

	return (
		<>
				<Wrapper width="400px" position="relative" mrgn="30px 0 0 0">
					{message}
					<ButtonClosed onClick={closeHandler} />
				</Wrapper>
		</>
	);
};

export default ModalMessage;
