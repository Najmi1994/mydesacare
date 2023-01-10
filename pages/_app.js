import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import App from "next/app";
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import PageChange from 'src/components/PageChange/PageChange.js';
import { RecoilRoot } from 'recoil';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'src/styles/tailwind.css';
import { RouteGuard } from 'src/components/AuthGuard';
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getCompanyInfo } from 'src/actions/company';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'src/components/ErrorPage';

import {
  others_pages,
  sidebar_action,
  sidebar_pages,
} from 'src/data/sidebar.js';
import Link from 'next/link';
import { mobiletabs } from 'src/data/mobileTabs';

const queryClient = new QueryClient();

//transiition handler
// Router.events.on('routeChangeStart', (url) => {
//   document.body.classList.add('body-page-transition');
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById('page-transition')
//   );
// });
// Router.events.on('routeChangeComplete', () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
//   document.body.classList.remove('body-page-transition');
// });
// Router.events.on('routeChangeError', () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
//   document.body.classList.remove('body-page-transition');
// });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>MyDesa Care</title>
      </Head>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Hydrate state={pageProps.dehydratedState}>
                <RouteGuard>
                  <Component {...pageProps} />
                </RouteGuard>
              </Hydrate>
              <ReactQueryDevtools initialIsOpen={false} />
            </Layout>
          </QueryClientProvider>
        </RecoilRoot>
      </ErrorBoundary>
      
      <Script src='https://unpkg.com/flowbite@1.3.3/dist/flowbite.js'></Script>
    </React.Fragment>
  );
}

export default appWithTranslation(MyApp);
