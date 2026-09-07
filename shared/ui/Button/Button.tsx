'use client'

import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string; 
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
};

export const Button = ({
  title,
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
      {...props}
    >
      {title}
    </button>
  );
};