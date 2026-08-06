/** 自动处理错误 todo */
export function ServerFn<T = any>(fn: () => Promise<T>) {
  return new Promise<T>((resolve, reject) => {
    fn().then(resolve).catch((err) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ code: 5000, message: import.meta.env.DEV && err?.message ? err.message : 'server error' })
    })
  })
}
