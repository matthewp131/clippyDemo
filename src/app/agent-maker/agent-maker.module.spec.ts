import { AgentMakerModule } from './agent-maker.module';

describe('AgentMakerModule', () => {
  let agentMakerModule: AgentMakerModule;

  beforeEach(() => {
    agentMakerModule = new AgentMakerModule();
  });

  it('should create an instance', () => {
    expect(agentMakerModule).toBeTruthy();
  });
});
