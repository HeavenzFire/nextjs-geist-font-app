import { QuantumRegistry } from '../../src/lib/quantum-core/quantumRegistry';

describe('QuantumRegistry', () => {
  let registry: QuantumRegistry;

  beforeEach(() => {
    registry = QuantumRegistry.getInstance();
  });

  describe('Patent Registration', () => {
    it('should successfully register a new patent', async () => {
      const patent = await registry.registerPatent(
        'Quantum Healing Protocol',
        'A novel approach to cellular regeneration using quantum field manipulation',
        'Dr. Quantum'
      );

      expect(patent).toBeDefined();
      expect(patent.id).toBeDefined();
      expect(patent.title).toBe('Quantum Healing Protocol');
      expect(patent.creator).toBe('Dr. Quantum');
      expect(patent.signature).toBeDefined();
      expect(patent.quantumState).toBeDefined();
    });

    it('should generate unique IDs for different patents', async () => {
      const patent1 = await registry.registerPatent(
        'First Patent',
        'Description 1',
        'Creator 1'
      );

      const patent2 = await registry.registerPatent(
        'Second Patent',
        'Description 2',
        'Creator 2'
      );

      expect(patent1.id).not.toBe(patent2.id);
    });
  });

  describe('Patent Verification', () => {
    it('should verify a valid patent', async () => {
      const patent = await registry.registerPatent(
        'Test Patent',
        'Test Description',
        'Test Creator'
      );

      const isValid = await registry.verifyPatent(patent.id);
      expect(isValid).toBe(true);
    });

    it('should return false for non-existent patent', async () => {
      const isValid = await registry.verifyPatent('non-existent-id');
      expect(isValid).toBe(false);
    });
  });

  describe('Similar Patents Search', () => {
    it('should find similar patents based on description', async () => {
      await registry.registerPatent(
        'Original Patent',
        'Quantum healing using electromagnetic fields',
        'Creator 1'
      );

      await registry.registerPatent(
        'Similar Patent',
        'Quantum healing through electromagnetic manipulation',
        'Creator 2'
      );

      const similarPatents = await registry.findSimilarPatents(
        'Quantum healing with electromagnetic waves'
      );

      expect(similarPatents.length).toBeGreaterThan(0);
    });
  });

  describe('Quantum Backup', () => {
    it('should create and restore from backup', async () => {
      const originalPatent = await registry.registerPatent(
        'Backup Test Patent',
        'Testing backup functionality',
        'Backup Creator'
      );

      const backupState = await registry.createQuantumBackup();
      expect(backupState).toBeDefined();

      const restoredSuccessfully = await registry.restoreFromBackup(backupState);
      expect(restoredSuccessfully).toBe(true);

      const isValid = await registry.verifyPatent(originalPatent.id);
      expect(isValid).toBe(true);
    });
  });
});
