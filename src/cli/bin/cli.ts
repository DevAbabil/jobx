import { init } from '@/cli/commands';

(async () => {
  // await Promise.all([await spreadsheets.setHeaders()]);
  // await Promise.all([await email.generate(), await email.submit()]);
  // const answers = await inquirer.prompt([
  //   { type: 'input', name: 'tags', message: 'Enter some value!' },
  // ]);
  // console.log(answers.tags);
  init({
    isReset: false,
    resetFiles: ['jobx.apply.json', 'jobx.config.json', 'jobx.credentials.json', 'jobx.mail.md'],
  });
})();
