import Head from 'next/head';
import Link from 'next/link';
import { Container, Button } from '@mui/material';
import GenerateLinks from '../components/generate-links';
import { cookies } from 'next/headers';

export default function Home() {
  return (
    <div>
      <Head>
        <title>CSV Uploader</title>
        <meta name="description" content="Upload and display CSV data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="xl" style={{ marginTop: 50 }}>
          <h1>Link Generator</h1>
          <GenerateLinks />
        </Container>
      </main>
    </div>
  );
}
