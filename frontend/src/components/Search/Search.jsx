import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookType } from "../../slices/bookTypeSlice";
import { setSource } from "../../slices/SourceSlice";
import { setDestination } from "../../slices/destinationSlice";
import { setDate } from "../../slices/dateSlice";
import { Plane, Bus, MapPin, Calendar } from "lucide-react";
import InputMask from "react-input-mask"; // Install using npm install react-input-mask
import "./Search.css";

const COUNTRIES = [
  "Pakistan",
  "Canada",
  "UK",
  "India",
  "Turkey",
  "Indonesia",
  "Australia",
];
const CITIES = ["Islamabad", "Karachi", "Lahore", "Multan", "Murree"];

const Search = ({ setActiveStep }) => {
  const bookType = useSelector((state) => state.bookType.bookType);
  const source = useSelector((state) => state.source.source);
  const destination = useSelector((state) => state.destination.destination);
  const date = useSelector((state) => state.date.date);

  const dispatch = useDispatch();

  const getOptions = () => (bookType === "flight" ? COUNTRIES : CITIES);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination || !date) {
      console.log({
        title: "Missing Information",
        description: "Please fill in all fields before searching.",
        variant: "destructive",
      });
      return;
    }
    console.log({
      title: "Search Submitted",
      description: `Searching for ${bookType} from ${source} to ${destination} on ${date}`,
    });
    setActiveStep(2); // Move to step 2 (Listing)
  };

  const handleBookTypeChange = (e) => {
    dispatch(setBookType(e.target.value));
    dispatch(setSource(""));
    dispatch(setDestination(""));
  };

  const handleSourceChange = (e) => {
    dispatch(setSource(e.target.value));
  };

  const handleDestinationChange = (e) => {
    dispatch(setDestination(e.target.value));
  };

  const handleDateChange = (e) => {
    dispatch(setDate(e.target.value));
  };

  return (
    <div className="container">
      <div className="search-box">
        <h1 className="title">Travel Search</h1>
        <form onSubmit={handleSearch}>
          {/* Travel type */}
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

          {/* Source dropdown */}
          <div className="input-field">
            <label htmlFor="source">From</label>
            <select
              id="source"
              value={source}
              onChange={handleSourceChange}
              aria-label="Source"
            >
              <option value="">Select Source</option>
              {getOptions().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <MapPin />
          </div>

          {/* Destination dropdown */}
          <div className="input-field">
            <label htmlFor="destination">To</label>
            <select
              id="destination"
              value={destination}
              onChange={handleDestinationChange}
              aria-label="Destination"
            >
              <option value="">Select Destination</option>
              {getOptions().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <MapPin />
          </div>

          {/* Date input with masking */}
          <div className="input-field">
            <label htmlFor="date">Date</label>
            <InputMask
              mask="99/99/9999"
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
