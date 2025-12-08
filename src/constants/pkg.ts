interface PackageJson {
  name: string;
  version: string;
  description: string;
}

const pkg: PackageJson = {
  name: 'jobx',
  version: '1.2.1',
  description:
    'AI-powered CLI tool to automate job applications, generate personalized emails, and track applications using Google Sheets.',
};

export default pkg;
