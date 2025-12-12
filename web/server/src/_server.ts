import { createServer, type Server } from 'node:http';
import mongoose from 'mongoose';
import app from '@/_app';
import { ENV } from '@/config';

class DevAbabilServer {
  protected server: Server;

  constructor() {
    this.server = createServer(app);

    this.server.on('error', (err) => {
      console.error('Server error:', err);
      this.cleanupAndExit(1);
    });
  }

  init = async () => {
    return new Promise<void>((resolve) => {
      this.server.listen(ENV.PORT, () => {
        console.log(`Server listening at: http://localhost:${ENV.PORT}`);
        resolve();
      });
    });
  };

  shutdown = async () => {
    try {
      if (this.server.listening) {
        await new Promise<void>((resolve, reject) => {
          this.server.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log('Server has been closed');
      }
    } catch (error) {
      console.error('Error during shutdown:', error);
      this.cleanupAndExit(1);
    } finally {
      await mongoose.disconnect();
      process.exit(0);
    }
  };

  private cleanupAndExit = async (code: number) => {
    try {
      if (this.server.listening) {
        await new Promise<void>((resolve) =>
          this.server.close(() => resolve())
        );
      }
    } finally {
      await mongoose.disconnect();
      process.exit(code);
    }
  };
}

export default DevAbabilServer;
