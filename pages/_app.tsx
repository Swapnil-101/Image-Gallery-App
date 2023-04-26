import type { AppProps } from "next/app";
import Draggable from 'react-draggable';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
