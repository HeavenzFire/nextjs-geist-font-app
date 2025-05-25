import { BackgroundAgentEmulator } from '../src/lib/privacy-warfare/backgroundAgentEmulator';

describe('BackgroundAgentEmulator', () => {
  let agent: BackgroundAgentEmulator;

  beforeEach(() => {
    agent = new BackgroundAgentEmulator();
  });

  afterEach(() => {
    agent.stop();
  });

  test('should start and stop the agent', () => {
    agent.start();
    expect(agent.getLogs().some(log => log.event === 'Agent started')).toBe(true);
    agent.stop();
    expect(agent.getLogs().some(log => log.event === 'Agent stopped')).toBe(true);
  });

  test('should log blocklist update task', async () => {
    jest.useFakeTimers();
    agent.start();

    // Fast-forward timers to trigger blocklist update
    jest.advanceTimersByTime(1000);

    // Wait for async task to complete
    await new Promise(process.nextTick);

    const logs = agent.getLogs();
    expect(logs.some(log => log.event === 'Blocklist update started')).toBe(true);
    expect(logs.some(log => log.event === 'Blocklist update completed')).toBe(true);

    jest.useRealTimers();
    agent.stop();
  }, 10000);

  test('should detect and block trackers', () => {
    jest.useFakeTimers();
    agent.start();

    // Fast-forward timers to trigger network monitoring multiple times
    jest.advanceTimersByTime(30000);

    const logs = agent.getLogs();
    const detected = logs.some(log => log.event === 'Tracker detected');
    const blocked = logs.some(log => log.event === 'Tracker blocked');
    const allowed = logs.some(log => log.event === 'Network request allowed');

    expect(detected || allowed).toBe(true);
    if (detected) {
      expect(blocked).toBe(true);
    }

    jest.useRealTimers();
    agent.stop();
  });
});
