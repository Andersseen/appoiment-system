import { expressServer } from './app';

if (require.main === module) {
  const server = new expressServer();
  console.log('Backend is running');

  server.run();
}
