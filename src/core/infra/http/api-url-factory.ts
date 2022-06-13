const BACKEND_BASEURL = 'localhost:3000';

export const makeApiURL = (path: string): string => `${BACKEND_BASEURL}/${path}`