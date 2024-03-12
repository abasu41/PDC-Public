import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataDictionaryGraphComponent } from './data-dictionary-graph.component';
import { Apollo } from "apollo-angular";
import { Observable, of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DataDictionaryGraphComponent', () => {
  let component: DataDictionaryGraphComponent;
  let fixture: ComponentFixture<DataDictionaryGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDictionaryGraphComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Apollo, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDictionaryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
