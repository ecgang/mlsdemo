import axios from 'axios';

async function fetchListings() {
  try {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MDA3MDUxNDQsImV4cCI6MTcwMzI5NzE0NCwiaXNzIjoiaHR0cHM6Ly9qYWxpc2NvbWxzLmNvbSIsImF1ZCI6Imh0dHBzOi8vamFsaXNjb21scy5jb20iLCJpYXQiOjE3MDA3MDUxNDQsImNsaWVudF9pZCI6IldQTF8yMDIzMTEyMzAxNTkyMmU5M0dpVjdrdzdJQ2ZHbzZLZFdSdFJrREFFNGhYMiIsInNjb3BlIjoiYXBpIn0.kCdEiV_VRQC7ESX8MhjLtWi7gBZ0HS-dI12u8b3ID0E'; // Replace with your actual token

    const response = await axios.get('/odata/Property', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Raw API Response:", response.data); // Log the raw response

    // Check if response.data.value is an array before mapping
    if (Array.isArray(response.data.value)) {
      const transformedData = response.data.value.map(property => {
        // Map each property to the structure you need
        return {
          id: property.ListingId, // or any other unique identifier
          title: property.PropertyTitle,
          city: property.City,
          price: property.ListPrice,
          bedrooms: property.BedroomsTotal,
          bathrooms: property.BathroomsFull,
          squareFootage: property.SquareFootage,
          // ... other properties as needed
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