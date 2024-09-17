import { useParams, useSearchParams } from "react-router-dom";
import styles from "./CityDetailsCard.module.css";

export default function CityDetailsCard() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <h1>City{id}</h1>
      <p>{searchParams.get("lat")}</p>
      <p>{searchParams.get("lng")}</p>
    </div>
  );
}
