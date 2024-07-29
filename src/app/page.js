import Head from 'next/head';
import { Container } from '@mui/material';
import CSVUploader from './components/CSVUploader';

export default function Home() {
  return (
    <div className='flex-1 bg-slate-800' >
      <Head >
        <title>CSV Uploader</title>
        <meta name="description" content="Upload and display CSV data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Container maxWidth="md" style={{ marginTop: 50 }}>
          <h1>CSV Uploader</h1>
          <CSVUploader />
        </Container>
      </main>
    </div>
  );
}
