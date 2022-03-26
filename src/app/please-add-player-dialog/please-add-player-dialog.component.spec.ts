import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseAddPlayerDialogComponent } from './please-add-player-dialog.component';

describe('PleaseAddPlayerDialogComponent', () => {
  let component: PleaseAddPlayerDialogComponent;
  let fixture: ComponentFixture<PleaseAddPlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseAddPlayerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseAddPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
