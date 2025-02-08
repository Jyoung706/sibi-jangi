import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalingModule } from './signaling/signaling.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [SignalingModule, CacheModule.register({ isGlobal: true, ttl: 0 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
