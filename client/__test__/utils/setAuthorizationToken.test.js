import { setAuthorizationToken } from '../../utils/authorization';

describe('#Set Authorization Token', () => {
  it('should set axios header when token is passed', () => {
    setAuthorizationToken('sampleToken');
  });

  it('should delete axios header when token is not passed', () => {
    setAuthorizationToken(undefined);
  });
});
