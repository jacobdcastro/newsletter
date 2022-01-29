import Image from 'next/image'
import styles from './Pfp.module.css'

export const Pfp = () => (
<svg className={styles.svg} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="img" patternUnits="userSpaceOnUse" width="100" height="100">
      <image xlinkHref="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" x="-25" width="150" height="100" />
    </pattern>
  </defs>
  <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)"/>
</svg>
)
export default Pfp
