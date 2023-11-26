'use client';
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import React, { useEffect, useState } from "react"; // Import useState and useEffect from react
import fetchListings from "@/data/listings";

const PropertyGallery = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsData = await fetchListings();
        const propertyData = listingsData.find((elm) => elm.id === id) || listingsData[0];
        setData(propertyData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    // Handle loading state, e.g., display a loading spinner
    return <div>Loading...</div>;
  }

  const images = [
    {
      src: "/images/listings/listing-single-2.jpg",
      alt: "2.jpg",
    },
    {
      src: "/images/listings/listing-single-3.jpg",
      alt: "3.jpg",
    },
    {
      src: "/images/listings/listing-single-4.jpg",
      alt: "4.jpg",
    },
    {
      src: "/images/listings/listing-single-5.jpg",
      alt: "5.jpg",
    },
  ];

  return (
    <>
      <Gallery>
        <div className="col-sm-6">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item
                original={'/images/listings/listing-single-1.jpg'}
                thumbnail={'/images/listings/listing-single-1.jpg'}
                width={610}
                height={510}
              >
                {({ ref, open }) => (
                  <Image
                    src={'/images/listings/listing-single-1.jpg'}
                    width={591}
                    height={558}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6">
          <div className="row">
            {images.map((image, index) => (
              <div className="col-6 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img mb10`}
                  >
                    <Item
                      original={image.src}
                      thumbnail={image.src}
                      width={270}
                      height={250}
                    >
                      {({ ref, open }) => (
                        <Image
                          width={270}
                          height={250}
                          className="w-100 h-100 cover"
                          ref={ref}
                          onClick={open}
                          role="button"
                          src={image.src}
                          alt={image.alt}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gallery>
    </>
  );
};

export default PropertyGallery;