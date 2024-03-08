import Search from "@/components/search/seach";
import styles from './topnav.module.css';
export default function TopNav() {
  return (
    <div className={styles.container}>
      <Search size='small' width={350} />
    </div>
  )
}
