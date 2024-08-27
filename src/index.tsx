import React, { ReactNode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';  
import App from "./App";
import "./tailwind.css";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import Error500 from "@/errors/500Error";

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={Error500}>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
