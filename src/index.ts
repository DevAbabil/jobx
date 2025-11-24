import jobApplication from './api/google_spreadsheets_api';

(async () => {
  const result = await jobApplication.find();

  console.log(result);
})();
