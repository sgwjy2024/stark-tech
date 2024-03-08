import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styles from './home.module.css';
const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
        </Stack>
      </div>
      <div className={styles.right}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="rounded" height={400} />
          <Skeleton variant="rounded" height={400} />
        </Stack>
      </div>
    </div>
  )
}

export default Loading