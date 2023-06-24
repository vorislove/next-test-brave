import styled from 'styled-components';
import { useContext } from 'react';
import { Context } from './context/Context';
import ModalMessage from './ModalMessage';

const MessageContainer = () => {
	const { state } = useContext(Context);

	return (
		<Container>
			{state.modal.map((message) => {
				return <ModalMessage message={message.message} key={message.id} id={message.id} />;
			})}
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 50%;
	padding: 2rem;
	transform: translateX(-50%);
`;

export default MessageContainer;
