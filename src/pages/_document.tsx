import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta
          name="description"
          content="Onimo é um chat anônimo, onde você pode criar salas de chat públicas ou privadas."
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="author" content="Felipe Pereira" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Onimo" />
        <meta
          property="og:description"
          content="Onimo é um chat anônimo, onde você pode criar salas de chat públicas ou privadas."
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/56811005/227769214-d0b46dde-137a-40a7-bced-ab3b43e98bc6.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://user-images.githubusercontent.com/56811005/227769214-d0b46dde-137a-40a7-bced-ab3b43e98bc6.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="80" />
        <meta property="og:image:height" content="80" />
        <meta property="og:image:alt" content="Onimo" />
      </Head>
      <body className="bg-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
