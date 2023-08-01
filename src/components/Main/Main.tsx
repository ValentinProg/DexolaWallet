
import styles from './Main.module.scss'
import { SendTransaction } from '../SendTransaction/SendTransaction';

const Main = () => {
  return <div className={styles.main}><SendTransaction /></div>;
};

export default Main;
