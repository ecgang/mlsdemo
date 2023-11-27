import axios from 'axios';

async function fetchListings(id = null) {
  const token = 'YeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MDA3MDUxNDQsImV4cCI6MTcwMzI5NzE0NCwiaXNzIjoiaHR0cHM6Ly9qYWxpc2NvbWxzLmNvbSIsImF1ZCI6Imh0dHBzOi8vamFsaXNjb21scy5jb20iLCJpYXQiOjE3MDA3MDUxNDQsImNsaWVudF9pZCI6IldQTF8yMDIzMTEyMzAxNTkyMmU5M0dpVjdrdzdJQ2FHbzZLZFdSdFJrREFFNGhYMiIsInNjb3BlIjoiYXBpIn0.kCdEiV_VRQC7ESX8MhjLtWi7gBZ0HS-dI12u8b3ID0E'; // Replace with your actual token
  let apiUrl = 'api/odata/Property'; // Base API URL for fetching all listings

  // If an ID is provided, modify the API URL to fetch a specific listing
  if (id) {
    apiUrl += `/${id}`; // Adjust this based on how your API handles fetching a single item
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Raw API Response:", response.data); // Log the raw response

    // Process the response based on whether a single item or all items are fetched
    if (id) {
      // Assuming the API returns the single item directly
      const property = response.data;
      return transformPropertyData(property);
    } else if (Array.isArray(response.data.value)) {
      return response.data.value.map(transformPropertyData);
    } else {
      console.error('Received data is not in the expected format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

// Helper function to transform property data
function transformPropertyData(property) {
  const idMatch = property['@odata.id'].match(/'(\d+)'/);
  const propertyId = idMatch ? idMatch[1] : null;
  const formattedPrice = `$${property.ListPrice.toLocaleString()}`;


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
    price: formattedPrice,
    forRent: property.ListingType === "For Sale", // Adjust according to your data
    propertyType: property.PropertyType || "Unknown",
    yearBuilding: property.YearBuilt,
    featured: false, // Set default or adjust as needed
    lat: property.Latitude,
    long: property.Longitude,
    tags: ["house"], // Default tags, adjust as needed
    features: ["Air Conditioning", "Lawn"], // Default features, adjust as needed
    // ... other transformations
  };
}

export default fetchListings;




