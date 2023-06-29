import { FC } from 'react';
import ButtonClosed from './ui/Buttons/ClosedButton';
import { Wrapper } from './ui/Container.styled';
import { useDispatchContext } from '../context/Context';
import { ActionsType } from '../context/type';
import useDeviceType from '../hooks/useTypeDevices';
import { device } from './ui/breakpoints';

const ModalMessage: FC<{ message: string; id: string }> = ({ message, id }) => {
	const dispatch = useDispatchContext();

	const closeHandler = () => {
		dispatch({
			type: ActionsType.MESSAGE_DELETE,
			payload: id
		});
	};
	const deviceType = useDeviceType();

	const width = deviceType === 'mobile' ? '300px' : '400px';

	return (
		<>
			<Wrapper width={width} position="relative" mrgn="30px 0 0 0">
				{message}
				<ButtonClosed onClick={closeHandler} />
			</Wrapper>
		</>
	);
};

export default ModalMessage;
