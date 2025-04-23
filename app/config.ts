
// Get the correct API URL based on platform and environment
const getApiBaseUrl = () => {

  return 'http://localhost:8000/api' // Replace with your actual API URL
  // if (isDev) {
  //   // Development environment - use localhost for all platforms
  //   // This works because we're allowing all origins in dev mode
  //   return 'http://localhost:3000/api';
  // }
  // // Production environment
  // return 'https://your-production-api.com/api';
};

export const config = {
  apiBaseUrl: getApiBaseUrl(),

}; 