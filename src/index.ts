import jobApplication from '@/api/google-spreadsheets-api';

(async () => {
  const result = await jobApplication.find();

  console.log(result);
})();
