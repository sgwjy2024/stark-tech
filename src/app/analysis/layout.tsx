import SideNav from '@/components/sidenav/sidenav';
import TopNav from '@/components/topnav/topnav';
import styles from './analysis.module.css';
import { Container } from '@mui/material';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <TopNav />
      <Container maxWidth="lg" sx={{
        display: 'flex',
        padding: '30px'
      }}>
        <SideNav />
        <div className={styles.child}>{children}</div>
      </Container>
    </div>
  );
}
