import React, { useState } from "react"
import geocodeService from "./service/geocodeService";

interface Location {
  country: string,
  lat: string,
  lon: string,
  name: string,
  zip: string
}

const LocationData = ({location}: {location: Location | null}) => {
  if (!location) {
    return <p>No location data available</p>
  }

  return (
    <ul>
      <li>Country: {location.country}</li>
      <li>City: {location.name}</li>
    </ul>
  )
}

const App = () => {
  const [zipcode, setZipcode] = useState<string>("");
  const [statecode, setStatecode] = useState<string>("");
  const [location, setLocation] = useState<Location | null>(null);

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value);
  }

  const handleStatecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatecode(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form submitted");
    geocodeService
      .getLocation(zipcode, statecode)
      .then((responseData: Location) => {
        setLocation(responseData);
        console.log(responseData);
      })
      .catch((error: Error) => {
        console.error("Error: ", error);
      });
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        zip<input type="text" value={zipcode} onChange={handleZipChange} />
        <br />
        statecode<input type="text" value={statecode} onChange={handleStatecodeChange} />
        <br />
        <button type="submit">Query</button>
      </form>

      <LocationData location={location} />
    </div>
  )
}

export default App
