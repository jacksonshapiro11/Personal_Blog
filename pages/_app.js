// pages/_app.js
import '../styles/globals.css'; // Import the global CSS file

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
