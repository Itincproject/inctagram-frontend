'use client'

import { TextareaHTMLAttributes, useState } from 'react';
import styles from './TextArea.module.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  placeholder?: string; 
};

export const TextArea = ({ label, error, placeholder = '', className, disabled, ...props }: TextareaProps) => {
  const [isClicked, setIsClicked] = useState(false);

	return (
    <div className={`${styles.container} ${error ? styles.error : ''} ${className || ''}`}>
      
      {label && (
        <label className={`${styles.label} ${disabled ? styles.labelDisabled : ''}`} htmlFor={props.id}>
          {label}
        </label>
      )}

      <textarea
        className={`${styles.textarea} ${isClicked ? styles.clicked : ''}`}
        placeholder={placeholder}
        onMouseDown={() => setIsClicked(true)}
				disabled={disabled} 
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
