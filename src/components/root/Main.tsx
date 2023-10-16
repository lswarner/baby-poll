import { Router } from "~/components/router/Router";
// import { setupFirebase } from "~/lib/firebase";
import { useEffect } from "react";//

function Main() {
  useEffect(() => {
    // setupFirebase();

    // const auth = getAuth();
  }, []);
  return (
    <main>
      <Router />
    </main>
  );
}

export default Main;
