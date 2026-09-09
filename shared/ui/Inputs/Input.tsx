'use client'

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconOnClick?: () => void;
};

export const Input = ({ label, error, icon, iconOnClick, className, placeholder, ...props }: InputProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={`${styles.container} ${error ? styles.error : ''} ${className || ''}`}>
      
      {label && (
        <label className={`${styles.label} ${props.disabled ? styles.labelDisabled : ''}`} htmlFor={props.id}>
          {label}
        </label>
      )}

      {icon && (
        <button
          type="button"
					disabled={props.disabled}
          className={styles.icon}
          onClick={iconOnClick}
        >
          {icon}
        </button>
      )}

      <input
        className={`${styles.input} ${isClicked ? styles.clicked : ''}`}
        placeholder={placeholder}
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
