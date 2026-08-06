/** 文本首字母大写 */
export function firstUpperCase(str: string) {
  if (!str)
    return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/** FormData 转为对象 */
export function form2obj(data: FormData) {
  return Object.fromEntries(data.entries())
}
/** 休眠一定时间 */
export function nextTick(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}
