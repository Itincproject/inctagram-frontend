'use client'

import { Icon } from '@/src/shared/ui/icon/Icon';
import styles from './SignInForm.module.css'

export const SignInForm = () => {

  const handleSubmit = () => {
		alert('Форма отправлена')
  };

  return (
		<div className={styles.signinCard}>
			
			<h2 className={styles.signinTitle}>Sign In</h2>

			<div className={styles.socialButtons}>
				<button className={styles.socialBtn} aria-label="Sign in with Google">
					<Icon name='google-logo' size={36}/>
				</button>
				<button className={styles.socialBtn} aria-label="Sign in with GitHub">
					<Icon name='github-logo' size={36}/>
				</button>
			</div>

			<form onSubmit={handleSubmit}>
				
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
							placeholder="**********"
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

				<div className={styles.forgotLinkContainer}>
					<a href="#" className={styles.forgotLink}>
						Forgot Password
					</a>
				</div>

				<button type="submit" className={styles.submitBtn}>
					Sign In
				</button>
			</form>

			<div className={styles.footerSection}>
				<p className={styles.footerText}>Don't have an account?</p>
				<a href="#" className={styles.signupLink}>
					Sign Up
				</a>
			</div>
			
		</div>
  );
};