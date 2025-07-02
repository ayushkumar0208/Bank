export interface Customer {
  ssnId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  address: string | undefined;
  contactNumber: string | undefined;
  accountNumber: number | undefined;
  panNumber: string | undefined;
  cardNumber: string | undefined;
  dob: string | undefined; // ISO string date or could use Date type depending on usage
  gender: string | undefined;
  maritalStatus: string | undefined;
}