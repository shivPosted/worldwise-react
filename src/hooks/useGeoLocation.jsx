import { useState } from "react";

export function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      alert("your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setPosition([lat, lng]);
        setIsLoading(false);
      },
      () => {
        alert("you denied the loaction permission");
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, getPosition };
}
