import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // 8. Set change detection strategy to OnPush
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // 1. replace with a writeable signal with an initial value of 0
  readonly firstNumber = signal(2); 

  // 2. replace with a writeable signal with an initial value of 0
  readonly secondNumber = signal(5);

  // 3. replace with a computed signal that emits the sum of the first and second numbers
  readonly sum = computed(() => this.firstNumber() + this.secondNumber());

  setSecondSignalTo10() {
    // 4. set the second number signal to 10
    this.secondNumber.set(10);
  }

  incrementFirstSignal() {
    // 5. increment the first number signal by 1 but only if it's less than 10
    this.firstNumber.update((value) => (value < 10 ? value + 1 : value));
  }

  incrementBothSignals() {
    // 6. increment both number signals by 1 with a maximum of 10
    this.firstNumber.update((value) => (value < 10 ? value + 1 : value));
    this.secondNumber.update((value) => (value < 10 ? value + 1 : value));
  }


  constructor() {
    // 7. Define an effect that displays both signals to the console whenever any of them changes
    console.log('Effect: firstNumber =', this.firstNumber(), ', secondNumber =', this.secondNumber());
  }
}
