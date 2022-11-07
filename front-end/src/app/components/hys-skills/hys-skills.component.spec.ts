import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HysSkillsComponent } from './hys-skills.component';

describe('HysSkillsComponent', () => {
  let component: HysSkillsComponent;
  let fixture: ComponentFixture<HysSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HysSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HysSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
