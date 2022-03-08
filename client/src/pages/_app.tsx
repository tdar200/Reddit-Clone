import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider, createClient } from 'urql';
import theme from '../theme'


const client = createClient({url: "http://localhost:4000/graphql"})

function MyApp({ Component, pageProps }) {
  return (

  <Provider value={client}>

    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
  );
}

export default MyApp