import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, firstValueFrom, interval, map } from 'rxjs';

type Options = Record<string, string>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // 1. set change detection strategy to OnPush
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly a$ = new BehaviorSubject<number>(1);
  readonly b$ = new BehaviorSubject<number>(2);
  readonly sum$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));

  async incA() {
    // only increment A if A + B is less than 10

    const sum = await firstValueFrom(this.sum$);
    // Issues with the above code:
    // 1. It will only get the current value of sum$ at the time of the call, and will not react to future changes.
    // 2. It will not trigger change detection if the value of sum$ changes after the call.
    if (sum < 10) {
      this.a$.next(this.a$.value + 1);
    }
  }

  readonly options$ = new BehaviorSubject<Options>({'r': 'Red', 'g': 'Green', 'b': 'Blue'});
  readonly selectedKey$ = new BehaviorSubject<string>('b');

  readonly selectedValue$ = combineLatest([this.options$, this.selectedKey$]).pipe(
    debounceTime(0),
    map(([options, key]) => options[key]), 
  );

  switchOptions() {
    this.options$.next({'m': 'Magenta', 'y': 'Yellow', 'c': 'Cyan'});
    this.selectedKey$.next('c');
  }

  constructor() {
    this.selectedValue$.subscribe(console.log);
  }


  // readonly counter$ = interval(1000);


  // calculatedValue() {
  //   console.log('calculatedValue() called');
  //   return 42;
  // }
  // // 2. Remove the counter property and the constructor
  // // counter = 0;

  // constructor() {
  //   // this.counter$.subscribe((value) => {
  //   //   this.counter = value;
  //   // });
  // }

  // 3. In the html, bind directly to the counter$ observable using the async pipe
}
