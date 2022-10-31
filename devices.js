! function() {
                                "use strict";
                                const e = "undefined" != typeof window ? window.navigator?.userAgent : void 0;
                                const t = !(!e || (n = e, !n.match(/AppleWebKit\//) || n.match(/Chrome\//) || n.match(/Chromium\//)));
                                var n;

                                function o() {
                                        Array.from(document.querySelectorAll("svg")).forEach((e => {
                                                const t = e.style.display || "block";
                                                e.style.display = "none", e.offsetHeight, e.style.display = t
                                        }))
                                }

                                function i() {
                                        Array.from(document.querySelectorAll("video")).forEach((e => {
                                                window.requestAnimationFrame((() => {
                                                        e.style.position = "fixed", window.setTimeout((() => {
                                                                e.style.position = ""
                                                        }))
                                                }))
                                        }))
                                }

                                function r(e) {
                                        if (0 !== e.getBoundingClientRect().width) return;
                                        const t = Array.from(e.children).map((e => e));
                                        t.forEach(((e, n) => {
                                                if (e.hasAttribute("data-foreign-object-container")) e.style.transformOrigin = "", e.style.transform = "", e.style.clipPath = "";
                                                else {
                                                        const o = document.createElement("div");
                                                        o.setAttribute("data-foreign-object-container", ""), e.insertAdjacentElement("beforebegin", o), e.remove(), o.append(e), t[n] = o
                                                }
                                        }));
                                        const n = e.closest("svg")?.getBoundingClientRect(),
                                                o = e.getScreenCTM();
                                        if (!o || !n) return;
                                        const {
                                                a: i,
                                                b: r,
                                                c: a,
                                                d: c,
                                                e: s,
                                                f: d
                                        } = o, f = e.x?.baseVal.value ?? 0, l = e.y?.baseVal.value ?? 0;
                                        t.forEach((e => {
                                                if (!e.hasAttribute("data-foreign-object-container")) return;
                                                const {
                                                        style: t
                                                } = e;
                                                t.transformOrigin = `${-f}px ${-l}px`, t.transform = `matrix(${i}, ${r}, ${a}, ${c}, ${s-n.left}, ${d-n.top})`;
                                                const o = (n.top - d) / i,
                                                        u = (n.left - s) / i,
                                                        m = o + n.height / i,
                                                        p = u + n.width / i;
                                                t.clipPath = `polygon(${u}px ${o}px, ${p}px ${o}px, ${p}px ${m}px, ${u}px ${m}px)`
                                        }))
                                }

                                function a() {
                                        const e = document.querySelectorAll("foreignObject");
                                        Array.from(e).forEach(r)
                                } [function() {
                                        t && (window.addEventListener("resize", o), window.addEventListener("DOMContentLoaded", o))
                                }, function() {
                                        t && (window.addEventListener("resize", a), window.addEventListener("DOMContentLoaded", a))
                                }, function() {
                                        t && window.addEventListener("DOMContentLoaded", i)
                                }].forEach((e => e()))
                        }();