import { useRouter } from 'next/router';
import { Container, StyledSpan, Wrapper } from '../сomponents/ui/Container.styled';
import { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../context/Context';
import styled from 'styled-components';
import Image from 'next/image';
import Button, { BtnGroup } from '../сomponents/ui/Buttons/Button.styled';
import { useMessage } from '../hooks/useMessage';
import { serverResponse } from '../services/api';
import { Loader } from '../сomponents/ui/Loader';
import Head from 'next/head';
import { IValidation, PhoneInput } from '../сomponents/PhoneInput';
import { SumInput } from '../сomponents/SumInput';

const Operator = () => {
	const router = useRouter();
	const { state } = useContext(Context);
	const [phone, setPhone] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const message = useMessage(4000);
	const [phoneValid, setPhoneValid] = useState<IValidation>({
		valid: true,
		text: 'Введите номер телефона'
	});
	const [sum, setSum] = useState('');
	const [sumValid, setSumValid] = useState<IValidation>({
		valid: true,
		text: 'Мин: 1 руб., Макс: 1000 руб.'
	});

	const [operator, setOperator] = useState(null);
	useEffect(() => {
		setOperator(state.operators.find((item) => item.id === router.query.operator));
	}, [router.query.operator, state.operators]);

	//обработчик на отправку формы
	const sendHandler = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();

			//проверка наличия телефона
			if ((phone[0] == '8' && phone.length == 17) || (phone[0] == '+' && phone.length == 18)) {
				setPhoneValid({ ...phoneValid, valid: true });
			} else {
				setPhoneValid({ ...phoneValid, valid: false });
			}

			//проверка наличия суммы
			if (!sum) {
				setSumValid({ ...sumValid, valid: false, text: 'Введите сумму' });
			} else if (Number(sum) > 1000 || Number(sum) < 1) {
				setSumValid({ ...sumValid, valid: false, text: 'Мин: 1 руб., Макс: 1000 руб.' });
			}

			//эмуляция ответа от сервера
			if (
				sumValid.valid &&
				phoneValid.valid &&
				sum &&
				((phone[0] == '8' && phone.length == 17) || (phone[0] == '+' && phone.length == 18))
			) {
				setIsLoading(true);
				serverResponse
					.getResponse(phone, sum)
					.then((res) => {
						setIsLoading(false);
						message(res);
						router.push('/');
					})
					.catch((error) => {
						setIsLoading(false);
						message(error.message);
					});
			}
		},
		[sumValid, phoneValid, sum, phone, message, router, serverResponse]
	);

	const toMainHandler = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			router.push('/');
		},
		[router]
	);

	let image;
	if (operator?.img != '') {
		image = <Image src={operator?.img} alt={operator?.name} width={80} height={80} />;
	} else {
		image = <StyledSpan fs="3rem">{operator?.name[0].toUpperCase()}</StyledSpan>;
	}

	return (
		<Container>
			<Head>
				<title>Оплата {operator?.name}</title>
			</Head>
			<OperatorWrapper>
				<Wrapper>
					<Title>
						{image}
						<H1>{operator?.name}</H1>
					</Title>
					<form action="">
						<PhoneInput
							value={phone}
							onChange={setPhone}
							valid={phoneValid}
							onChangeValid={setPhoneValid}
						/>
						<SumInput value={sum} onChange={setSum} valid={sumValid} onChangeValid={setSumValid} />
						<BtnGroup>
							<Button onClick={sendHandler} disabled={isLoading}>
								{isLoading ? <Loader /> : 'Оплатить'}
							</Button>
							<Button onClick={toMainHandler} bg={'white'}>
								На главную
							</Button>
						</BtnGroup>
					</form>
				</Wrapper>
			</OperatorWrapper>
		</Container>
	);
};

const OperatorWrapper = styled.div`
	max-width: 700px;
	display: flex;
	flex-direction: row;
	margin: 50px auto 0 auto;
	width: 100%;
	min-width: 300px;
	justify-content: center;
`;

const H1 = styled.h1`
	font-size: 2rem;
	font-weight: 900;
	margin-left: 20px;
`;

const Title = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export default Operator;
