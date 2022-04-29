import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItmeDetailComponent } from './itme-detail.component';

describe('ItmeDetailComponent', () => {
  let component: ItmeDetailComponent;
  let fixture: ComponentFixture<ItmeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItmeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItmeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
