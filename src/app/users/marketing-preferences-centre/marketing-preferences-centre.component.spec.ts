import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingPreferencesCentreComponent } from './marketing-preferences-centre.component';

describe('MarketingPreferencesCentreComponent', () => {
  let component: MarketingPreferencesCentreComponent;
  let fixture: ComponentFixture<MarketingPreferencesCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingPreferencesCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingPreferencesCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
