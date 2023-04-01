import Configurator from '../../../source/util/configurator';

describe('build', () => {
  test('Should collect configuration', async () => {
    const config = await Configurator.collect();
    expect(config).toBeInstanceOf(Object);
    expect(config.telegram).toBeInstanceOf(Object);
  });
});
