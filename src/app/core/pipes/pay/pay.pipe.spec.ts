import { PayPipe } from './pay.pipe';

describe('PayPipe', () => {
  it('create an instance', () => {
    const pipe = new PayPipe();
    expect(pipe).toBeTruthy();
  });
});
