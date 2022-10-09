           const lang = navigator.language ? navigator.language : 'en';
                        fetch('_footer?lang=' + encodeURIComponent(lang)).then(response => {
                                response.text().then(footerStr => {
                                        const div = document.createElement('div');
                                        div.innerHTML = footerStr;
                                        for (const child of [...div.children]) {
                                                if (child.tagName.toLowerCase() !== 'script') {
                                                        document.body.append(child);
                                                }
                                        }
                                        (() => {
                                                ! function() {
                                                        "use strict";
                                                        const e = document.getElementById("modal_backdrop"),
                                                                t = document.getElementById("report_form"),
                                                                o = document.getElementById("report_button"),
                                                                n = document.getElementById("form_report"),
                                                                c = document.getElementById("form_cancel"),
                                                                s = document.getElementById("form_submit_reason"),
                                                                a = document.getElementById("form_go_back"),
                                                                d = document.getElementById("form_submit_captcha"),
                                                                l = document.getElementById("form_close"),
                                                                i = document.getElementById("report_reason_0"),
                                                                r = document.getElementById("error_message"),
                                                                m = document.getElementById("error_message_captcha"),
                                                                u = [document.getElementById("form_step_terms"), document.getElementById("form_step_report_reason"), document.getElementById("form_step_captcha"), document.getElementById("form_step_success")];

                                                        function p() {
                                                                e.classList.remove("active"), t.classList.remove("active"), o.classList.remove("active"), o.focus()
                                                        }

                                                        function E(e) {
                                                                u.forEach(((t, o) => {
                                                                        t.style.display = o === e ? "block" : "none"
                                                                }))
                                                        }
                                                        let _, y = !1;
                                                        const f = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? () => _ : () => {
                                                                const e = t.elements.namedItem("g-recaptcha-response");
                                                                return null == e ? void 0 : e.value
                                                        };
                                                        e.onclick = p, c.onclick = p, l.onclick = p, o.onclick = function() {
                                                                u.forEach(((e, t) => {
                                                                        e.style.display = 0 === t ? "block" : "none"
                                                                })), e.classList.add("active"), t.classList.add("active"), o.classList.add("active"), i.checked = !0, setTimeout((() => {
                                                                        i.focus()
                                                                }), 350)
                                                        }, n.onclick = () => E(1), s.onclick = () => {
                                                                E(2),
                                                                        function() {
                                                                                if (y) return;
                                                                                const e = document.createElement("script");
                                                                                console.log("our window captcha: ", window.C_CAPTCHA_IMPLEMENTATION, window.C_CAPTCHA_KEY), e.src = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? "https://cstaticdun.126.net/load.min.js" : "https://www.google.com/recaptcha/api.js", e.async = !0, e.defer = !0, document.head.appendChild(e), y = !0, e.onload = "NETEASE" === window.C_CAPTCHA_IMPLEMENTATION ? () => {
                                                                                        var e;
                                                                                        null === (e = window.initNECaptcha) || void 0 === e || e.call(window, {
                                                                                                captchaId: window.C_CAPTCHA_KEY,
                                                                                                element: "#netease-captcha",
                                                                                                protocol: "https",
                                                                                                width: "auto",
                                                                                                onVerify: (e, t) => {
                                                                                                        _ = t.validate
                                                                                                }
                                                                                        })
                                                                                } : () => {}
                                                                        }()
                                                        }, a.onclick = () => E(1), t.addEventListener("submit", (function(e) {
                                                                e.preventDefault(), r.style.display = "none", m.style.display = "none";
                                                                const t = function() {
                                                                                let e = "";
                                                                                const t = document.getElementsByName("report_reason");
                                                                                for (let o = 0; o < t.length; o++) {
                                                                                        const n = t[o];
                                                                                        !0 === n.checked && (e = n.value)
                                                                                }
                                                                                return e
                                                                        }(),
                                                                        o = f();
                                                                if (!o) return void(m.style.display = "block");
                                                                const n = {
                                                                                reason: t,
                                                                                challenge: o
                                                                        },
                                                                        c = window.location.origin + window.location.pathname + "/_api/report";
                                                                d.classList.add("loading"), fetch(c, {
                                                                        method: "POST",
                                                                        body: JSON.stringify(n),
                                                                        headers: {
                                                                                "Content-Type": "application/json; charset=utf-8"
                                                                        }
                                                                }).then((e => {
                                                                        d.classList.remove("loading"), e.ok ? E(3) : r.style.display = "block"
                                                                }))
                                                        }))
                                                }();
                                        })();
                                });
                        });