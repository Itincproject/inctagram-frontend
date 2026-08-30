import styles from './Profile.module.css';

export const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img 
            src="https://placehold.co/300x300/333/fff?text=Avatar" 
            alt="Avatar" 
            className={styles.avatar}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h1 className={styles.username}>UserName</h1>
            <button className={styles.settingsBtn}>Profile Settings</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2218</span>
              <span className={styles.statLabel}>Following</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2358</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2764</span>
              <span className={styles.statLabel}>Publications</span>
            </div>
          </div>

          <p className={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.{' '}
            <a href="#" className={styles.bioLink}>
              nisi ut aliquip ex ea commodo consequat.
            </a>
          </p>
        </div>
      </div>

      <div className={styles.gallery}>
        <img src="https://placehold.co/600x600/222/fff?text=Photo+1" alt="Photo 1" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+2" alt="Photo 2" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+3" alt="Photo 3" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+4" alt="Photo 4" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+5" alt="Photo 5" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+6" alt="Photo 6" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+7" alt="Photo 7" className={styles.photo} />
        <img src="https://placehold.co/600x600/222/fff?text=Photo+8" alt="Photo 8" className={styles.photo} />
      </div>
    </div>
  );
};

