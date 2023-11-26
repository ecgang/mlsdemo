"use client"
import React, { useEffect, useState } from "react";
import fetchListings from "@/data/listings"; // Import the fetchListings function

const OverView = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsData = await fetchListings();
        const propertyData = listingsData.find((elm) => elm.id == id) || listingsData[0];
        setData(propertyData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [id]);

  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: data ? data.bed : "",
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: data ? data.bath : "",
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: data ? data.yearBuilding : "",
    },
    {
      icon: "flaticon-garage",
      label: "Garage",
      value: "2",
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: data ? data.sqft : "",
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: data ? data.propertyType : "",
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;