import { useState, useEffect } from "react";
import FloodMap from "../components/dashboard/FloodMap";
import DummyCharts from "../components/dashboard/DummyCharts";
import SearchPanel from "../components/dashboard/SearchPanel";
import InfoSidebar from "../components/dashboard/InfoSidebar";
import { queryAllCountries } from "../utils/mapHelpers";
import "./Analyze.css";

function Analyze() {
  const [dataLayer, setDataLayer] = useState(null);
  const [mapView, setMapView] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2022);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  // Load all countries when the map is ready
  useEffect(() => {
    if (dataLayer && mapView) {
      const loadCountries = async () => {
        setIsLoadingCountries(true);
        try {
          const allCountries = await queryAllCountries(dataLayer);
          setCountries(allCountries);
        } catch (error) {
          console.error("Error loading countries:", error);
        } finally {
          setIsLoadingCountries(false);
        }
      };
      loadCountries();
    }
  }, [dataLayer, mapView]);

  return (
    <div className="analyze-page">
      <div className="dashboard-container">
        {/* Left Sidebar - Info & Stats */}
        <div className="left-sidebar-section">
          <InfoSidebar />
        </div>

        {/* Main Map Area */}
        <div className="map-section">
          <FloodMap
            onMapReady={(layer, view) => {
              setDataLayer(layer);
              setMapView(view);
            }}
            selectedYear={selectedYear}
          />
        </div>

        {/* Right Sidebar - Search & Controls */}
        <div className="right-sidebar-section">
          <SearchPanel
            dataLayer={dataLayer}
            mapView={mapView}
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            isLoadingCountries={isLoadingCountries}
          />
        </div>

        {/* Bottom Charts Section */}
        <div className="charts-section">
          <DummyCharts />
        </div>
      </div>
    </div>
  );
}

export default Analyze;
