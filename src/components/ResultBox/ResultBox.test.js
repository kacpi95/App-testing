import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox to='USD' from='PLN' amount={1} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);

    const container = screen.getByTestId('container');

    expect(container).toHaveTextContent('PLN 100.00 = $28.57');
  });
  it('should work for multiple test', () => {
    const testCases = [
      { amount: 10, expected: 'PLN 10.00 = $2.86' },
      { amount: 13, expected: 'PLN 13.00 = $3.71' },
      { amount: 233, expected: 'PLN 233.00 = $66.57' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from='PLN' to='USD' amount={testObj.amount} />);

      const container = screen.getByTestId('container');

      expect(container).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });
  it('should render proper info about conversion when USD -> PLN', () => {
    render(<ResultBox from='USD' to='PLN' amount={100} />);

    const container = screen.getByTestId('container');

    expect(container).toHaveTextContent('$100.00 = PLN 350.00');
  });
  it('should work for multiple test USD -> PLN', () => {
    const testCase = [
      { amount: 10, expected: '$10.00 = PLN 35.00' },
      { amount: 20, expected: '$20.00 = PLN 70.00' },
      { amount: 50, expected: '$50.00 = PLN 175.00' },
    ];

    for (const testOb of testCase) {
      render(<ResultBox from='USD' to='PLN' amount={testOb.amount} />);

      const container = screen.getByTestId('container');

      expect(container).toHaveTextContent(testOb.expected);
      cleanup();
    }
  });
  it('should return the same value', () => {
    const testCases = [
      { amount: 10, rate: 'PLN', expected: 'PLN 10.00 = PLN 10.00' },
      { amount: 100, rate: 'USD', expected: '$100.00 = $100.00' },
    ];
    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.rate}
          to={testObj.rate}
          amount={testObj.amount}
        />
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });
  it('should not render anything', () => {
    render(<ResultBox from='PLN' to='USD' amount={-1} />);
    const containerError = screen.getByTestId('containerError');
    expect(containerError).toHaveTextContent('Error value');
  });
});
