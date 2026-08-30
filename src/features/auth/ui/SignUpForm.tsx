'use client'

import { Icon } from '@/src/shared/ui/icon/Icon';
import styles from './SignUpForm.module.css'

export const SignUpForm = () => {

  const handleSubmit = () => {
		alert('Форма отправлена')
  };

  return (
	 <div className={styles.signupCard}>
        
		<h2 className={styles.signupTitle}>Sign Up</h2>

		<div className={styles.socialButtons}>
			<button className={styles.socialBtn} aria-label="Sign up with Google">
				<Icon name='google-logo' size={36}/>
			</button>
			<button className={styles.socialBtn} aria-label="Sign up with GitHub">
				<Icon name='github-logo' size={36}/>
			</button>
		</div>

		<form onSubmit={handleSubmit}>
			
			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Username</label>
				<input
					type="text"
					placeholder="Epam11"
					className={styles.formInput}
				/>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Email</label>
				<input
					type="email"
					placeholder="Epam@epam.com"
					className={styles.formInput}
					autoComplete="email"
				/>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Password</label>
				<div className={styles.passwordWrapper}>
					<input
						type={'password'}
						placeholder="******************"
						className={styles.formInput}
						autoComplete="current-password"
					/>
					<button
						type="button"
						className={styles.togglePassword}
						aria-label="Toggle password visibility"
					>
						<Icon name='eye-closed'/>
					</button>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Password confirmation</label>
				<div className={styles.passwordWrapper}>
					<input
						type={'password'}
						placeholder="******************"
						className={styles.formInput}
						autoComplete="current-password"
					/>
					<button
						type="button"
						className={styles.togglePassword}
						aria-label="Toggle password visibility"
					>
						<Icon name='eye-closed'/>
					</button>
				</div>
			</div>

			<div className={styles.checkboxGroup}>
				<input
					type="checkbox"

					className={styles.customCheckbox}
				/>
				<span className={styles.checkboxText}>
					I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
				</span>
			</div>

			<button type="submit" className={styles.submitBtn}>
				Sign Up
			</button>

		</form>

		<div className={styles.footerSection}>
			<p className={styles.footerText}>Do you have an account?</p>
			<a href="#" className={styles.loginLink}>
				Sign In
			</a>
		</div>
			
		</div>
  );
};