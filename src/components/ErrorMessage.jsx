import { useEffect, useState } from "react";
import styles from "./ErrorMessage.module.css";
import { useAuth } from "./AuthContext";
import { useCitiesContext } from "./CitiesContext";

export default function ErrorMessage({ message }) {
  const { handleRemoveError } = useAuth();
  const { handleRemoveErrorCities } = useCitiesContext();

  useEffect(() => {
    setTimeout(() => {
      console.log("inside timeout");
      handleRemoveError();
    }, 5000);
  }, [handleRemoveError]);

  useEffect(() => {
    setTimeout(() => {
      console.log("inside timeout");
      handleRemoveErrorCities();
    }, 5000);
  }, [handleRemoveErrorCities]);
  return <div className={styles.error}>{message}</div>;
}
