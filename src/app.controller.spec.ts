import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const helloWorldText = 'Hello World';
  const mockAppService = { getHello: jest.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(mockAppService, 'getHello').mockReturnValue(helloWorldText);

      expect(appController.getHello()).toBe(helloWorldText);
      expect(mockAppService.getHello).toHaveBeenCalled();
    });
  });
});
