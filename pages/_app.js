import Head from 'next/head';
import { ThemeProvider } from 'styled-components'
import theme from '../src/theme';
import GlobalStyle  from '../src/theme/GlobalStyle';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Felipe Vash - Portfolio</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet" defer
        />
        <meta name="robots" content="all" />
        <meta name="Portfolio FrontEnd de Felipe Vash" content="Portfolio do desenvolvedor FrontEnd Felipe Vash"></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}