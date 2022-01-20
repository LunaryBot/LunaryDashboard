export default function decode(s: string, q?: object) {
    var i, p;
    console.log(s)
    let a = s.replace(/\+/g, ' ').replace(/;/g, '&').split('&');
    q = q || {};
    for (i=0; i<a.length; i++) {
      p = a[i].split('=', 2);
      q[unescape(p[0])] = unescape(p[1]);
    }
    return q;
}