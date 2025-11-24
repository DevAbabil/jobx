import colors from 'colors';
import ora, { type Ora } from 'ora';

class Logger {
  private spinner: Ora;

  constructor() {
    this.spinner = ora({
      spinner: 'dots',
      color: 'yellow',
    });
  }

  start = (message: string) => {
    this.spinner.start(`  ${colors.bold('[LOADING]').red} : ${message}`);
  };

  info = (message: string) => {
    this.spinner.stopAndPersist({
      symbol: '',
      text: `ℹ️   ${colors.blue('[INFO]')}    : ${message}`,
    });
  };

  success = (message: string) => {
    this.spinner.stopAndPersist({
      symbol: '',
      text: `✅  ${colors.green('[SUCCESS]')} : ${message}`,
    });
  };

  warning = (message: string) => {
    this.spinner.stopAndPersist({
      symbol: '',
      text: `⚠️   ${colors.yellow('[WARNING]')} : ${message}`,
    });
  };

  error = (message: string) => {
    this.spinner.stopAndPersist({
      symbol: '',
      text: `❌  ${colors.red('[ERROR]')}   : ${message}`,
    });
    process.exit(1);
  };

  appreciation = () => {
    this.spinner.stopAndPersist({
      symbol: '',
      text: `\n🎉 Dear friends! 🎉\nIf you found this helpful, a ⭐ STAR ⭐ would be ${colors.bold(
        'GREATLY APPRECIATED'
      )}! 🥰 \n━━\x1b]8;;https://github.com/DevAbabil/jobx\x07🚀 ${colors.bold(
        'STAR ON GITHUB'
      )} 🚀\x1b]8;;\x07━━\n`,
    });
  };
}

export const logger = new Logger();
