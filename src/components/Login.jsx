import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "./PageNav";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
  const [email, setEmail] = useState("shiv@example.com");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, isAuthorized, isError, errorMessage } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthorized) navigate("/app");
  }, [isAuthorized, navigate]);

  return (
    <main className={styles.login}>
      {isError && <ErrorMessage message={errorMessage} />}
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
