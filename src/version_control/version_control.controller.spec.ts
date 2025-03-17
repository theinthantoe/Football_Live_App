import { Test, TestingModule } from '@nestjs/testing';
import { VersionControlController } from './version_control.controller';
import { VersionControlService } from './version_control.service';

describe('VersionControlController', () => {
  let controller: VersionControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionControlController],
      providers: [VersionControlService],
    }).compile();

    controller = module.get<VersionControlController>(VersionControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
