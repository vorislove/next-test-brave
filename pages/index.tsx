import type { NextPage } from 'next';
import { CSSTransition } from 'react-transition-group';
import { useState, useContext, useRef } from 'react';
import { ActionsType } from '../Components/context/type';
import { OperatorItem } from '../Components/OperatorItem';
import { Context, useDispatchContext } from '../Components/context/Context';
import { useMessage } from '../Components/Hooks/useMessage';
import styled from 'styled-components';
import Input from '../Components/ui/Input';
import ButtonClosed from '../Components/ui/Buttons/ClosedButton';
import Button, { BtnGroup } from '../Components/ui/Buttons/Button.styled';
import { Container, Wrapper } from '../Components/ui/Container.styled';
import Head from 'next/head';
import useDeviceType from '../Components/Hooks/useTypeDevices';
import { ESize, device } from '../Components/ui/breakpoints';

const Home: NextPage = () => {
	const { state } = useContext(Context);
	const [operator, setOperator] = useState<string>('');
	const dispatch = useDispatchContext();
	const message = useMessage(3000);
	const [valid, setValid] = useState<boolean>(true);
	const [show, setShow] = useState<boolean>(false);
	const nodeRef = useRef(null);
	const nodeBtnRef = useRef(null);

	const onChangeNameOperator = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValid(true);
		setOperator(e.target.value);
	};

	const onAddHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (operator != '') {
			const id = Math.random().toString(36).substring(2, 9);
			dispatch({
				type: ActionsType.ADD_OPERATOR,
				payload: { name: operator, id, img: '' }
			});
			setOperator('');
			message('Оператор успешно довлен, можете совершить оплату');
		} else {
			setValid(false);
		}
	};

	const showAddCard = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
		setShow(!show);
	};

	const hideAddCard = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation();
		setShow(false);
	};

	const typeDevice = useDeviceType();

	const addCardBlock = (
		<Wrapper mrgn="1.5rem auto 0 auto" position="relative" ref={nodeRef} maxHeight="228px">
			<OvrfHidden>
				<Title>Добавте вашего оператора</Title>
				<Input
					type="text"
					placeholder="Введите название вашего оператора"
					onChange={onChangeNameOperator}
					value={operator}
					firstChild={false}
					valid={valid}
				/>
				<BtnGroup>
					<Button onClick={onAddHandler}>Добавить</Button>
				</BtnGroup>

				{typeDevice !== ESize.DESKTOP ? <ButtonClosed onClick={hideAddCard} /> : null}
			</OvrfHidden>
		</Wrapper>
	);

	return (
		<>
			<Head>
				<title>Пополнение баланса</title>
			</Head>
			<Container display="flex">
				<h1>Пополнение баланса</h1>
				{typeDevice !== ESize.DESKTOP ? (
					<div>
						Если нет вашего оператора, чтобы добавить{' '}
						<AddOperator onClick={showAddCard}>нажмитe сюда</AddOperator>
					</div>
				) : null}
				<HomeWrapper>
					{typeDevice !== ESize.DESKTOP ? (
						<CSSTransition
							in={show}
							nodeRef={nodeRef}
							classNames={typeDevice === ESize.TABLET ? 'alert-tablet' : 'alert'}
							unmountOnExit
							onEnter={() => setShow(true)}
							onExited={() => setShow(false)}
							timeout={300}
						>
							{addCardBlock}
						</CSSTransition>
					) : (
						addCardBlock
					)}
					<Wrapper mrgn="1.5rem auto" position="relative">
						{state.operators.map((item) => (
							<OperatorItem key={item.id} href={`/${item.id}`} img={item.img} name={item.name} />
						))}
					</Wrapper>
				</HomeWrapper>
			</Container>
		</>
	);
};

const AddOperator = styled.span`
	text-decoration: underline;
	color: #fab700;
	cursor: pointer;
`;

const HomeWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	width: 100%;
	max-width: 1200px;

	@media ${device.mobile} {
		flex-direction: column;
	}

	@media ${device.tablet} {
		flex-direction: row-reverse;
		max-width: 1024px;
		gap: 1.5rem;
	}

	@media ${device.desktop} {
		gap: 1.5rem;
	}
`;

const Title = styled.span`
	font-size: 1.5rem;
	font-weight: 600;
	height: auto;
`;

const OvrfHidden = styled.div`
	overflow: hidden;
`;

export default Home;
