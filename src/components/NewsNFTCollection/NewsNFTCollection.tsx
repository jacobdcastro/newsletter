import Image from 'next/image'
import styles from './NewsNFTCollection.module.css'
import { NewsNFT } from '../NewsNFT';

export const NewsNFTCollection = () => (
<div className={styles.nftContainer}>
    <ul>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
        <li className={styles.nftIcon}>
<NewsNFT/>
        </li>
    </ul>

</div>
)
export default NewsNFTCollection;
