import time
from privacy_warfare.background_agent import BackgroundAgent

def test_background_agent():
    agent = BackgroundAgent()
    agent.start()

    # Simulate browsing session for 30 minutes (shortened to 10 seconds for test)
    time.sleep(10)

    agent.stop()
    logs = agent.get_logs()
    print("Agent logs:", logs)

    # Basic assertions (expand as needed)
    assert logs is not None
    assert isinstance(logs, list)
    assert any('tracking' in log.lower() or 'block' in log.lower() for log in logs)

if __name__ == "__main__":
    test_background_agent()
