import Configurator from '../../../../source/lib/util/configurator';

describe('build', () => {
  test('Should collect configuration', async () => {
    const config = await Configurator.collect();
    expect(config).toBeInstanceOf(Object);
    expect(config.telegram).toBeInstanceOf(Object);
  });
});
