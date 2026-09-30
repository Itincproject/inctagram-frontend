import { ForgotPasswordForm } from "@/features/auth/forgot-password/ui/ForgotPasswordForm";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Forgot Password</h3>
      <ForgotPasswordForm />
    </div>
  );
}
