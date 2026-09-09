'use client'

import { InputHTMLAttributes, useState } from 'react';
import styles from './SearchInput.module.css';
import { Icon } from '../Icon/Icon';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const SearchInput = ({ label, error, className, ...props }: SearchInputProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={`${styles.container} ${error ? styles.error : ''} ${props.disabled ? styles.disabled : ''} ${className || ''}`}>
      
			<Icon name="search-outline" size={20} className={styles.searchIcon} />

      <input
        className={`${styles.input} ${isClicked ? styles.clicked : ''}`}
        onMouseDown={() => setIsClicked(true)}
        onBlur={(e) => {
          setIsClicked(false);
          if (props.onBlur) props.onBlur(e);
        }}
        {...props}
      />

      {error && (
        <p className={styles.errorText}>{error}</p>
      )}
    </div>
  );
};