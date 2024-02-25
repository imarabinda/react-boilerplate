import { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import EventListeners from "./components/utilities/EventListeners";
import { setAxiosAccessToken } from "./lib/helpers/axios/axios.helper";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./routes/Routes";
import "./styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useDateSetup from "lib/hooks/utilities/useDateSetup";
import usePreventInspectElement from "lib/hooks/dom/usePreventInspectElement";
import AppThemeSetup from "theme/AppThemeSetup";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useDateSetup();

  usePreventInspectElement(process.env.NODE_ENV !== "development");

  //set initially
  useEffect(() => {
    const state = store?.getState()?.userSlice;
    setAxiosAccessToken(state.accessToken);
  }, []);

  return (
    <AppThemeSetup>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster richColors position="top-center" />
          <QueryClientProvider client={queryClient}>
            <EventListeners />
            <Routes />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </AppThemeSetup>
  );
}

export default App;
