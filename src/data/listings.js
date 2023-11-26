import axios from 'axios';

async function fetchListings() {
  try {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MDA3MDUxNDQsImV4cCI6MTcwMzI5NzE0NCwiaXNzIjoiaHR0cHM6Ly9qYWxpc2NvbWxzLmNvbSIsImF1ZCI6Imh0dHBzOi8vamFsaXNjb21scy5jb20iLCJpYXQiOjE3MDA3MDUxNDQsImNsaWVudF9pZCI6IldQTF8yMDIzMTEyMzAxNTkyMmU5M0dpVjdrdzdJQ2ZHbzZLZFdSdFJrREFFNGhYMiIsInNjb3BlIjoiYXBpIn0.kCdEiV_VRQC7ESX8MhjLtWi7gBZ0HS-dI12u8b3ID0E'; // Replace with your actual token
    const apiUrl = '/api/odata/Property';

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Raw API Response:", response.data); // Log the raw response

    if (Array.isArray(response.data.value)) {
      const transformedData = response.data.value.map((property, index) => {
        return {
          id: index + 1, // Assuming you want to start IDs from 1
          image: "/images/listings/default.jpg", // Default image path, replace as needed
          title: property.PropertyTitle || "Unknown Title",
          city: property.City || "Unknown City",
          location: `${property.City}, ${property.StateOrProvince}, ${property.Country}`,
          bed: property.BedroomsTotal.toString(),
          bath: property.BathroomsFull.toString(),
          sqft: property.SquareFootage,
          price: `$${property.ListPrice}`,
          forRent: property.ListingType === "For Rent", // Adjust according to your data
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

export default fetchListings;