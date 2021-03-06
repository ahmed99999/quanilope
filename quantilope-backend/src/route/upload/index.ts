import { Router } from 'express';
import rows from './rows';
import columns from './columns';

const router = Router({ mergeParams: true });

router.use('/rows', rows.router).use('/columns', columns.router);

export default { router };
export { router };
