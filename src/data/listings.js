import axios from 'axios';

async function fetchListings() {
  try {
    const token = 'YeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MDA3MDUxNDQsImV4cCI6MTcwMzI5NzE0NCwiaXNzIjoiaHR0cHM6Ly9qYWxpc2NvbWxzLmNvbSIsImF1ZCI6Imh0dHBzOi8vamFsaXNjb21scy5jb20iLCJpYXQiOjE3MDA3MDUxNDQsImNsaWVudF9pZCI6IldQTF8yMDIzMTEyMzAxNTkyMmU5M0dpVjdrdzdJQ2FHbzZLZFdSdFJrREFFNGhYMiIsInNjb3BlIjoiYXBpIn0.kCdEiV_VRQC7ESX8MhjLtWi7gBZ0HS-dI12u8b3ID0E'; // Replace with your actual token
    const apiUrl = 'api/odata/Property'; // Replace with your API URL

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Raw API Response:", response.data); // Log the raw response

    if (response.data) {
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
          propertyKey: property.PropertyKey
        };
      });

      return transformedData;
    } else {
      console.log(typeof response.data.value);
      console.error('Received data is not an array:', response.data.value);
      return [];
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}


export default fetchListings;

export async function fetchListingById(id) {
  try {
    const listingsData = await fetchListings();
    console.log("Fetched Listings Data:", listingsData);

    // Ensure that id is compared as the same type (string or number)
    // Convert id to the appropriate type if necessary
    const property = listingsData.find(property => property.propertyKey.toString() === id.toString());

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
