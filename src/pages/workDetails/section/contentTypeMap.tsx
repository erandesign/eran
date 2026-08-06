import type { Component } from 'solid-js'
import { I18n } from '~/components/i18n'
import Image from '~/components/Image'

export const contentTypeMap: { [key: string]: Component<any> } = {
  cover(props: { image: string }) {
    return <Image class="w-full" ratio="3/2" src={props.image} />
  },
  big(props) {
    return (
      <div class="w-full px-150">
        <Image class="w-full" ratio="16/9" src={props.image} />
      </div>
    )
  },
  Lr(props) {
    return (
      <div class="grid-e/st e-grid w-full px-150">
        <Image class="col-1/span10 w-full" ratio="3/2" src={props.L_image} />
        <Image class="col-span4/-1 w-full" ratio="3/2" src={props.r_image} />
      </div>
    )
  },
  lR(props) {
    return (
      <div class="grid-e/st e-grid w-full px-150">
        <Image class="col-1/span4 w-full" ratio="3/2" src={props.R_image} />
        <Image class="col-span10/-1 w-full" ratio="3/2" src={props.l_image} />
      </div>
    )
  },
  title_desc_image(props) {
    return (
      <div class="grid-s/st grid-rows-[auto_1fr] e-grid w-full px-150">
        <span class="col-1/span3">{props.title}</span>
        <I18n class="[word-wrap:break-word] col-1/span3 mt-150 overflow-hidden text-justify" i18n={props.desc} />
        <Image class="col-span10/-1 row-1/3 w-full" ratio="16/9" src={props.image} />
      </div>
    )
  },
  desc_2image(props) {
    return (
      <div class="grid-s/st e-grid w-full pl-150">
        <I18n class="[word-wrap:break-word] col-1/span3 mt-150 overflow-hidden text-justify" i18n={props.desc} />
        <Image class="col-5/span5 w-full" ratio="3/2" src={props.image1} />
        <Image class="col-span5/-1 w-full" ratio="3/2" src={props.image2} />
      </div>
    )
  },
}
