import { Router } from 'express';

import api from './api';
import upload from './upload';

const router = Router({ mergeParams: true });

router.use('/api', api.router).use('/upload', upload.router);

export default { router };
export { router };
