import { Icon } from '../Icon/Icon';
import styles from './Sidebar.module.css';

const mainNavItems = [
  { label: 'Feed', iconName: 'home-outline' },
  { label: 'Create', iconName: 'plus-square-outline' },
  { label: 'My Profile', iconName: 'person-outline' },
  { label: 'Messenger', iconName: 'message-circle-outline' },
  { label: 'Search', iconName: 'search-outline' },
];

const secondaryNavItems = [
  { label: 'Statistics', iconName: 'trending-up-outline' },
  { label: 'Favorites', iconName: 'bookmark-outline' },
];

export const Sidebar = () => {

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {mainNavItems.map((item) => (
          <button key={item.label}  className={`${styles.navItem}`}>
            <Icon name={item.iconName} size={24} />
            <span>{item.label}</span>
          </button>
        ))}

        <div className={styles.separatorBlock}>
          {secondaryNavItems.map((item) => (
            <button key={item.label}  className={`${styles.navItem}`}>
              <Icon name={item.iconName} size={24} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.bottomSection}>
        <button className={styles.navItem} >
          <Icon name="log-out-outline" size={24} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};