import axios from 'axios';

async function fetchListings() {
  try {
    const response = await axios.get('/odata/Property', {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE3MDA3MDUxNDQsImV4cCI6MTcwMzI5NzE0NCwiaXNzIjoiaHR0cHM6Ly9qYWxpc2NvbWxzLmNvbSIsImF1ZCI6Imh0dHBzOi8vamFsaXNjb21scy5jb20iLCJpYXQiOjE3MDA3MDUxNDQsImNsaWVudF9pZCI6IldQTF8yMDIzMTEyMzAxNTkyMmU5M0dpVjdrdzdJQ2ZHbzZLZFdSdFJrREFFNGhYMiIsInNjb3BlIjoiYXBpIn0.kCdEiV_VRQC7ESX8MhjLtWi7gBZ0HS-dI12u8b3ID0E'
      }
    });

    // Transform the response to match the structure of your demo data
    const transformedData = response.data.value.map(item => {
      return {
        id: property.Id,
        title: property.Title,
        city: property.City,
       
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default fetchListings;