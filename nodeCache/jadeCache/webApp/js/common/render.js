/**
 * @author monkeywang
 * Date: 17/3/28
 */
import $ from 'jquery'

export class Render {
  constructor (JSON, container) {
    this.JSON = JSON
    this.container = container
  }

  renderDom () {
    for (let opt of this.JSON.objects) {

      if (opt.type === 'rect') {
        let style = {
          position: 'absolute',
          width: opt.width + 'px',
          height: opt.height + 'px',
          background: opt.fill,
          left: opt.left,
          top: opt.top
        }
        let div = $('<div></div>')
        div.css(style)
        $(this.container).append(div)
      }
      if (opt.type === 'i-text') {
        let style = {
          position: 'absolute',
          width: opt.width + 'px',
          height: opt.height + 'px',
          left: opt.left,
          top: opt.top,
          color: opt.fill,
          fontSize: opt.fontSize
        }
        let p = $(`<p>${opt.text}</p>`)
        p.css(style)
        // console.log($(this.container))
        $(this.container).append(p)
      }
    }
  }
}
