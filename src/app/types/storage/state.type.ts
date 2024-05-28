import { frontendStorage } from '../../storage';

export type State = ReturnType<typeof frontendStorage.getState>;
