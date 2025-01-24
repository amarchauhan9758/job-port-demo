import "@/styles/globals.css";
import { Suspense, useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "../components/Header";
import Loader from "../utils/loader";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [openLoader, setOpenLoader] = useState(true);

  // Pages that don't require authentication
  const unprotectedRoutes = ["/login", "/signup"];

  // Check authentication and manage protected routes
  const ProtectRoute = ({ children }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem("isLogedIn");
      if (status === "loading") {
        setOpenLoader(true); // Show loader while session status is loading
      } else if (
        !session &&
        !isLoggedIn &&
        !unprotectedRoutes.includes(router.pathname)
      ) {
        // Redirect to login if not authenticated and route is protected
        router.replace("/login");
      } else {
        setOpenLoader(false); // Stop loader once session is determined
      }
    }, [session, status, router.pathname]);

    if (openLoader) {
      return <Loader openLoader={openLoader} />;
    }

    return children;
  };

  // Hide the Header on specific pages
  const shouldHideHeader = unprotectedRoutes.includes(router.pathname);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {!shouldHideHeader && <Header />}
        <ProtectRoute>
          <Suspense fallback={<Loader openLoader={openLoader} />}>
            <Component {...pageProps} />
          </Suspense>
        </ProtectRoute>
      </SessionProvider>
    </Provider>
  );
}
