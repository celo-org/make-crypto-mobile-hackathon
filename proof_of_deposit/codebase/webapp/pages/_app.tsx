import '@celo-tools/use-contractkit/lib/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Proof-of-Deposit</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="celo, cryptocurrency, defi" />
        <meta
          name="description"
          content="Cambridge Cryptographic's Hackathon Submission"
        />

        <script async src="/dark-mode.js" />

        {process.browser && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }',
              }}
            ></script>
          </>
        )}
      </Head>

      <div suppressHydrationWarning>
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </div>
    </>
  );
}

export default MyApp;
