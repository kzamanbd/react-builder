import { bytesToSize } from '../src/utils';

describe('bytesToSize', () => {
  it('should convert bytes to human-readable format', () => {
    expect(bytesToSize(0)).toBe('0 Bytes');
    expect(bytesToSize(1024)).toBe('1 KB');
    expect(bytesToSize(1048576)).toBe('1 MB');
    expect(bytesToSize(1073741824)).toBe('1 GB');
  });
});