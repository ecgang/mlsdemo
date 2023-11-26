"use client"
import React, { useEffect, useState } from "react";
import fetchListings from "@/data/listings"; // Import the fetchListings function

const PropertyDetails = () => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsData = await fetchListings();
        // Choose a specific listing or handle it based on your requirements
        const selectedListing = listingsData[0];
        setListing(selectedListing);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);

  if (!listing) {
    // Handle loading state, e.g., display a loading spinner
    return <div>Loading...</div>;
  }

  // Create an array of property details based on the listing data
  const propertyDetails = [
    {
      label: "Property ID",
      value: listing.id,
    },
    {
      label: "Price",
      value: listing.price,
    },
    {
      label: "Property Size",
      value: `${listing.sqft} Sq Ft`,
    },
    {
      label: "Bathrooms",
      value: listing.bath,
    },
    {
      label: "Bedrooms",
      value: listing.bed,
    },
    {
      label: "Garage",
      value: listing.garage,
    },
    {
      label: "Garage Size",
      value: `${listing.garageSize} SqFt`,
    },
    {
      label: "Year Built",
      value: listing.yearBuilding,
    },
    {
      label: "Property Type",
      value: listing.propertyType,
    },
    {
      label: "Property Status",
      value: listing.forRent ? "For Rent" : "For Sale",
    },
  ];

  return (
    <div className="row">
      {propertyDetails.map((detail, index) => (
        <div key={index} className="col-md-6 col-xl-4">
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">{detail.label}</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{detail.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
