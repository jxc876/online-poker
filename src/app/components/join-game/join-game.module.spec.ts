import { JoinGameModule } from './join-game.module';

describe('JoinGameModule', () => {
  let joinGameModule: JoinGameModule;

  beforeEach(() => {
    joinGameModule = new JoinGameModule();
  });

  it('should create an instance', () => {
    expect(joinGameModule).toBeTruthy();
  });
});
