'use client'
import { onCleanup, onMount } from 'solid-js'
import { isDev, isServer } from 'solid-js/web'
import { ScrollTrigger, gsap } from '~/utils/gsap'
import { GSDevTools } from '~/utils/gsap/GSDevTools.mjs'
import { ScrollSmoother } from '~/utils/gsap/ScrollSmoother.mjs'
import { SplitText } from '~/utils/gsap/SplitText.mjs'

const defaultSmooth = 1

/** 负责首页的动画 */
export default function Gsap() {
  // const isDev = false
  const eNode = <div style={{ display: 'none', visibility: 'hidden' }} />
  if (isServer)
    return eNode

  let ctx: gsap.Context
  let sm: globalThis.ScrollSmoother

  const fn = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
    isDev && gsap.registerPlugin(GSDevTools)

    sm = ScrollSmoother.create({
      content: '#home-main',
      // speed: 0.75,
      smooth: defaultSmooth,
      smoothTouch: defaultSmooth,
      ease: 'expo',
    })
    sm.scrollTo(0, false) // 滚动回顶部
    const lockScroll = () => sm.paused(true)
    const unLockScroll = () => sm.paused(false)
    lockScroll() // 滚动锁定，等待动画结束后再开始滚动

    const homeMain = document.querySelector('#home-main')!
    const navMain = document.querySelector('#cover-nav-main')!
    const sloganMain = document.querySelector('#home-slogan')!
    ctx = gsap.context(() => {
      const coverMain = document.querySelector('#home-cover')!
      const coverTl = gsap
        .timeline({
          id: 'firstIn',
          defaults: { autoAlpha: 1, ease: 'power1.inOut', duration: 1 },
          onComplete() {
            // unLockScroll(); // 解除滚动锁定
          },
        })
        // 隐藏元素
        .set('#cover-title,#cover-desc,#cover-logo-x,#cover-logo-y,#cover-nav', { opacity: 0 })
        // 开始动画
        .fromTo('#firstIn #logo', { yPercent: 100 }, { yPercent: 0, delay: 0.25 })
        .to('#firstIn', { yPercent: -100 }, '+=0.5')
        .set('#firstIn', { display: 'none', visibility: 'hidden' }) // 隐藏
        .to(
          '#cover-title',
          { keyframes: { x: ['3rem', '0rem'], opacity: [0, 0.2, 0.5, 1], ease: 'power1.out' } },
          '-=0.1',
        )
        .to(
          '#cover-desc',
          { keyframes: { y: ['1.2rem', '0rem'], opacity: [0, 0.3, 0.5, 1], ease: 'sine.in' } },
          '-=50%',
        )
        .to('#cover-logo-x', { opacity: 1, ease: 'power2.out' })
        .to('#cover-nav', { opacity: 1 }, '-=75%')
        .to('#cover-logo-y', { opacity: 1 }, '-=25%')

      // isDev && coverTl.seek(90) // 测试-直接跳转到结束
      // 固定首屏
      ScrollTrigger.create({
        trigger: coverMain,
        start: 'top top',
        end: `+=${coverMain.clientHeight}`,
        pin: true,
        pinSpacing: false,
        // markers: true,
      })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: homeMain,
            start: 'top top',
            end: `+=${coverMain.clientHeight}`,
            scrub: true,
          },
        })
        .fromTo(navMain, { bottom: 0 }, { bottom: coverMain.clientHeight - navMain.clientHeight, ease: 'none' })

      // 鼠标滚动触发下一页
      const coverMainO = ScrollTrigger.observe({
        target: coverMain,
        onDown() {
          if (!coverTl.isActive()) {
            coverMainO.kill() // 只用触发一次
            sm.scrollTo('#home-slogan', true)
          }
        },
      })
      // 口号文本
      const vw = sloganMain.clientWidth
      const [slogan1, slogan2, slogan3, slogan4] = Array.from({ length: 4 }).fill(0).map((_, i) => {
        const slogan: HTMLSpanElement = document.querySelector(`#home-slogan-${i + 1}`)!
        const sloganStr = SplitText.create(slogan)
        const rect = slogan.getBoundingClientRect()
        const x = rect.x
        const cx = (vw - rect.width) * 0.5 - x
        return { slogan, sloganStr, rect, cx, x }
      })

      // --
      const sloganTl = gsap
        .timeline({
          // paused: true,
          defaults: { ease: 'power1.inOut', duration: 1 },
          onComplete() {
            unLockScroll()
          },
          scrollTrigger: {
            id: 'sloganTl',
            trigger: sloganMain,
            start: '-10% top',
            // markers: true,
          },
        })
        // 居中
        .set(slogan1.slogan, { x: slogan1.cx, y: slogan1.rect.height })
        .set(slogan2.slogan, { x: slogan2.cx, y: slogan2.rect.height })
        .set(slogan3.slogan, { y: slogan3.rect.height * 1.1 })
        .set(slogan4.slogan, { x: slogan4.cx, y: slogan4.rect.height * 1.2 })
        .set(slogan2.sloganStr.chars, { color: '#fff' })
        .set(slogan4.sloganStr.chars, { color: '#fff' })
        .addLabel('start1')
        .fromTo(slogan1.sloganStr.chars, { opacity: 0 }, { opacity: 1, stagger: 0.13, duration: 1.3 }, 'start1+=0.1') // 逐渐显示
        .addLabel('end1')
        .fromTo(slogan1.slogan, { scale: 1.8 }, { scale: 1, duration: 0.8 }, 'end1-=0.4') // 逐渐缩小
        .from(slogan1.sloganStr.chars, { color: '#fff', duration: 0.8 }, 'end1-=0.2') // 逐渐变黑
        .addLabel('start2')
        .fromTo(slogan2.sloganStr.chars, { yPercent: 100 }, { yPercent: 0, duration: 0.5 }, 'start2') // 从下向上显示

        .addLabel('start3')
        .fromTo(
          slogan3.slogan,
          { x: -(slogan3.x + slogan3.rect.width) },
          { x: slogan3.cx, ease: 'power3.out' },
          'start3',
        )
        .fromTo(
          slogan3.sloganStr.chars,
          { opacity: 0.2 },
          { opacity: 1, stagger: -0.075, direction: 0.5, ease: 'power3.out' },
          'start3-=0.2',
        )
        .addLabel('start4', '-=0.5')
        .to(slogan2.sloganStr.chars, { color: '#616161', duration: 0.8 }, 'start4')
        .fromTo(slogan4.sloganStr.chars, { yPercent: 100 }, { yPercent: 0, duration: 0.5 }, 'start4') // 从下向上显示

        .addLabel('start_brack')
        .to(slogan1.slogan, { x: 0, y: 0, duration: 0.5 }, 'start_brack')
        .to(slogan2.slogan, { x: 0, y: 0, duration: 0.5 }, 'start_brack+=0.1')
        .to(slogan3.slogan, { x: 0, y: 0, duration: 0.5 }, 'start_brack+=0.3')
        .to(slogan4.slogan, { x: 0, y: 0, duration: 0.5 }, 'start_brack+=0.5')
      isDev && sloganTl.seek(90)
      // 测试
      // isDev && GSDevTools.create({ animation: sloganTl })
    })
  }
  onMount(() => {
    setTimeout(() => {
      fn()
    }, 1)
  })
  onCleanup(() => {
    ctx?.revert()
    sm.kill()
  })

  return eNode
}
