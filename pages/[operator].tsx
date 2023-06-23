import { useRouter } from 'next/router';
import { Container, StyledSpan, Wrapper } from '../Components/ui/Container.styled';
import { useContext, useState } from 'react';
import { Context, useDispatchContext } from '../Components/context/Context';
import styled from 'styled-components';
import Image from 'next/image';
import Input from '../Components/ui/Input';
import Button, { BtnGroup } from '../Components/ui/Buttons/Button.styled';
import { ActionsType } from '../Components/context/type';
import { useMessage } from '../Components/Hooks/useMessage';
import ServerResponse from '../services/api';
import { Loader } from '../Components/ui/Loader';
import Head from 'next/head';

const Operator = () => {
	const router = useRouter();
	const serverResponse = new ServerResponse();
	const { state } = useContext(Context);
	const [phone, setPhone] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const message = useMessage(4000);
	const [phoneValid, setPhoneValid] = useState<IValidation>({
		valid: true,
		text: 'Введите номер телефона'
	});
	const [sum, setSum] = useState<string>('');
	const [sumValid, setSumValid] = useState<IValidation>({
		valid: true,
		text: 'Мин: 1 руб., Макс: 1000 руб.'
	});

	interface IValidation {
		valid: boolean;
		text: string;
	}

	const operator = state.operators.find((item) => {
		return item.id === router.query.operator;
	});

	//обрабочик на поле ввода телефона
	const changeHandlerPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneValid({ ...phoneValid, valid: true }); //убрать бордер при повторном вводе после неудачной попытки

		let input = e.target,
			inputNumbersValue = input.value.replace(/\D/g, ''), //убираю не числовые символы
			formatedInputValue = '';

		if (!inputNumbersValue) {
			return (input.value = '');
		}

		//проверяю с какого числа начинает вводится телефон и подтсавляю в зависимости от этого первый символ
		if (inputNumbersValue[0] == '9') inputNumbersValue = '7' + inputNumbersValue;
		let firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
		formatedInputValue = firstSymbols + ' ';

		//добавляю скобки и тире
		if (inputNumbersValue.length > 1) {
			formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
		}
		if (inputNumbersValue.length >= 5) {
			formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
		}
		if (inputNumbersValue.length >= 8) {
			formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
		}
		if (inputNumbersValue.length >= 10) {
			formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
		}

		input.value = formatedInputValue;
		setPhone(formatedInputValue);
	};

	const keyDownHadler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Backspace' && phone.replace(/\D/g, '').length == 1) {
			setPhone('');
		}
	};

	//валидация суммы в диапазоне от 1 до 1000
	const changeHandlerSum = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;

		if (Number(input.value) >= 1 || Number(input.value) <= 1000) {
			setSumValid({ ...sumValid, valid: true });
			setSum(input.value);
		}
		if (input.value == '0' || Number(input.value) > 1000) {
			setSumValid({ ...sumValid, valid: false, text: 'Мин: 1 руб., Макс: 1000 руб.' });
			setSum(input.value);
		}
	};

	//обработчик на отправку формы
	const sendHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		//проверка наличия телефона
		if ((phone[0] == '8' && phone.length == 17) || (phone[0] == '+' && phone.length == 18)) {
			setPhoneValid({ ...phoneValid, valid: true });
		} else {
			setPhoneValid({ ...phoneValid, valid: false });
		}

		//проверка наличия суммы
		if (sum == '') {
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
	};

	const toMainHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push('/');
	};

	const image =
		operator?.img != '' ? (
			<Image src={operator?.img} alt={operator?.name} width={80} height={80} />
		) : (
			<StyledSpan fs="3rem">{operator?.name[0].toUpperCase()}</StyledSpan>
		);

	return (
		<Container>
			<Head>
				<title>Оплата {operator.name}</title>
			</Head>
			<OperatorWrapper>
				<Wrapper>
					<Title>
						{image}
						<H1>{operator?.name}</H1>
					</Title>
					<form action="">
						<Input
							type="tel"
							placeholder={phoneValid.valid ? 'Телефон' : phoneValid.text}
							value={phone}
							onChange={changeHandlerPhone}
							maxlength={18}
							onKeyDown={keyDownHadler}
							valid={phoneValid.valid}
						/>
						<Input
							type="text"
							placeholder={sumValid.valid ? 'Сумма' : sumValid.text}
							value={sum}
							onChange={changeHandlerSum}
							valid={sumValid.valid}
							onKeyDown={keyDownHadler}
						/>
						<BtnGroup>
							<Button onClick={sendHandler}>{isLoading ? <Loader /> : 'Оплатить'}</Button>
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
