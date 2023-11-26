/** @type {import('next').NextConfig} */
const nextConfig = {
	 // Other Nuxt.js configuration...

  modules: [
    '@nuxtjs/axios',
    // Other modules...
  ],

  axios: {
    // Axios options here
    // For example:
    baseURL: 'https://jaliscomls.com' // Set your base URL
  },

  // Other Nuxt.js configuration...
	
};

module.exports = nextConfig;
