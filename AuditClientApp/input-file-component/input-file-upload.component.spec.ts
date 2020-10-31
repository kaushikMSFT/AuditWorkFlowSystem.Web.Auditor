import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileUpload } from './input-file-upload.component';

describe('InputFileComponentComponent', () => {
  let component: InputFileUpload;
  let fixture: ComponentFixture<InputFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileUpload ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
