import { Efile } from '@/types';
import test from '../helpers/test';

(async () => {
  // await init('HARD');

  test([...Object.values(Efile)]);
})();
