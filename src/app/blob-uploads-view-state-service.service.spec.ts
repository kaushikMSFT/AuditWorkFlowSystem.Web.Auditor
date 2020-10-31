import { TestBed } from '@angular/core/testing';

import { BlobUploadsViewStateServiceService } from './blob-uploads-view-state-service.service';

describe('BlobUploadsViewStateServiceService', () => {
  let service: BlobUploadsViewStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlobUploadsViewStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
