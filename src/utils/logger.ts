import colors from 'colors';
import { createSpinner, type Spinner } from 'nanospinner';

type TMethod = (
  message: string,
  config?: { terminate: boolean; code: 1 | 0 }
) => void;

class Logger {
  private spinner: Spinner;

  constructor() {
    this.spinner = createSpinner();
  }

  start: TMethod = (message, config) => {
    this.spinner.start(message).start();
    if (config?.terminate) process.exit(config.code);
  };

  info: TMethod = (message, config) => {
    this.spinner.info({
      mark: 'ℹ️',
      text: ` ${message}`,
    });
    if (config?.terminate) process.exit(config.code);
  };

  success: TMethod = (message, config) => {
    this.spinner.success({
      mark: '✅',
      text: message,
    });
    if (config?.terminate) process.exit(config.code);
  };

  warn: TMethod = (message, config) => {
    this.spinner.warn({
      mark: '⚠️',
      text: ` ${message}`,
    });
    if (config?.terminate) process.exit(config.code);
  };

  error: TMethod = (message, config) => {
    this.spinner.error({
      mark: '❌',
      text: message,
    });
    if (config?.terminate) process.exit(config.code);
  };

  appreciation = () => {
    this.spinner.success({
      mark: '\n',
      text: `🎉 Dear friends! 🎉\nIf you found this helpful, a ⭐ STAR ⭐ would be ${colors.bold(
        'GREATLY APPRECIATED'
      )}! 🥰 \n━━\x1b]8;;https://github.com/DevAbabil/jobx\x07🚀 ${colors.bold(
        'STAR ON GITHUB'
      )} 🚀\x1b]8;;\x07━━\n\n`,
    });
  };
}

export default new Logger();
