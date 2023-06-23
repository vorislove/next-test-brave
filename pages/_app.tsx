import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { ContextProvider } from '../Components/context/Context';
import MessageContainer from '../Components/MessageContainer';
import Head from 'next/head';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    /* background: #f8f8f8 */
    color: #212121;
  }

  a {
  color: inherit;
  text-decoration: none;
}


`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ContextProvider>
			<Head>
				<title>Пополнение баланса</title>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@tabler/icons@latest/iconfont/tabler-icons.min.css"
				/>
			</Head>
			<Global />
			<Component {...pageProps} />
			<MessageContainer />
		</ContextProvider>
	);
}

export default MyApp;
