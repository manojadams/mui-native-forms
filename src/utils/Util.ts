export const isAsyncFunction = (fn: Function) => fn.constructor.name === 'AsyncFunction';

export const getDefaultConfig = () => ({gapY: 15});