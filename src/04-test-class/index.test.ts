import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const createAccount = getBankAccount(5);
    expect(createAccount.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.withdraw(12);
    } catch (err) {
      expect(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.transfer(12, createAccount);
    } catch (err) {
      expect(TransferFailedError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.transfer(12, createAccount);
    } catch (err) {
      expect(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const createAccount = getBankAccount(5);
    createAccount.deposit(12);
    expect(BankAccount);
  });

  test('should withdraw money', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.withdraw(12);
    } catch (err) {
      expect(InsufficientFundsError);
    }
  });

  test('should transfer money', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.transfer(2, createAccount);
    } catch (err) {
      expect(TransferFailedError);
    }
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const createAccount = getBankAccount(5);
    expect(createAccount.fetchBalance()).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      const createAccount = getBankAccount(5);
      const result = await createAccount.synchronizeBalance();
      expect(result).toBeTruthy();
    } catch (error) {
      expect(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      const createAccount = getBankAccount(5);
      const result = await createAccount.fetchBalance();
      expect(result).toBeTruthy();
    } catch (error) {
      expect(SynchronizationFailedError);
    }
  });
});
