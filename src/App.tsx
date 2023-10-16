import {HelmetProvider} from "react-helmet-async";
import { Router } from './router/Router';
// import { setupFirebase } from "~/lib/firebase";

export const App = () => {
  /*
  useEffect(() => {
    setupFirebase();

    const auth = getAuth();
  }, []);
  */
  return (
    <HelmetProvider>
        <main>
          <Router />
        </main>
    </HelmetProvider>
  )
};
