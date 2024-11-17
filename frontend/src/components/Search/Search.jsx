import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookType } from "../../slices/bookTypeSlice";
import { setSource } from "../../slices/SourceSlice";
import { setDestination } from "../../slices/destinationSlice";
import { setDate } from "../../slices/dateSlice";
import { Plane, Bus, MapPin, Calendar } from "lucide-react";
import "./Search.css";

const Search = () => {
  const bookType = useSelector((state) => state.bookType.bookType);
  const source = useSelector((state) => state.source.source);
  const destination = useSelector((state) => state.destination.destination);
  const date = useSelector((state) => state.date.date);

  const dispatch = useDispatch();
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      console.log({
        title: 'Missing Information',
        description: 'Please fill in all fields before searching.',
        variant: 'destructive',
      });
      return;
    }
    console.log({
      title: 'Search Submitted',
      description: `Searching for ${travelType} from ${from} to ${to} on ${date}`,
    });
  };

  const handleBookTypeChange = (e) => {
    dispatch(setBookType(e.target.value));
  };

  const handleSourceChange = (e) => {
    dispatch(setSource(e.target.value));
    setFromSuggestions(value.length > 1 ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleDestinationChange = (e) => {
    dispatch(setDestination(e.target.value));
    setToSuggestions(value.length > 1 ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleDateChange = (e) => {
    dispatch(setDate(e.target.value));
  };

  // const handleFromChange = (e) => {
  //   const value = e.target.value;
  //   setFrom(value);
  //   setFromSuggestions(value.length > 1 ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []);
  // };

  // const handleToChange = (e) => {
  //   const value = e.target.value;
  //   setTo(value);
  //   setToSuggestions(value.length > 1 ? cities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []);
  // };

  // const handleDateChange = (e) => {
  //   const numericValue = e.target.value.replace(/\D/g, '');
  //   if (numericValue.length <= 8) {
  //     setDate(
  //       numericValue
  //         .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
  //         .replace(/(\d{2})(\d{2})/, '$1/$2')
  //         .replace(/(\d{2})/, '$1/')
  //     );
  //   }
  // };

  return (
    <div className="container">
      <div className="search-box">
        <h1 className="title">Travel Search</h1>
        <form onSubmit={handleSearch}>

          {/* travel type */}
          <div className="travel-type">
            <div className="type-option">
              <input
                type="radio"
                id="flight"
                name="travelType"
                value="flight"
                checked={bookType === "flight"}
                onChange={handleBookTypeChange}
                aria-label="Flight"
              />
              <label htmlFor="flight">
                <Plane />
                Flight
              </label>
            </div>

            <div className="type-option">
              <input
                type="radio"
                id="bus"
                name="travelType"
                value="bus"
                checked={bookType === "bus"}
                onChange={handleBookTypeChange}
                aria-label="Bus"
              />
              <label htmlFor="bus">
                <Bus />
                Bus
              </label>
            </div>
          </div>

          {/* From and To input fields */}
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="from">From</label>
              <input
                type="text"
                id="from"
                value={source}
                onChange={handleSourceChange}
                placeholder="Enter departure city"
                aria-label="From city"
              />
              <MapPin />
              {fromSuggestions.length > 0 && (
                <ul>
                  {fromSuggestions.map((city, index) => (
                    <li key={index} onClick={() => { setFrom(city); setFromSuggestions([]); }}>{city}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="input-field">
              <label htmlFor="to">To</label>
              <input
                type="text"
                id="to"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter destination city"
                aria-label="To city"
              />
              <MapPin />
              {toSuggestions.length > 0 && (
                <ul>
                  {toSuggestions.map((city, index) => (
                    <li key={index} onClick={() => { setTo(city); setToSuggestions([]); }}>{city}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Date input field */}
          <div className="input-field">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={handleDateChange}
              placeholder="MM/DD/YYYY"
              aria-label="Travel date"
            />
            <Calendar />
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            Search
          </button>

        </form>
      </div>
    </div>
  );
};

export default Search;
