export default function decode (s: string, obj: object = {}) {
    obj = obj || {};

    let p;
    
    let str = s.replace(/\+/g, ' ').replace(/;/g, '&').split('&');

    for (let i = 0; i < str.length; i++) {
        p = s[i].split('=', 2);
        obj[unescape(p[0])] = unescape(p[1]);
    }

    return obj;
}