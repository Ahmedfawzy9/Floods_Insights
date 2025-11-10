import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  formatPopulation,
  getYearFieldName,
  AVAILABLE_YEARS,
} from "../../utils/formatters";
import { queryCountry, zoomToCountry } from "../../utils/mapHelpers";
import "./SearchPanel.css";

/**
 * SearchPanel Component - Sidebar with search and data display
 * TODO: Adapt for flood data instead of population
 */
function SearchPanel({
  dataLayer,
  mapView,
  countries,
  selectedCountry,
  onCountryChange,
  selectedYear,
  onYearChange,
  worldData,
}) {
  const [countryData, setCountryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const years = AVAILABLE_YEARS.map(String);

  const getPreviousYear = (currentYear) => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex > 0) {
      return years[currentIndex - 1];
    }
    return null;
  };

  const calculateGrowthRate = (currentPop, previousPop) => {
    if (!currentPop || !previousPop || previousPop === 0) return null;
    const rate = ((currentPop - previousPop) / previousPop) * 100;
    return rate.toFixed(2);
  };

  useEffect(() => {
    let isMounted = true;

    if (selectedCountry && dataLayer && mapView) {
      queryCountry(dataLayer, selectedCountry, true)
        .then((results) => {
          if (!isMounted) return;

          if (results.features.length > 0) {
            const feature = results.features[0];
            const attributes = feature.attributes;

            const hasValidData = AVAILABLE_YEARS.some((year) => {
              const fieldName = getYearFieldName(year);
              const value = attributes[fieldName];
              return value && value > 0;
            });

            if (hasValidData) {
              setCountryData(attributes);
              zoomToCountry(mapView, feature.geometry).catch((error) => {
                if (isMounted) {
                  console.error("Error zooming to country:", error);
                }
              });
            } else {
              setCountryData("NO_DATA");
            }
          } else {
            setCountryData("NO_DATA");
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Error querying country:", error);
            setCountryData("NO_DATA");
          }
        });
    } else {
      setCountryData(null);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedCountry, dataLayer, mapView]);

  const handleCountryChange = (e) => {
    onCountryChange(e.target.value);
    setSearchTerm("");
  };

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasNoData = countryData === "NO_DATA";

  const currentYearField = getYearFieldName(selectedYear);
  const previousYear = getPreviousYear(selectedYear);
  const previousYearField = previousYear
    ? getYearFieldName(previousYear)
    : null;

  const displayData =
    selectedCountry && countryData && !hasNoData ? countryData : null;
  const displayName = selectedCountry || "World";

  const currentPopulation = hasNoData
    ? null
    : displayData
    ? displayData[currentYearField]
    : worldData
    ? worldData[selectedYear]
    : null;

  const previousPopulation = hasNoData
    ? null
    : displayData && previousYearField
    ? displayData[previousYearField]
    : worldData && previousYear
    ? worldData[previousYear]
    : null;

  const growthRate = calculateGrowthRate(currentPopulation, previousPopulation);

  return (
    <div className="search-panel">
      <h2 className="panel-title">Flood Data Explorer</h2>

      {/* Year Selector */}
      <div className="control-group">
        <label htmlFor="year-select">Select Year</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="year-select"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Country Search */}
      <div className="control-group">
        <label htmlFor="country-search">Search Country</label>
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            id="country-search"
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Country Selector */}
      <div className="control-group">
        <label htmlFor="country-select">Select Country</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="country-select"
        >
          <option value="">World</option>
          {filteredCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Data Display */}
      {hasNoData && selectedCountry ? (
        <div className="no-data-message">
          <p>No data available for {selectedCountry}</p>
          <p className="no-data-hint">
            This country is not included in our dataset. Please select another
            country.
          </p>
        </div>
      ) : (
        <>
          <div className="info-boxes">
            <div className="info-box">
              <h3>Data {selectedYear}</h3>
              <div className="info-value">
                {currentPopulation
                  ? formatPopulation(currentPopulation)
                  : "Loading..."}
              </div>
              <div className="info-label">{displayName}</div>
            </div>
            <div className="info-box">
              <h3>Growth Rate</h3>
              <div className="info-value">
                {growthRate !== null ? (
                  <span className={growthRate >= 0 ? "positive" : "negative"}>
                    {growthRate >= 0 ? "+" : ""}
                    {growthRate}%
                  </span>
                ) : (
                  "N/A"
                )}
              </div>
              <div className="info-label">
                {previousYear
                  ? `${previousYear} - ${selectedYear}`
                  : "No previous data"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPanel;
