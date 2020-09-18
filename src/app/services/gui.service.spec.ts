import { TestBed } from '@angular/core/testing';

import { GuiService } from './gui.service';

describe('GuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiService = TestBed.get(GuiService);
    expect(service).toBeTruthy();
  });
});
