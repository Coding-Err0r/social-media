import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import {ThemeProvider} from 'next-themes'

const publicPages: string | string[] = [];

function MyApp({ Component, pageProps }: AppProps) {

  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);
  return (
    <ThemeProvider enableSystem={true} attribute="data-theme">
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
    </ThemeProvider>
  );
}

export default MyApp
