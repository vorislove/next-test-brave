export default class ServerResponse {
	private readonly responses: string[] = [
		'Пополнение счета прошло успешно',
		'Произошла ошибка при обработке запроса'
	];
	public getResponse(phone: string, sum: string): Promise<string> {
		const randomIndex = Math.floor(Math.random() * this.responses.length);
		const response = this.responses[randomIndex];
		const delay = Math.floor(Math.random() * 5000) + 1000;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (response === 'Произошла ошибка при обработке запроса') {
					reject(new Error('Произошла ошибка, попробуйте еще раз'));
				} else {
					resolve(response);
				}
			}, delay);
		});
	}
}
