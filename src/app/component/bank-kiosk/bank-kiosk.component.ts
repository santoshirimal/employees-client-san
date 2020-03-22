import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bank-account.services';

@Component({
  selector: 'app-bank-kiosk',
  templateUrl: './bank-kiosk.component.html',
  styleUrls: ['./bank-kiosk.component.css']
})
export class BankKioskComponent implements OnInit {


  currentBalance: number;

  constructor(private bankAccount: BankAccountService) { }

  ngOnInit(): void {
    this.currentBalance = this.bankAccount.getBalance();
  }
  deposit(amountEL: HTMLInputElement) {
    this.bankAccount.deposit(amountEL.valueAsNumber);
    this.currentBalance = this.bankAccount.getBalance();
  }
  withdraw(amountEL: HTMLInputElement) {
    this.bankAccount.withdraw(amountEL.valueAsNumber);
    this.currentBalance = this.bankAccount.getBalance();
  }
  doTransaction(op: Action<number>, amount: number) {
    op(amount);
    this.currentBalance = this.bankAccount.getBalance();
  }

}
type Action<T> = (amount: T) => void;
