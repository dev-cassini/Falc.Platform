import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {RouterModule} from "@angular/router";
import {OidcSecurityServiceStub} from "../../tests/utilities/auth/oidc-security-service-stub";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule],
      providers: [
        {provide: OidcSecurityService, useClass: OidcSecurityServiceStub}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'falc-platform' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('falc-platform');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, falc-platform');
  });
});
