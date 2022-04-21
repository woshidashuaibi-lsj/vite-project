// import './index.scss';
import styles from './index.module.scss';
import logoSrc from '@assets/icons/logo.svg';
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg';
import Worker from './example.js?worker';
export function Header() {
  const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
  console.log(e);
});
  return <p className={styles.header}>
    This is Header
    <img src="https://sanyuan.cos.ap-beijing.myqcloud.com/logo.png" />
    <img className="m-auto mb-4" src={logoSrc} alt="" />
    <ReactLogo />
  </p>;
}
