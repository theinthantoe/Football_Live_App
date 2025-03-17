import { Test, TestingModule } from '@nestjs/testing';
import { VersionControlService } from './version_control.service';
import { DatabaseService } from '../database/database.service'; // Ensure this import is correct
import { Prisma } from '@prisma/client';
import { CreateVersionControlDto } from 'src/version_control/dto/create-version_control.dto';

// Mock Database Service
const mockDatabaseService = {
  versionControl: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('VersionControlService', () => {
  let service: VersionControlService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VersionControlService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<VersionControlService>(VersionControlService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ✅ Test for `create`
  it('should create a version control entry', async () => {
    const inputDto = {
      ios: {
        title: 'iOS Update',
        version: '1.0.2',
        appStoreLink: 'https://apps.apple.com/example',
      },
      android: {
        title: 'Android Update',
        version: '1.0.2',
        playStoreLink: 'https://play.google.com/example',
      },
    };

    const createdData = { id: '12345', ...inputDto };
    mockDatabaseService.versionControl.create.mockResolvedValue(createdData);

    const result = await service.create(inputDto);
    expect(result).toEqual(createdData);
    expect(mockDatabaseService.versionControl.create).toHaveBeenCalledWith({
      data: inputDto,
    });
  });

  // ✅ Test for `findAll`
  it('should return all version control entries', async () => {
    const mockData = [
      { id: '1', ios: {}, android: {} },
      { id: '2', ios: {}, android: {} },
    ];
    mockDatabaseService.versionControl.findMany.mockResolvedValue(mockData);

    const result = await service.findAll();
    expect(result).toEqual(mockData);
    expect(mockDatabaseService.versionControl.findMany).toHaveBeenCalled();
  });

  // ✅ Test for `findOne`
  it('should return a single version control entry by ID', async () => {
    const mockData = { id: '1', ios: {}, android: {} };
    mockDatabaseService.versionControl.findUnique.mockResolvedValue(mockData);

    const result = await service.findOne('1');
    expect(result).toEqual(mockData);
    expect(mockDatabaseService.versionControl.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  // ✅ Test for `update`
  it('should update a version control entry', async () => {
    const updateDto: Partial<CreateVersionControlDto> = {
      ios: {
        title: 'Updated iOS Title',
        version: '1.0.3',
        appStoreLink: 'https://apps.apple.com/updated-link',
      },
    };

    const updatedData = {
      id: '1',
      ios: updateDto.ios,
      android: {},
    };

    // Mock the Prisma update method to return the updated data
    mockDatabaseService.versionControl.update.mockResolvedValue(updatedData);

    const result = await service.update('1', updateDto); // Pass the DTO here
    expect(result).toEqual(updatedData);
    expect(mockDatabaseService.versionControl.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updateDto, // Pass the correct update data
    });
  });

  // ✅ Test for `remove`
  it('should delete a version control entry', async () => {
    const deletedData = { id: '1' };
    mockDatabaseService.versionControl.delete.mockResolvedValue(deletedData);

    const result = await service.remove('1');
    expect(result).toEqual(deletedData);
    expect(mockDatabaseService.versionControl.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
