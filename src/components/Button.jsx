import styles from "./Button.module.css";
export default function Button({ children, type, onclick = () => {} }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onclick}>
      {children}
    </button>
  );
}
