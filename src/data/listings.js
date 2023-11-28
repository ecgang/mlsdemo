import axios from 'axios';

async function fetchListings() {
  try {
    const apiUrl = 'api/odata/Property';
    const response = await axios.get(apiUrl);

    if (response.data && Array.isArray(response.data.value)) {
      const transformedData = response.data.value.map(property => {
        return {
          id: property.ListingKey, // Use ListingKey as the identifier
          image: "/images/listings/default.jpg", // Default image path, replace as needed
          description: property.TextSearch,
          title: property.PropertyTitle || "Unknown Title",
          city: property.City || "Unknown City",
          location: `${property.City}, ${property.StateOrProvince}, ${property.Country}`,
          bed: property.BedroomsTotal.toString(),
          bath: property.BathroomsFull.toString(),
          sqft: property.SquareFootage,
          price: `$${property.ListPrice}`,
          forRent: property.ListingType === "For Sale", // Adjust according to your data
          propertyType: property.PropertyType || "Unknown",
          yearBuilding: property.YearBuilt,
          featured: false, // Set default or adjust as needed
          lat: property.Latitude,
          long: property.Longitude,
          tags: ["house"], // Default tags, adjust as needed
          features: ["Air Conditioning", "Lawn"], // Default features, adjust as needed
        };
      });

      return transformedData;
    } else {
      console.error('Received data is not an array:', response.data.value);
      return [];
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export async function fetchListingById(listingKey) {
  try {
    const listingsData = await fetchListings();
    if (!Array.isArray(listingsData)) {
      console.error('Fetched data is not an array:', listingsData);
      return null;
    }

    const property = listingsData.find(property => property.id.toString() === listingKey.toString());
    if (!property) {
      console.error(`Property with ListingKey ${listingKey} not found.`);
      return null;
    }

    return property;
  } catch (error) {
    console.error('Error fetching listing by ListingKey:', error);
    return null;
  }
}

export default fetchListings;
