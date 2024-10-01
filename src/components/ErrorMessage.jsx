import { useEffect, useState } from "react";
import styles from "./ErrorMessage.module.css";
import { useAuth } from "./AuthContext";

export default function ErrorMessage({ message }) {
  const { handleRemoveError } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      console.log("inside timeout");
      handleRemoveError();
    }, 5000);
  }, [handleRemoveError]);

  return <div className={styles.error}>{message}</div>;
}
