import jobApplication from '@/api/google-spreadsheets-api';

(async () => {
  // const result = await jobApplication.insert({
  //   date: 'Nov 23, 2025, 7:52 AM',
  //   website: 'https://example.com',
  //   contact: 'career@example.com',
  //   position: 'MERN developer',
  //   submission_link: 'null',
  //   job_source: 'https://facebook.com/posts/sdfsdfds',
  //   status: 'pending',
  //   location: 'remote',
  // });

  const result = await jobApplication.delete('bd620ef8-19d');

  console.log(result);
})();
