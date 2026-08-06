const D
  = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/
let u
let e
let t
let F
let C
let i
const n = /(?:\r|\n|\t\t)/g
const s = /(?:\s\s+)/g
const E = String.fromCharCode(160)
function l (D) {
  (u = document),
    (e = window),
    (F = F || D || e.gsap || console.warn('Please gsap.registerPlugin(SplitText)')),
    F && ((i = F.utils.toArray), (C = F.core.context || function () { }), (t = 1))
}
const p = true
const h = D => e.getComputedStyle(D)
const B = D => D.position === 'absolute' || !0 === D.absolute
function A (D, u) {
  let e
  let t = u.length
  for (; --t > -1;) {
    if (((e = u[t]), D.substr(0, e.length) === e))
      return e.length
  }
}
function f (D = '', u) {
  const e = ~D.indexOf('++')
  let t = 1
  return (
    e && (D = D.split('++').join('')),
    () =>
      `<${u
      } style='position:relative;display:inline-block;'${D ? ` class='${D}${e ? t++ : ''}'>` : '>'}`
  )
}
function c (D, u, e) {
  const t = D.nodeType
  if (t === 1 || t === 9 || t === 11)
    for (D = D.firstChild; D; D = D.nextSibling) c(D, u, e)
  else (t !== 3 && t !== 4) || (D.nodeValue = D.nodeValue.split(u).join(e))
}
function g (D, u) {
  let e = u.length
  for (; --e > -1;) D.push(u[e])
}
function x (D, u, e) {
  let t
  for (; D && D !== u;) {
    if (((t = D._next || D.nextSibling), t))
      return t.textContent.charAt(0) === e
    D = D.parentNode || D._parent
  }
}
function y (D) {
  let u
  let e
  const t = i(D.childNodes)
  const F = t.length
  for (u = 0; u < F; u++) {
    (e = t[u]),
      e._isSplit
        ? y(e)
        : u && e.previousSibling && e.previousSibling.nodeType === 3
          ? ((e.previousSibling.nodeValue += e.nodeType === 3 ? e.nodeValue : e.firstChild.nodeValue), D.removeChild(e))
          : e.nodeType !== 3 && (D.insertBefore(e.firstChild, e), D.removeChild(e))
  }
}
const b = (D, u) => Number.parseFloat(u[D]) || 0
function _ (D, e, t, F, C, i, n) {
  let s
  let E
  let l
  let o
  let r
  let d
  let a
  let p
  let A
  let f
  let _
  let w
  const S = h(D)
  const m = b('paddingLeft', S)
  let v = -999
  const T = b('borderBottomWidth', S) + b('borderTopWidth', S)
  const N = b('borderLeftWidth', S) + b('borderRightWidth', S)
  const L = b('paddingTop', S) + b('paddingBottom', S)
  const W = b('paddingLeft', S) + b('paddingRight', S)
  const O = b('fontSize', S) * (e.lineThreshold || 0.2)
  const H = S.textAlign
  const V = []
  const R = []
  const j = []
  const M = e.wordDelimiter || ' '
  const k = e.tag ? e.tag : e.span ? 'span' : 'div'
  const P = e.type || e.split || 'chars,words,lines'
  const z = C && ~P.indexOf('lines') ? [] : null
  const $ = ~P.indexOf('words')
  const q = ~P.indexOf('chars')
  const G = B(e)
  let I = e.linesClass
  const J = ~(I || '').indexOf('++')
  const K = []
  const Q = S.display === 'flex'
  const U = D.style.display
  for (
    J && (I = I.split('++').join('')),
    Q && (D.style.display = 'block'),
    E = D.getElementsByTagName('*'),
    l = E.length,
    r = [],
    s = 0;
    s < l;
    s++
  )
    r[s] = E[s]
  if (z || G) {
    for (s = 0; s < l; s++) {
      (o = r[s]),
        (d = o.parentNode === D),
        (d || G || (q && !$))
        && ((w = o.offsetTop),
          z && d && Math.abs(w - v) > O && (o.nodeName !== 'BR' || s === 0) && ((a = []), z.push(a), (v = w)),
          G && ((o._x = o.offsetLeft), (o._y = w), (o._w = o.offsetWidth), (o._h = o.offsetHeight)),
          z
          && (((o._isSplit && d)
            || (!q && d)
            || ($ && d)
            || (!$ && o.parentNode.parentNode === D && !o.parentNode._isSplit))
            && (a.push(o), (o._x -= m), x(o, D, M) && (o._wordEnd = !0)),
            o.nodeName === 'BR' && ((o.nextSibling && o.nextSibling.nodeName === 'BR') || s === 0) && z.push([])))
    }
  }
  for (s = 0; s < l; s++) {
    if (((o = r[s]), (d = o.parentNode === D), o.nodeName !== 'BR')) {
      if (
        (G
          && ((A = o.style),
            $ || d || ((o._x += o.parentNode._x), (o._y += o.parentNode._y)),
            (A.left = `${o._x}px`),
            (A.top = `${o._y}px`),
            (A.position = 'absolute'),
            (A.display = 'block'),
            (A.width = `${o._w + 1}px`),
            (A.height = `${o._h}px`)),
          !$ && q)
      ) {
        if (o._isSplit) {
          for (
            o._next = E = o.nextSibling, o.parentNode.appendChild(o);
            E && E.nodeType === 3 && E.textContent === ' ';

          )
            (o._next = E.nextSibling), o.parentNode.appendChild(E), (E = E.nextSibling)
        }
        else {
          o.parentNode._isSplit
            ? ((o._parent = o.parentNode),
              !o.previousSibling && o.firstChild && (o.firstChild._isFirst = !0),
              o.nextSibling
              && o.nextSibling.textContent === ' '
              && !o.nextSibling.nextSibling
              && K.push(o.nextSibling),
              (o._next = o.nextSibling && o.nextSibling._isFirst ? null : o.nextSibling),
              o.parentNode.removeChild(o),
              r.splice(s--, 1),
              l--)
            : d
            || ((w = !o.nextSibling && x(o.parentNode, D, M)),
              o.parentNode._parent && o.parentNode._parent.appendChild(o),
              w && o.parentNode.appendChild(u.createTextNode(' ')),
              k === 'span' && (o.style.display = 'inline'),
              V.push(o))
        }
      }
      else {
        o.parentNode._isSplit && !o._isSplit && o.innerHTML !== ''
          ? R.push(o)
          : q && !o._isSplit && (k === 'span' && (o.style.display = 'inline'), V.push(o))
      }
    }
    else { z || G ? (o.parentNode && o.parentNode.removeChild(o), r.splice(s--, 1), l--) : $ || D.appendChild(o) }
  }
  for (s = K.length; --s > -1;) K[s].parentNode.removeChild(K[s])
  if (z) {
    for (
      G
      && ((f = u.createElement(k)),
        D.appendChild(f),
        (_ = `${f.offsetWidth}px`),
        (w = f.offsetParent === D ? 0 : D.offsetLeft),
        D.removeChild(f)),
      A = D.style.cssText,
      D.style.cssText = 'display:none;';
      D.firstChild;

    )
      D.removeChild(D.firstChild)
    for (p = M === ' ' && (!G || (!$ && !q)), s = 0; s < z.length; s++) {
      for (
        a = z[s],
        f = u.createElement(k),
        f.style.cssText = `display:block;text-align:${H};position:${G ? 'absolute;' : 'relative;'}`,
        I && (f.className = I + (J ? s + 1 : '')),
        j.push(f),
        l = a.length,
        E = 0;
        E < l;
        E++
      ) {
        a[E].nodeName !== 'BR'
          && ((o = a[E]),
            f.appendChild(o),
            p && o._wordEnd && f.appendChild(u.createTextNode(' ')),
            G
            && (E === 0 && ((f.style.top = `${o._y}px`), (f.style.left = `${m + w}px`)),
              (o.style.top = '0px'),
              w && (o.style.left = `${o._x - w}px`)))
      }
      l === 0 ? (f.innerHTML = '&nbsp;') : $ || q || (y(f), c(f, String.fromCharCode(160), ' ')),
        G && ((f.style.width = _), (f.style.height = `${o._h}px`)),
        D.appendChild(f)
    }
    D.style.cssText = A
  }
  G
    && (n > D.clientHeight && ((D.style.height = `${n - L}px`), D.clientHeight < n && (D.style.height = `${n + T}px`)),
      i > D.clientWidth && ((D.style.width = `${i - W}px`), D.clientWidth < i && (D.style.width = `${i + N}px`))),
    Q && (U ? (D.style.display = U) : D.style.removeProperty('display')),
    g(t, V),
    $ && g(F, R),
    g(C, j)
}
function w (e, t, F, C) {
  let i
  let l
  let o
  let r
  let d
  let a
  let p
  let h
  const f = t.tag ? t.tag : t.span ? 'span' : 'div'
  const g = ~(t.type || t.split || 'chars,words,lines').indexOf('chars')
  const x = B(t)
  const y = t.wordDelimiter || ' '
  const b = D => D === y || (D === E && y === ' ')
  const _ = y !== ' ' ? '' : x ? '&#173; ' : ' '
  const w = `</${f}>`
  let S = 1
  const m = t.specialChars ? (typeof t.specialChars == 'function' ? t.specialChars : A) : null
  const v = u.createElement('div')
  const T = e.parentNode
  for (
    T.insertBefore(v, e),
    v.textContent = e.nodeValue,
    T.removeChild(e),
    i = (function D (u) {
      const e = u.nodeType
      let t = ''
      if (e === 1 || e === 9 || e === 11) {
        if (typeof u.textContent == 'string')
          return u.textContent
        for (u = u.firstChild; u; u = u.nextSibling) t += D(u)
      }
      else if (e === 3 || e === 4) { return u.nodeValue }
      return t
    })((e = v)),
    p = i.includes('<'),
    !1 !== t.reduceWhiteSpace && (i = i.replace(s, ' ').replace(n, '')),
    p && (i = i.split('<').join('{{LT}}')),
    d = i.length,
    l = (i.charAt(0) === ' ' ? _ : '') + F(),
    o = 0;
    o < d;
    o++
  ) {
    if (((a = i.charAt(o)), m && (h = m(i.substr(o), t.specialChars)))) { (a = i.substr(o, h || 1)), (l += g && a !== ' ' ? `${C() + a}</${f}>` : a), (o += h - 1) }
    else if (b(a) && !b(i.charAt(o - 1)) && o) {
      for (l += S ? w : '', S = 0; b(i.charAt(o + 1));) (l += _), o++
      o === d - 1 ? (l += _) : i.charAt(o + 1) !== ')' && ((l += _ + F()), (S = 1))
    }
    else {
      a === '{' && i.substr(o, 6) === '{{LT}}'
        ? ((l += g ? `${C()}{{LT}}</${f}>` : '{{LT}}'), (o += 5))
        : (a.charCodeAt(0) >= 55296 && a.charCodeAt(0) <= 56319)
          || (i.charCodeAt(o + 1) >= 65024 && i.charCodeAt(o + 1) <= 65039)
          ? ((r = ((i.substr(o, 12).split(D) || [])[1] || '').length || 2),
            (l += g && a !== ' ' ? `${C() + i.substr(o, r)}</${f}>` : i.substr(o, r)),
            (o += r - 1))
          : (l += g && a !== ' ' ? `${C() + a}</${f}>` : a)
    }
  }
  (e.outerHTML = l + (S ? w : '')), p && c(T, '{{LT}}', '<')
}
function S (D, u, e, t) {
  let F
  let C
  const n = i(D.childNodes)
  const s = n.length
  const E = B(u)
  if (D.nodeType !== 3 || s > 1) {
    for (u.absolute = !1, F = 0; F < s; F++) {
      (C = n[F]),
        (C._next = C._isFirst = C._parent = C._wordEnd = null),
        (C.nodeType !== 3 || /\S+/.test(C.nodeValue))
        && (E
          && C.nodeType !== 3
          && h(C).display === 'inline'
          && ((C.style.display = 'inline-block'), (C.style.position = 'relative')),
          (C._isSplit = !0),
          S(C, u, e, t))
    }
    return (u.absolute = E), void (D._isSplit = !0)
  }
  w(D, u, e, t)
}
/** @type {SplitText} */
class m {
  constructor(D, u) {
    t || l(),
      (this.elements = i(D)),
      (this.chars = []),
      (this.words = []),
      (this.lines = []),
      (this._originals = []),
      (this.vars = u || {}),
      C(this),
      p && this.split(u)
  }

  split (D) {
    this.isSplit && this.revert(),
      (this.vars = D = D || this.vars),
      (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0)
    let u
    let e
    let t
    let F = this.elements.length
    const C = D.tag ? D.tag : D.span ? 'span' : 'div'
    const i = f(D.wordsClass, C)
    const n = f(D.charsClass, C)
    for (; --F > -1;) {
      (t = this.elements[F]),
        (this._originals[F] = { html: t.innerHTML, style: t.getAttribute('style') }),
        (u = t.clientHeight),
        (e = t.clientWidth),
        S(t, D, i, n),
        _(t, D, this.chars, this.words, this.lines, e, u)
    }
    return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), (this.isSplit = !0), this
  }

  revert () {
    const D = this._originals
    if (!D)
      throw 'revert() call wasn\'t scoped properly.'
    return (
      this.elements.forEach((u, e) => {
        (u.innerHTML = D[e].html), u.setAttribute('style', D[e].style)
      }),
      (this.chars = []),
      (this.words = []),
      (this.lines = []),
      (this.isSplit = !1),
      this
    )
  }

  static create (D, u) {
    return new m(D, u)
  }
}
(m.version = '3.12.5'), (m.register = l)
export default m
export { m as SplitText }
