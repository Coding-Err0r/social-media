import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';

import client from '../lib/apollo-client';

const publicPages: string | string[] = [];

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  return (
    <ThemeProvider enableSystem={true} attribute="data-theme">
      <ApolloProvider client={client}>
        <ClerkProvider>
          {isPublicPage ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </ClerkProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
