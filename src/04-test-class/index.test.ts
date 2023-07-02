import { getBankAccount } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const createAccount = getBankAccount(5);
    expect(createAccount.getBalance()).toBe(5);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 5;
    try {
      const createAccount = getBankAccount(balance);
      createAccount.withdraw(12);
    } catch (err) {
      expect((err as Error).message).toBe(
        `Insufficient funds: cannot withdraw more than ${balance}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.transfer(12, createAccount);
    } catch (err) {
      expect((err as Error).message).toBe('Transfer failed');
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      const createAccount = getBankAccount(5);
      createAccount.transfer(12, createAccount);
    } catch (err) {
      expect((err as Error).message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    const createAccount = getBankAccount(5);
    createAccount.deposit(12);
    expect(createAccount.getBalance()).toBe(17);
  });

  test('should withdraw money', () => {
    const createAccount = getBankAccount(50);
    createAccount.withdraw(12);
    expect(createAccount.getBalance()).toBe(38);
  });

  test('should transfer money', () => {
    const createAccount = getBankAccount(5);
    const newBankAccount = getBankAccount(200);
    createAccount.transfer(2, newBankAccount);
    expect(newBankAccount).toHaveProperty('_balance', 202);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const createAccount = getBankAccount(5);
    expect(createAccount.fetchBalance()).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 5;
    const newBalance = 50;
    const createAccount = getBankAccount(balance);
    try {
      jest
        .spyOn(createAccount, 'fetchBalance')
        .mockResolvedValueOnce(newBalance);
      await createAccount.synchronizeBalance();
      expect(createAccount.getBalance()).toEqual(newBalance);
    } catch (error) {
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 5;
    const createAccount = getBankAccount(balance);
    try {
      await createAccount.synchronizeBalance();
    } catch (error) {
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });
});
