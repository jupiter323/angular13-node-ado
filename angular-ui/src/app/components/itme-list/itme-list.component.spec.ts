import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItmeListComponent } from './itme-list.component';

describe('ItmeListComponent', () => {
  let component: ItmeListComponent;
  let fixture: ComponentFixture<ItmeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItmeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
