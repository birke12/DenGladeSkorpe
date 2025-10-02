import { useState } from "react";
import styles from "./login.module.css";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { setEmail, setPassword, error, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <h3>Login for at få adgang</h3>
      <form onSubmit={signIn} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
            <label className={styles.showPasswordLabel}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              Vis kodeord
            </label>
        </div>
        <button className={styles.button} type="submit">
          Log ind
        </button>
      </form>
    </div>
  );
};

export default Login;
