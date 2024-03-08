import Container from '@mui/material/Container';
import Search from '@/components/search/seach';

export default function Home() {
  return (
    <Container maxWidth={false} sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    }}>
      <Search />
    </Container>
  );
}
