import { Apollo } from "apollo-angular";
import { Observable, of } from "rxjs";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FrontPageService } from "../front-page.service";
import { FrontPageComponent } from "./front-page.component";

class MockFrontPageService {
  getNewsItems(): Observable<any> {
    return of({ news: "" });
  }
  //@@PDC-5628 
  getReleaseItems(): Observable<any> {
    return of({ releases: "" });
  }

  getTissueSites(): Observable<any> {
    return of({ uiTissueSiteCaseCount: [] });
  }

  getDiseases(): Observable<any> {
    return of([]);
  }
}

describe("FrontPageComponent", () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;
  let service: FrontPageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FrontPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Apollo, useValue: {} },
        { provide: FrontPageService, useClass: MockFrontPageService }
      ]
    });

    TestBed.overrideComponent(FrontPageComponent, {
      set: {
        providers: [
          { provide: FrontPageService, useClass: MockFrontPageService }
        ]
      }
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(FrontPageService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
