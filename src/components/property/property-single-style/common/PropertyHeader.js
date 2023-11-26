"use client"
import React, { useEffect, useState } from 'react';
import fetchListings from '@/data/listings';

const PropertyHeader = ({ id }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const listingsData = await fetchListings();

      console.log('Received listings data:', listingsData); // Log the received data

      if (Array.isArray(listingsData)) {
        const property = listingsData.find((property) => property.id === id);

        if (property) {
          setPropertyData(property);
        } else {
          setError(`Property with id ${id} not found.`);
        }
      } else {
        setError('Received data is not an array');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Error fetching listings');
    }
  };

  fetchData();
}, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!propertyData) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{propertyData.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {propertyData.location}
            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For {propertyData.forRent ? "rent" : "sale"}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              Built {Number(propertyData.yearBuilding)}{" "}
              
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              8721
            </a>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-bed pe-2 align-text-top" />
              {propertyData.bed} bed
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-shower pe-2 align-text-top" />
              {propertyData.bath} bath
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {propertyData.sqft} sqft
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">{propertyData.price}</h3>
            <p className="text space fz15">
              $
              {(
                Number(propertyData.price.split("$")[1].split(",").join("")) / propertyData.sqft
              ).toFixed(2)}
              /sq ft
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;