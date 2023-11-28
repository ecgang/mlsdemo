import axios from 'axios';

async function fetchListings() {
  try {
    const apiUrl = 'api/odata/Property'; // Update this to your server's endpoint

    const response = await axios.get(apiUrl);

    console.log("Raw API Response:", response.data); // Log the raw response

    if (Array.isArray(response.data.value)) {
      const transformedData = response.data.value.map((property, index) => {
        const idMatch = property['@odata.id'].match(/'(\d+)'/);
        const propertyId = idMatch ? idMatch[1] : null;

        return {
          id: propertyId,
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

// Add a function to filter property data by ID
export async function fetchListingById(id) {
  try {
    const listingsData = await fetchListings();
    const property = listingsData.find(property => property.id === id);

    if (property) {
      return property;
    } else {
      console.error(`Property with id ${id} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching listing by ID:', error);
    return null;
  }
}

export default fetchListings;