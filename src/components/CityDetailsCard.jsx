import { useParams } from "react-router-dom";
import styles from "./CityDetailsCard.module.css";

export default function CityDetailsCard() {
  const { id } = useParams();
  return <div>City{id}</div>;
}
