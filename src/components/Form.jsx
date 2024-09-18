import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";

export default function Form() {
  const navigate = useNavigate();
  return (
    <form
      action="/none"
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.row}>
        <label htmlFor="cityname">City Name</label>
        <input type="text" id="cityname" />
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you visited?</label>
        <input type="text" id="date" value={new Date().toISOString()} />
      </div>
      <div className={styles.row}>
        <label htmlFor="date">What are your thoughts about the city</label>
        <textarea name="comments" id="" />
      </div>
      <div className={styles.buttons}>
        <Button onclick={() => {}} type="primary">
          Add
        </Button>
        <Button onclick={() => navigate(-1)} type="back">
          &larr; back
        </Button>
      </div>
    </form>
  );
}
