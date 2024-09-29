import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostgresRepositoryService } from './repositories/postgres-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [provideMockStore({})],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.inject(PostgresRepositoryService);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'velaio-interview' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('velaio-interview');
  });

  it(`should render an empty list message`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const emptyListText = fixture.debugElement.query(By.css('app-task-item'))
      .nativeElement.innerText;
    console.log(emptyListText);
    expect(emptyListText).toBeTruthy();
  });
});
