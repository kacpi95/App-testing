import { render, screen } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const action = jest.fn();

    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button

    const submitButton = screen.getByText('Convert');
    const amountField = screen.getByTestId('amount');
    const toField = screen.getByTestId('to');
    const fromField = screen.getByTestId('from');

    // set test values to fields
    userEvent.type(amountField, '100');
    userEvent.selectOptions(fromField, 'PLN');
    userEvent.selectOptions(toField, 'USD');
    userEvent.click(submitButton);

    // check if action callback was called once and with proper argument
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({
      amount: 100,
      from: 'PLN',
      to: 'USD',
    });
  });
  it('should work for multiple test', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const action = jest.fn();
      render(<CurrencyForm action={action} />);

      const button = screen.getByText('Convert');
      const amount = screen.getByTestId('amount');
      const to = screen.getByTestId('to');
      const from = screen.getByTestId('from');

      userEvent.clear(amount);
      userEvent.type(amount, testObj.amount);
      userEvent.selectOptions(from, testObj.from);
      userEvent.selectOptions(to, testObj.to);
      userEvent.click(button);

      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testObj.amount),
        from: testObj.from,
        to: testObj.to,
      });
      cleanup();
    }
  });
});
