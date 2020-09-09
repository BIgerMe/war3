/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+markup-templating+java+markdown+nginx+php+python&plugins=line-highlight+line-numbers+toolbar+previewers */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
        var e = /\blang(?:uage)?-([\w-]+)\b/i, t = 0, n = _self.Prism = {
            manual: _self.Prism && _self.Prism.manual,
            disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
            util: {
                encode: function (e) {
                    return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                }, type: function (e) {
                    return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                }, objId: function (e) {
                    return e.__id || Object.defineProperty(e, "__id", {value: ++t}), e.__id
                }, clone: function (e, t) {
                    var r = n.util.type(e);
                    switch (t = t || {}, r) {
                        case"Object":
                            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                            var a = {};
                            t[n.util.objId(e)] = a;
                            for (var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                            return a;
                        case"Array":
                            if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                            var a = [];
                            return t[n.util.objId(e)] = a, e.forEach(function (e, r) {
                                a[r] = n.util.clone(e, t)
                            }), a
                    }
                    return e
                }
            },
            languages: {
                extend: function (e, t) {
                    var r = n.util.clone(n.languages[e]);
                    for (var a in t) r[a] = t[a];
                    return r
                }, insertBefore: function (e, t, r, a) {
                    a = a || n.languages;
                    var l = a[e];
                    if (2 == arguments.length) {
                        r = arguments[1];
                        for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
                        return l
                    }
                    var o = {};
                    for (var s in l) if (l.hasOwnProperty(s)) {
                        if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                        o[s] = l[s]
                    }
                    var u = a[e];
                    return a[e] = o, n.languages.DFS(n.languages, function (t, n) {
                        n === u && t != e && (this[t] = o)
                    }), o
                }, DFS: function (e, t, r, a) {
                    a = a || {};
                    for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)))
                }
            },
            plugins: {},
            highlightAll: function (e, t) {
                n.highlightAllUnder(document, e, t)
            },
            highlightAllUnder: function (e, t, r) {
                var a = {
                    callback: r,
                    selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                };
                n.hooks.run("before-highlightall", a);
                for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback)
            },
            highlightElement: function (t, r, a) {
                for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
                o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
                var s = t.textContent, u = {element: t, language: l, grammar: i, code: s};
                if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;
                if (n.hooks.run("before-highlight", u), r && _self.Worker) {
                    var g = new Worker(n.filename);
                    g.onmessage = function (e) {
                        u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                    }, g.postMessage(JSON.stringify({language: u.language, code: u.code, immediateClose: !0}))
                } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
            },
            highlight: function (e, t, a) {
                var l = {code: e, grammar: t, language: a};
                return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language)
            },
            matchGrammar: function (e, t, r, a, l, i, o) {
                var s = n.Token;
                for (var u in r) if (r.hasOwnProperty(u) && r[u]) {
                    if (u == o) return;
                    var g = r[u];
                    g = "Array" === n.util.type(g) ? g : [g];
                    for (var c = 0; c < g.length; ++c) {
                        var h = g[c], f = h.inside, d = !!h.lookbehind, m = !!h.greedy, p = 0, y = h.alias;
                        if (m && !h.pattern.global) {
                            var v = h.pattern.toString().match(/[imuy]*$/)[0];
                            h.pattern = RegExp(h.pattern.source, v + "g")
                        }
                        h = h.pattern || h;
                        for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                            var w = t[b];
                            if (t.length > e.length) return;
                            if (!(w instanceof s)) {
                                if (m && b != t.length - 1) {
                                    h.lastIndex = k;
                                    var _ = h.exec(e);
                                    if (!_) break;
                                    for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) x += t[A].length, j >= x && (++b, k = x);
                                    if (t[b] instanceof s) continue;
                                    I = A - b, w = e.slice(k, x), _.index -= k
                                } else {
                                    h.lastIndex = 0;
                                    var _ = h.exec(w), I = 1
                                }
                                if (_) {
                                    d && (p = _[1] ? _[1].length : 0);
                                    var j = _.index + p, _ = _[0].slice(p), P = j + _.length, N = w.slice(0, j),
                                        S = w.slice(P), C = [b, I];
                                    N && (++b, k += N.length, C.push(N));
                                    var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                                    if (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break
                                } else if (i) break
                            }
                        }
                    }
                }
            },
            tokenize: function (e, t) {
                var r = [e], a = t.rest;
                if (a) {
                    for (var l in a) t[l] = a[l];
                    delete t.rest
                }
                return n.matchGrammar(e, r, t, 0, 0, !1), r
            },
            hooks: {
                all: {}, add: function (e, t) {
                    var r = n.hooks.all;
                    r[e] = r[e] || [], r[e].push(t)
                }, run: function (e, t) {
                    var r = n.hooks.all[e];
                    if (r && r.length) for (var a, l = 0; a = r[l++];) a(t)
                }
            }
        }, r = n.Token = function (e, t, n, r, a) {
            this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a
        };
        if (r.stringify = function (e, t, a) {
            if ("string" == typeof e) return e;
            if ("Array" === n.util.type(e)) return e.map(function (n) {
                return r.stringify(n, t, e)
            }).join("");
            var l = {
                type: e.type,
                content: r.stringify(e.content, t, a),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: t,
                parent: a
            };
            if (e.alias) {
                var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                Array.prototype.push.apply(l.classes, i)
            }
            n.hooks.run("wrap", l);
            var o = Object.keys(l.attributes).map(function (e) {
                return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            }).join(" ");
            return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
        }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function (e) {
            var t = JSON.parse(e.data), r = t.language, a = t.code, l = t.immediateClose;
            _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {pattern: /^<\/?[^\s>\/]+/i, inside: {punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/}},
            "attr-value": {
                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                inside: {punctuation: [/^=/, {pattern: /(^|[^\\])["']/, lookbehind: !0}]}
            },
            punctuation: /\/?>/,
            "attr-name": {pattern: /[^\s>\/]+/, inside: {namespace: /^[^\s>\/:]+:/}}
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i, inside: {rule: /@[\w-]+/}},
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.languages.css, Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
            "attr-name": {pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside},
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {pattern: /.+/i, inside: Prism.languages.css}
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0}],
    string: {pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: {punctuation: /[.\\]/}
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(?:true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: !0
    }, /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/],
    number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
        alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\${[^}]+}/,
                inside: {
                    "interpolation-punctuation": {pattern: /^\${|}$/, alias: "punctuation"},
                    rest: Prism.languages.javascript
                }
            }, string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0
    }
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*\/%&|^!=<>]=?/,
    number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
}), Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        alias: "property",
        inside: {
            string: {pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0},
            directive: {
                pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
Prism.languages["markup-templating"] = {}, Object.defineProperties(Prism.languages["markup-templating"], {
    buildPlaceholders: {
        value: function (e, t, n, a) {
            e.language === t && (e.tokenStack = [], e.code = e.code.replace(n, function (n) {
                if ("function" == typeof a && !a(n)) return n;
                for (var r = e.tokenStack.length; -1 !== e.code.indexOf("___" + t.toUpperCase() + r + "___");) ++r;
                return e.tokenStack[r] = n, "___" + t.toUpperCase() + r + "___"
            }), e.grammar = Prism.languages.markup)
        }
    }, tokenizePlaceholders: {
        value: function (e, t) {
            if (e.language === t && e.tokenStack) {
                e.grammar = Prism.languages[t];
                var n = 0, a = Object.keys(e.tokenStack), r = function (o) {
                    if (!(n >= a.length)) for (var i = 0; i < o.length; i++) {
                        var g = o[i];
                        if ("string" == typeof g || g.content && "string" == typeof g.content) {
                            var c = a[n], s = e.tokenStack[c], l = "string" == typeof g ? g : g.content,
                                p = l.indexOf("___" + t.toUpperCase() + c + "___");
                            if (p > -1) {
                                ++n;
                                var f, u = l.substring(0, p),
                                    _ = new Prism.Token(t, Prism.tokenize(s, e.grammar, t), "language-" + t, s),
                                    k = l.substring(p + ("___" + t.toUpperCase() + c + "___").length);
                                if (u || k ? (f = [u, _, k].filter(function (e) {
                                    return !!e
                                }), r(f)) : f = _, "string" == typeof g ? Array.prototype.splice.apply(o, [i, 1].concat(f)) : g.content = f, n >= a.length) break
                            }
                        } else g.content && "string" != typeof g.content && r(g.content)
                    }
                };
                r(e.tokens)
            }
        }
    }
});
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
    operator: {pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*\/%&|^!=<>]=?)/m, lookbehind: !0}
}), Prism.languages.insertBefore("java", "function", {
    annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0
    }
}), Prism.languages.insertBefore("java", "class-name", {
    generics: {
        pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
        alias: "function",
        inside: {keyword: Prism.languages.java.keyword, punctuation: /[<>(),.:]/}
    }
});
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation"},
    code: [{pattern: /^(?: {4}|\t).+/m, alias: "keyword"}, {pattern: /``.+?``|`[^`\n]+`/, alias: "keyword"}],
    title: [{
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: {punctuation: /==+$|--+$/}
    }, {pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: {punctuation: /^#+|#+$/}}],
    hr: {pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation"},
    list: {pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation"},
    "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^\*\*|^__|\*\*$|__$/}
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^[*_]|[*_]$/}
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: {pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0},
            string: {pattern: /"(?:\\.|[^"\\])*"(?=\)$)/}
        }
    }
}), Prism.languages.markdown.bold.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.italic.inside.url = Prism.languages.markdown.url, Prism.languages.markdown.bold.inside.italic = Prism.languages.markdown.italic, Prism.languages.markdown.italic.inside.bold = Prism.languages.markdown.bold;
Prism.languages.nginx = Prism.languages.extend("clike", {
    comment: {pattern: /(^|[^"{\\])#.*/, lookbehind: !0},
    keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i
}), Prism.languages.insertBefore("nginx", "keyword", {variable: /\$[a-z_]+/i});
!function (e) {
    e.languages.php = e.languages.extend("clike", {
        keyword: /\b(?:and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
        constant: /\b[A-Z0-9_]{2,}\b/,
        comment: {pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0}
    }), e.languages.insertBefore("php", "string", {
        "shell-comment": {
            pattern: /(^|[^\\])#.*/,
            lookbehind: !0,
            alias: "comment"
        }
    }), e.languages.insertBefore("php", "keyword", {
        delimiter: {pattern: /\?>|<\?(?:php|=)?/i, alias: "important"},
        variable: /\$+(?:\w+\b|(?={))/i,
        "package": {pattern: /(\\|namespace\s+|use\s+)[\w\\]+/, lookbehind: !0, inside: {punctuation: /\\/}}
    }), e.languages.insertBefore("php", "operator", {property: {pattern: /(->)[\w]+/, lookbehind: !0}});
    var n = {
        pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
        lookbehind: !0,
        inside: {rest: e.languages.php}
    };
    e.languages.insertBefore("php", "string", {
        "nowdoc-string": {
            pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
            greedy: !0,
            alias: "string",
            inside: {
                delimiter: {
                    pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                    alias: "symbol",
                    inside: {punctuation: /^<<<'?|[';]$/}
                }
            }
        },
        "heredoc-string": {
            pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
            greedy: !0,
            alias: "string",
            inside: {
                delimiter: {
                    pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                    alias: "symbol",
                    inside: {punctuation: /^<<<"?|[";]$/}
                }, interpolation: n
            }
        },
        "single-quoted-string": {pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0, alias: "string"},
        "double-quoted-string": {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: !0,
            alias: "string",
            inside: {interpolation: n}
        }
    }), delete e.languages.php.string, e.hooks.add("before-tokenize", function (n) {
        if (/(?:<\?php|<\?)/gi.test(n.code)) {
            var t = /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi;
            e.languages["markup-templating"].buildPlaceholders(n, "php", t)
        }
    }), e.hooks.add("after-tokenize", function (n) {
        e.languages["markup-templating"].tokenizePlaceholders(n, "php")
    })
}(Prism);
Prism.languages.python = {
    comment: {pattern: /(^|[^\\])#.*/, lookbehind: !0},
    "triple-quoted-string": {pattern: /("""|''')[\s\S]+?\1/, greedy: !0, alias: "string"},
    string: {pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0},
    "function": {pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0},
    "class-name": {pattern: /(\bclass\s+)\w+/i, lookbehind: !0},
    keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    "boolean": /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
    punctuation: /[{}[\];(),.:]/
};
!function () {
    function e(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }

    function t(e, t) {
        return t = " " + t + " ", (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    }

    function n(e, n, i) {
        n = "string" == typeof n ? n : e.getAttribute("data-line");
        for (var o, l = n.replace(/\s+/g, "").split(","), a = +e.getAttribute("data-line-offset") || 0, s = r() ? parseInt : parseFloat, d = s(getComputedStyle(e).lineHeight), u = t(e, "line-numbers"), c = 0; o = l[c++];) {
            var p = o.split("-"), m = +p[0], f = +p[1] || m,
                h = e.querySelector('.line-highlight[data-range="' + o + '"]') || document.createElement("div");
            if (h.setAttribute("aria-hidden", "true"), h.setAttribute("data-range", o), h.className = (i || "") + " line-highlight", u && Prism.plugins.lineNumbers) {
                var g = Prism.plugins.lineNumbers.getLine(e, m), y = Prism.plugins.lineNumbers.getLine(e, f);
                g && (h.style.top = g.offsetTop + "px"), y && (h.style.height = y.offsetTop - g.offsetTop + y.offsetHeight + "px")
            } else h.setAttribute("data-start", m), f > m && h.setAttribute("data-end", f), h.style.top = (m - a - 1) * d + "px", h.textContent = new Array(f - m + 2).join(" \n");
            u ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h)
        }
    }

    function i() {
        var t = location.hash.slice(1);
        e(".temporary.line-highlight").forEach(function (e) {
            e.parentNode.removeChild(e)
        });
        var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
        if (i && !document.getElementById(t)) {
            var r = t.slice(0, t.lastIndexOf(".")), o = document.getElementById(r);
            o && (o.hasAttribute("data-line") || o.setAttribute("data-line", ""), n(o, i, "temporary "), document.querySelector(".temporary.line-highlight").scrollIntoView())
        }
    }

    if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
        var r = function () {
            var e;
            return function () {
                if ("undefined" == typeof e) {
                    var t = document.createElement("div");
                    t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = 0, t.style.border = 0, t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t)
                }
                return e
            }
        }(), o = 0;
        Prism.hooks.add("before-sanity-check", function (t) {
            var n = t.element.parentNode, i = n && n.getAttribute("data-line");
            if (n && i && /pre/i.test(n.nodeName)) {
                var r = 0;
                e(".line-highlight", n).forEach(function (e) {
                    r += e.textContent.length, e.parentNode.removeChild(e)
                }), r && /^( \n)+$/.test(t.code.slice(-r)) && (t.code = t.code.slice(0, -r))
            }
        }), Prism.hooks.add("complete", function l(e) {
            var r = e.element.parentNode, a = r && r.getAttribute("data-line");
            if (r && a && /pre/i.test(r.nodeName)) {
                clearTimeout(o);
                var s = Prism.plugins.lineNumbers, d = e.plugins && e.plugins.lineNumbers;
                t(r, "line-numbers") && s && !d ? Prism.hooks.add("line-numbers", l) : (n(r, a), o = setTimeout(i, 1))
            }
        }), window.addEventListener("hashchange", i), window.addEventListener("resize", function () {
            var e = document.querySelectorAll("pre[data-line]");
            Array.prototype.forEach.call(e, function (e) {
                n(e)
            })
        })
    }
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var e = "line-numbers", t = /\n(?!$)/g, n = function (e) {
            var n = r(e), s = n["white-space"];
            if ("pre-wrap" === s || "pre-line" === s) {
                var l = e.querySelector("code"), i = e.querySelector(".line-numbers-rows"),
                    a = e.querySelector(".line-numbers-sizer"), o = l.textContent.split(t);
                a || (a = document.createElement("span"), a.className = "line-numbers-sizer", l.appendChild(a)), a.style.display = "block", o.forEach(function (e, t) {
                    a.textContent = e || "\n";
                    var n = a.getBoundingClientRect().height;
                    i.children[t].style.height = n + "px"
                }), a.textContent = "", a.style.display = "none"
            }
        }, r = function (e) {
            return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
        };
        window.addEventListener("resize", function () {
            Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n)
        }), Prism.hooks.add("complete", function (e) {
            if (e.code) {
                var r = e.element.parentNode, s = /\s*\bline-numbers\b\s*/;
                if (r && /pre/i.test(r.nodeName) && (s.test(r.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
                    s.test(e.element.className) && (e.element.className = e.element.className.replace(s, " ")), s.test(r.className) || (r.className += " line-numbers");
                    var l, i = e.code.match(t), a = i ? i.length + 1 : 1, o = new Array(a + 1);
                    o = o.join("<span></span>"), l = document.createElement("span"), l.setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = o, r.hasAttribute("data-start") && (r.style.counterReset = "linenumber " + (parseInt(r.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), n(r), Prism.hooks.run("line-numbers", e)
                }
            }
        }), Prism.hooks.add("line-numbers", function (e) {
            e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
        }), Prism.plugins.lineNumbers = {
            getLine: function (t, n) {
                if ("PRE" === t.tagName && t.classList.contains(e)) {
                    var r = t.querySelector(".line-numbers-rows"), s = parseInt(t.getAttribute("data-start"), 10) || 1,
                        l = s + (r.children.length - 1);
                    s > n && (n = s), n > l && (n = l);
                    var i = n - s;
                    return r.children[i]
                }
            }
        }
    }
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var t = [], e = {}, n = function () {
        };
        Prism.plugins.toolbar = {};
        var a = Prism.plugins.toolbar.registerButton = function (n, a) {
            var o;
            o = "function" == typeof a ? a : function (t) {
                var e;
                return "function" == typeof a.onClick ? (e = document.createElement("button"), e.type = "button", e.addEventListener("click", function () {
                    a.onClick.call(this, t)
                })) : "string" == typeof a.url ? (e = document.createElement("a"), e.href = a.url) : e = document.createElement("span"), e.textContent = a.text, e
            }, t.push(e[n] = o)
        }, o = Prism.plugins.toolbar.hook = function (a) {
            var o = a.element.parentNode;
            if (o && /pre/i.test(o.nodeName) && !o.parentNode.classList.contains("code-toolbar")) {
                var r = document.createElement("div");
                r.classList.add("code-toolbar"), o.parentNode.insertBefore(r, o), r.appendChild(o);
                var i = document.createElement("div");
                i.classList.add("toolbar"), document.body.hasAttribute("data-toolbar-order") && (t = document.body.getAttribute("data-toolbar-order").split(",").map(function (t) {
                    return e[t] || n
                })), t.forEach(function (t) {
                    var e = t(a);
                    if (e) {
                        var n = document.createElement("div");
                        n.classList.add("toolbar-item"), n.appendChild(e), i.appendChild(n)
                    }
                }), r.appendChild(i)
            }
        };
        a("label", function (t) {
            var e = t.element.parentNode;
            if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
                var n, a, o = e.getAttribute("data-label");
                try {
                    a = document.querySelector("template#" + o)
                } catch (r) {
                }
                return a ? n = a.content : (e.hasAttribute("data-url") ? (n = document.createElement("a"), n.href = e.getAttribute("data-url")) : n = document.createElement("span"), n.textContent = o), n
            }
        }), Prism.hooks.add("complete", o)
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && self.document && Function.prototype.bind) {
        var e = {
                gradient: {
                    create: function () {
                        var e = {}, s = function (e, s, i) {
                            var t = "180deg";
                            return /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(i[0]) && (t = i.shift(), t.indexOf("to ") < 0 && (t.indexOf("top") >= 0 ? t = t.indexOf("left") >= 0 ? "to bottom right" : t.indexOf("right") >= 0 ? "to bottom left" : "to bottom" : t.indexOf("bottom") >= 0 ? t = t.indexOf("left") >= 0 ? "to top right" : t.indexOf("right") >= 0 ? "to top left" : "to top" : t.indexOf("left") >= 0 ? t = "to right" : t.indexOf("right") >= 0 ? t = "to left" : e && (t.indexOf("deg") >= 0 ? t = 90 - parseFloat(t) + "deg" : t.indexOf("rad") >= 0 && (t = Math.PI / 2 - parseFloat(t) + "rad")))), s + "(" + t + "," + i.join(",") + ")"
                        }, i = function (e, s, i) {
                            if (i[0].indexOf("at") < 0) {
                                var t = "center", a = "ellipse", r = "farthest-corner";
                                if (/\bcenter|top|right|bottom|left\b|^\d+/.test(i[0]) && (t = i.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, "")), /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(i[0])) {
                                    var n = i.shift().split(/\s+/);
                                    !n[0] || "circle" !== n[0] && "ellipse" !== n[0] || (a = n.shift()), n[0] && (r = n.shift()), "cover" === r ? r = "farthest-corner" : "contain" === r && (r = "clothest-side")
                                }
                                return s + "(" + a + " " + r + " at " + t + "," + i.join(",") + ")"
                            }
                            return s + "(" + i.join(",") + ")"
                        }, t = function (t) {
                            if (e[t]) return e[t];
                            var a = t.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/),
                                r = a && a[1], n = a && a[2],
                                l = t.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, "").split(/\s*,\s*/);
                            return e[t] = n.indexOf("linear") >= 0 ? s(r, n, l) : n.indexOf("radial") >= 0 ? i(r, n, l) : n + "(" + l.join(",") + ")"
                        };
                        return function () {
                            new Prism.plugins.Previewer("gradient", function (e) {
                                return this.firstChild.style.backgroundImage = "", this.firstChild.style.backgroundImage = t(e), !!this.firstChild.style.backgroundImage
                            }, "*", function () {
                                this._elt.innerHTML = "<div></div>"
                            })
                        }
                    }(),
                    tokens: {
                        gradient: {
                            pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
                            inside: {"function": /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        sass: [{
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, angle: {
                    create: function () {
                        new Prism.plugins.Previewer("angle", function (e) {
                            var s, i, t = parseFloat(e), a = e.match(/[a-z]+$/i);
                            if (!t || !a) return !1;
                            switch (a = a[0]) {
                                case"deg":
                                    s = 360;
                                    break;
                                case"grad":
                                    s = 400;
                                    break;
                                case"rad":
                                    s = 2 * Math.PI;
                                    break;
                                case"turn":
                                    s = 1
                            }
                            return i = 100 * t / s, i %= 100, this[(0 > t ? "set" : "remove") + "Attribute"]("data-negative", ""), this.querySelector("circle").style.strokeDasharray = Math.abs(i) + ",500", !0
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
                        })
                    },
                    tokens: {angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i},
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }, {
                            lang: "sass",
                            before: "operator",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "func",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, color: {
                    create: function () {
                        new Prism.plugins.Previewer("color", function (e) {
                            return this.style.backgroundColor = "", this.style.backgroundColor = e, !!this.style.backgroundColor
                        })
                    },
                    tokens: {
                        color: {
                            pattern: /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
                            inside: {"function": /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, easing: {
                    create: function () {
                        new Prism.plugins.Previewer("easing", function (e) {
                            e = {
                                linear: "0,0,1,1",
                                ease: ".25,.1,.25,1",
                                "ease-in": ".42,0,1,1",
                                "ease-out": "0,0,.58,1",
                                "ease-in-out": ".42,0,.58,1"
                            }[e] || e;
                            var s = e.match(/-?\d*\.?\d+/g);
                            if (4 === s.length) {
                                s = s.map(function (e, s) {
                                    return 100 * (s % 2 ? 1 - e : e)
                                }), this.querySelector("path").setAttribute("d", "M0,100 C" + s[0] + "," + s[1] + ", " + s[2] + "," + s[3] + ", 100,0");
                                var i = this.querySelectorAll("line");
                                return i[0].setAttribute("x2", s[0]), i[0].setAttribute("y2", s[1]), i[1].setAttribute("x2", s[2]), i[1].setAttribute("y2", s[3]), !0
                            }
                            return !1
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /></svg>'
                        })
                    },
                    tokens: {
                        easing: {
                            pattern: /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i,
                            inside: {"function": /[\w-]+(?=\()/, punctuation: /[(),]/}
                        }
                    },
                    languages: {
                        css: !0,
                        less: !0,
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            before: "punctuation",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }, {
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }, time: {
                    create: function () {
                        new Prism.plugins.Previewer("time", function (e) {
                            var s = parseFloat(e), i = e.match(/[a-z]+$/i);
                            return s && i ? (i = i[0], this.querySelector("circle").style.animationDuration = 2 * s + i, !0) : !1
                        }, "*", function () {
                            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
                        })
                    },
                    tokens: {time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i},
                    languages: {
                        css: !0,
                        less: !0,
                        markup: {
                            lang: "markup",
                            before: "punctuation",
                            inside: "inside",
                            root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
                        },
                        sass: [{
                            lang: "sass",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["property-line"]
                        }, {
                            lang: "sass",
                            before: "operator",
                            inside: "inside",
                            root: Prism.languages.sass && Prism.languages.sass["variable-line"]
                        }],
                        scss: !0,
                        stylus: [{
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
                        }, {
                            lang: "stylus",
                            before: "hexcode",
                            inside: "rest",
                            root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
                        }]
                    }
                }
            }, s = function (e) {
                var s = e.getBoundingClientRect(), i = s.left, t = s.top,
                    a = document.documentElement.getBoundingClientRect();
                return i -= a.left, t -= a.top, {
                    top: t,
                    right: innerWidth - i - s.width,
                    bottom: innerHeight - t - s.height,
                    left: i,
                    width: s.width,
                    height: s.height
                }
            }, i = /(?:^|\s)token(?=$|\s)/, t = /(?:^|\s)active(?=$|\s)/g, a = /(?:^|\s)flipped(?=$|\s)/g,
            r = function (e, s, i, t) {
                this._elt = null, this._type = e, this._clsRegexp = RegExp("(?:^|\\s)" + e + "(?=$|\\s)"), this._token = null, this.updater = s, this._mouseout = this.mouseout.bind(this), this.initializer = t;
                var a = this;
                i || (i = ["*"]), "Array" !== Prism.util.type(i) && (i = [i]), i.forEach(function (e) {
                    "string" != typeof e && (e = e.lang), r.byLanguages[e] || (r.byLanguages[e] = []), r.byLanguages[e].indexOf(a) < 0 && r.byLanguages[e].push(a)
                }), r.byType[e] = this
            };
        r.prototype.init = function () {
            this._elt || (this._elt = document.createElement("div"), this._elt.className = "prism-previewer prism-previewer-" + this._type, document.body.appendChild(this._elt), this.initializer && this.initializer())
        }, r.prototype.isDisabled = function (e) {
            do if (e.hasAttribute && e.hasAttribute("data-previewers")) {
                var s = e.getAttribute("data-previewers");
                return -1 === (s || "").split(/\s+/).indexOf(this._type)
            } while (e = e.parentNode);
            return !1
        }, r.prototype.check = function (e) {
            if (!i.test(e.className) || !this.isDisabled(e)) {
                do if (i.test(e.className) && this._clsRegexp.test(e.className)) break; while (e = e.parentNode);
                e && e !== this._token && (this._token = e, this.show())
            }
        }, r.prototype.mouseout = function () {
            this._token.removeEventListener("mouseout", this._mouseout, !1), this._token = null, this.hide()
        }, r.prototype.show = function () {
            if (this._elt || this.init(), this._token) if (this.updater.call(this._elt, this._token.textContent)) {
                this._token.addEventListener("mouseout", this._mouseout, !1);
                var e = s(this._token);
                this._elt.className += " active", e.top - this._elt.offsetHeight > 0 ? (this._elt.className = this._elt.className.replace(a, ""), this._elt.style.top = e.top + "px", this._elt.style.bottom = "") : (this._elt.className += " flipped", this._elt.style.bottom = e.bottom + "px", this._elt.style.top = ""), this._elt.style.left = e.left + Math.min(200, e.width / 2) + "px"
            } else this.hide()
        }, r.prototype.hide = function () {
            this._elt.className = this._elt.className.replace(t, "")
        }, r.byLanguages = {}, r.byType = {}, r.initEvents = function (e, s) {
            var i = [];
            r.byLanguages[s] && (i = i.concat(r.byLanguages[s])), r.byLanguages["*"] && (i = i.concat(r.byLanguages["*"])), e.addEventListener("mouseover", function (e) {
                var s = e.target;
                i.forEach(function (e) {
                    e.check(s)
                })
            }, !1)
        }, Prism.plugins.Previewer = r, Prism.hooks.add("before-highlight", function (s) {
            for (var i in e) {
                var t = e[i].languages;
                if (s.language && t[s.language] && !t[s.language].initialized) {
                    var a = t[s.language];
                    "Array" !== Prism.util.type(a) && (a = [a]), a.forEach(function (a) {
                        var r, n, l, o;
                        a === !0 ? (r = "important", n = s.language, a = s.language) : (r = a.before || "important", n = a.inside || a.lang, l = a.root || Prism.languages, o = a.skip, a = s.language), !o && Prism.languages[a] && (Prism.languages.insertBefore(n, r, e[i].tokens, l), s.grammar = Prism.languages[a], t[s.language] = {initialized: !0})
                    })
                }
            }
        }), Prism.hooks.add("after-highlight", function (e) {
            (r.byLanguages["*"] || r.byLanguages[e.language]) && r.initEvents(e.element, e.language)
        });
        for (var n in e) e[n].create()
    }
}();
