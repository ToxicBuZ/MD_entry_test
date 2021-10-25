import { ForexService } from './forex.service';

describe('ForexService', () => {
  let service: ForexService;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['']);

  beforeEach(() => {
    service = new ForexService(mockHttpService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
