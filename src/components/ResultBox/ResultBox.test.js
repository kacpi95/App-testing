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
});
