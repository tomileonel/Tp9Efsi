import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{margin:0}}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
