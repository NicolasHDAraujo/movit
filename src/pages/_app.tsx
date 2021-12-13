import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );//componente que fica por volta da aplicação, os componentes que aparecem em todas as paginas ficam aqui
}

export default MyApp
