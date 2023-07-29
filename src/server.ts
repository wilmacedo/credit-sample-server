import { app } from '@/app';
import { env } from '@/env';

app.listen(env.PORT, () => {
  console.log(`🚀 HTTP Server Running!`);
  console.log(`🚪 Port in use: ${env.PORT}`);
});
