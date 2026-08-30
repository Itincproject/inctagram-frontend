import { Icon } from '@/src/shared/ui/icon/Icon';
import styles from './UserSidebar.module.css';

const mainNavItems = [
  { label: 'Feed', iconName: 'feed' },
  { label: 'Create', iconName: 'create' },
  { label: 'My Profile', iconName: 'profile' },
  { label: 'Messenger', iconName: 'messenger' },
  { label: 'Search', iconName: 'search' },
];

const secondaryNavItems = [
  { label: 'Statistics', iconName: 'statistics' },
  { label: 'Favorites', iconName: 'favorites' },
];

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {mainNavItems.map((item) => (
          <div key={item.label} className={styles.navItem}>
            <Icon name={item.iconName} size={24} />
            <span>{item.label}</span>
          </div>
        ))}

        <div className={styles.separatorBlock}>
          {secondaryNavItems.map((item) => (
            <div key={item.label} className={styles.navItem}>
              <Icon name={item.iconName} size={24} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className={styles.bottomSection}>
        <div className={styles.navItem}>
          <Icon name="logout" size={24} />
          <span>Log Out</span>
        </div>
      </div>
    </aside>
  );
};