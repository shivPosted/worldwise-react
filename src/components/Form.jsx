import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";

export default function Form() {
  const navigate = useNavigate();
  return (
    <form
      action=""
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.row}>
        <label htmlFor="cityname">City Name</label>
        <input type="text" />
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you visited?</label>
        <input type="text" />
      </div>
      <div className={styles.buttons}>
        <Button onclick={() => {}} type="primary">
          Add
        </Button>
        <Button onclick={() => navigate(-1)} type="back">
          back
        </Button>
      </div>
    </form>
  );
}
