import { renderHook, act } from '@testing-library/react';
import { useQuantumRegistry } from '@/hooks/use-quantum-registry';

describe('useQuantumRegistry', () => {
  const mockPatent = {
    id: 'test-id',
    title: 'Test Patent',
    description: 'Test Description',
    creator: 'Test Creator',
    signature: {
      timestamp: Date.now(),
      quantumHash: 'test-hash',
      entanglementProof: 'test-proof'
    },
    quantumState: 'test-state'
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should register a patent successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPatent
    });

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      const patent = await result.current.registerPatent(
        'Test Patent',
        'Test Description',
        'Test Creator'
      );
      expect(patent).toEqual(mockPatent);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/quantum-registry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test Patent',
        description: 'Test Description',
        creator: 'Test Creator'
      })
    });
  });

  it('should search patents successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ patents: [mockPatent] })
    });

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      const patents = await result.current.searchPatents('test');
      expect(patents).toEqual([mockPatent]);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/quantum-registry?search=test'
    );
  });

  it('should verify a patent successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isValid: true })
    });

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      const isValid = await result.current.verifyPatent('test-id');
      expect(isValid).toBe(true);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/quantum-registry?id=test-id'
    );
  });

  it('should create backup successfully', async () => {
    const mockBackup = 'test-backup-state';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ backup: mockBackup })
    });

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      const backup = await result.current.createBackup();
      expect(backup).toBe(mockBackup);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/quantum-registry');
  });

  it('should restore from backup successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      const success = await result.current.restoreBackup('test-backup-state');
      expect(success).toBe(true);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/quantum-registry', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ backupState: 'test-backup-state' })
    });
  });

  it('should handle errors appropriately', async () => {
    const errorMessage = 'Test error';
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useQuantumRegistry());

    await act(async () => {
      try {
        await result.current.registerPatent(
          'Test Patent',
          'Test Description',
          'Test Creator'
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    expect(result.current.error).toBe(errorMessage);
  });
});
