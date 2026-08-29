import { createEffect } from 'solid-js'
import { useSubmission } from '@solidjs/router'
import { toast } from '@thinke/toast'
import { i18n } from '~/components/i18n'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import DesignHeader from '~/design/DesignHeader'
import DesignFooter from '~/design/DesignFooter'
import DesignReveal from '~/design/DesignReveal'
import { saveConcatInfo } from '~/serverAction/concat'

/** 联系页（新设计深色主题 + 接入现有表单提交） */
export default function Concat() {
  let $from: HTMLFormElement
  const echoing = useSubmission(saveConcatInfo)
  createEffect(() => {
    if (!echoing.pending && echoing.result?.code === 0) {
      toast.success('提交成功！')
      $from.reset()
      echoing.clear()
    }
  })

  return (
    <div class="eran-design d-contact">
      <SiteTitle>{i18n.nav_p_3()}</SiteTitle>
      <SeoMeta />

      <DesignHeader active="contact" />

      <main>
        <DesignReveal><span class="kicker">GET IN TOUCH</span></DesignReveal>
        <DesignReveal>
          <h1>有个项目，<br />想找人一起<em>把它做出来</em>吗？</h1>
        </DesignReveal>
        <DesignReveal>
          <p class="lead">无论是一个刚起步的想法，还是已经有了明确的时间表——都可以先聊聊。</p>
        </DesignReveal>

        <div class="grid">
          <DesignReveal>
            <a class="mail" href="mailto:info@erandesign.cn">info@erandesign.cn</a>
            <div class="info-cols">
              <div class="row"><b>+86 185 6565 0856</b>PHONE / WECHAT</div>
              <div class="row"><b>中国 · 深圳</b>STUDIO</div>
              <div class="row"><b>周一至周五 · 10:00–19:00</b>WORKING HOURS</div>
            </div>
            <div class="socials">
              <a href="#">微信公众号</a>
              <a href="#">小红书</a>
              <a href="#">领英</a>
            </div>
          </DesignReveal>

          <DesignReveal>
            <form ref={$from!} method="post" action={saveConcatInfo}>
              <div class="field">
                <label>姓名 / 公司</label>
                <input name="name" type="text" placeholder="您的姓名，以及公司或品牌名称" autocomplete="off" />
              </div>
              <div class="field">
                <label>邮箱 / 电话</label>
                <input name="phone" required type="text" placeholder="方便我们回复您" autocomplete="off" />
              </div>
              <div class="field">
                <label>项目类型</label>
                <select name="info">
                  <option>地产 & 办公</option>
                  <option>终端 SI</option>
                  <option>展示道具 & POSM</option>
                  <option>品牌 VI</option>
                  <option>网站 & APP</option>
                  <option>还不确定</option>
                </select>
              </div>
              <div class="field">
                <label>项目简述</label>
                <textarea name="desc" placeholder="大概讲讲这个项目——地点、时间节点、预算范围，越具体越好" />
              </div>
              <button class="submit" type="submit"><span>发送 →</span></button>
              <div class="form-note">我们会尽快回复您。</div>
            </form>
          </DesignReveal>
        </div>
      </main>

      <DesignFooter rev="CONTACT — REV.2026.08" />
    </div>
  )
}
