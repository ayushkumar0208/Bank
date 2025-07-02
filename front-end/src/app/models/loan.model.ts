export interface Loan {
  ssnid: string;
  fullName: string;
  email: string;
  mobile: string;
  loanType: string;
  amount: number;
  tenure: number;
  approved: boolean;
}