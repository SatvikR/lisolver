import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lisolver</title>
        <meta name="title" content="Lisolver"></meta>
        <meta
          name="description"
          content="Open source equation solver and simplifier."
        ></meta>
        <meta
          name="keywords"
          content="math, equations, solve, simplify, lisolver"
        ></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=utf-8"
        ></meta>
        <meta name="language" content="English"></meta>
        <meta name="author" content="Satvik Reddy"></meta>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
