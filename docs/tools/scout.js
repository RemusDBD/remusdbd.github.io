/**
 * Fastly Insights.js
 * Version: 3.1.0
 * Generated: 2021-06-21
 * https://github.com/fastly/insights.js
 *
 * Copyright (c) 2021, Fastly, Inc. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var FASTLY = function() {
    "use strict";
    var e = function(t, n) {
        return (e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            })(t, n)
    };

    function t(t, n) {
        function r() {
            this.constructor = t
        }
        e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
    }
    var n, r = function() {
        return (r = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };
    ! function(e) {
        e[e.SendBeacon = 0] = "SendBeacon", e[e.ProviderConfigFetch = 1] = "ProviderConfigFetch", e[e.TestResourceFetch = 2] = "TestResourceFetch", e[e.TestExecution = 3] = "TestExecution"
    }(n || (n = {}));
    var o, i, s = "sendBeacon" in navigator;
    ! function(e) {
        e.Get = "GET", e.Post = "POST"
    }(o || (o = {})),
    function(e) {
        e[e.Success = 0] = "Success", e[e.Failure = 1] = "Failure", e[e.Unknown = 2] = "Unknown"
    }(i || (i = {}));
    var c = function(e) {
        return (t = e.map((function(e) {
            return function() {
                return e.execute()
            }
        })), t.reduce((function(e, t) {
            return e.then((function(e) {
                return t().then((function(t) {
                    return function() {
                        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                        var r = Array(e),
                            o = 0;
                        for (t = 0; t < n; t++)
                            for (var i = arguments[t], s = 0, c = i.length; s < c; s++, o++) r[o] = i[s];
                        return r
                    }(e, [t])
                })).catch((function() {
                    return Promise.resolve(e)
                }))
            }))
        }), Promise.resolve([]))).then((function(e) {
            return {
                testResults: e
            }
        }));
        var t
    };

    function u(e) {
        var t = e.providers.filter((function(e) {
            return e.shouldRun()
        }));
        return Promise.all(t.map((function(e) {
            return e.fetchSessionConfig()
        })).map((function(e) {
            return e.then((function(e) {
                return {
                    status: "fulfilled",
                    value: e
                }
            })).catch((function(e) {
                return {
                    status: "rejected",
                    reason: e
                }
            }))
        }))).then((function(n) {
            var r = [];
            return n.forEach((function(e, n) {
                if ("fulfilled" === e.status && "value" in e) {
                    var o = t[n];
                    o.setSessionConfig(e.value), r.push.apply(r, o.expandTasks())
                }
            })), (e.sessionProcess || c)(r)
        }))
    }
    var a = function() {
            function e() {
                this._value = {
                    preConfigStartDelay: 0,
                    providers: []
                }
            }
            return e.prototype.toSettings = function() {
                return this._value
            }, e.prototype.setPreConfigStartDelay = function(e) {
                this._value.preConfigStartDelay = e
            }, e.prototype.addProvider = function(e) {
                this._value.providers.push(e)
            }, e.prototype.setSessionProcessFunc = function(e) {
                this._value.sessionProcess = e
            }, e
        }(),
        f = function() {
            function e(e) {
                this._entries = e
            }
            return e.prototype.getEntries = function() {
                return this._entries
            }, e.prototype.getEntriesByType = function(e) {
                return this._entries.filter((function(t) {
                    return t.entryType === e
                }))
            }, e.prototype.getEntriesByName = function(e, t) {
                return this._entries.filter((function(t) {
                    return t.name === e
                })).filter((function(e) {
                    return !t || e.entryType === t
                }))
            }, e
        }(),
        p = ["mark", "measure", "navigation", "resource"],
        h = "Failed to execute 'observe' on 'PerformanceObserver': either an 'entryTypes' or 'type' member must be present.",
        l = function(e) {
            return p.some((function(t) {
                return e === t
            }))
        },
        d = new(function() {
            function e(e) {
                var t = void 0 === e ? {} : e,
                    n = t.registeredObservers,
                    r = void 0 === n ? new Set : n,
                    o = t.processedEntries,
                    i = void 0 === o ? new Set : o,
                    s = t.interval,
                    c = void 0 === s ? 100 : s,
                    u = t.context,
                    a = void 0 === u ? self : u;
                this.registeredObservers = r, this.processedEntries = i, this.interval = c, this.context = a, this.intervalId = null
            }
            return e.prototype.getNewEntries = function() {
                var e = this;
                return this.context.performance.getEntries().filter((function(t) {
                    return !e.processedEntries.has(t)
                }))
            }, e.prototype.getObserversForType = function(e, t) {
                return Array.from(e).filter((function(e) {
                    return e.entryTypes.some((function(e) {
                        return e === t
                    }))
                }))
            }, e.prototype.processBuffer = function(e) {
                var t = Array.from(e.buffer),
                    n = new f(t);
                e.buffer.clear(), t.length && e.callback && e.callback.call(void 0, n, e)
            }, e.prototype.processEntries = function() {
                var e = this;
                this.getNewEntries().forEach((function(t) {
                    var n = t.entryType;
                    e.getObserversForType(e.registeredObservers, n).forEach((function(e) {
                        e.buffer.add(t)
                    })), e.processedEntries.add(t)
                }));
                var t = function() {
                    return e.registeredObservers.forEach(e.processBuffer)
                };
                "requestAnimationFrame" in this.context ? this.context.requestAnimationFrame(t) : this.context.setTimeout(t, 0)
            }, e.prototype.add = function(e) {
                this.registeredObservers.add(e), 1 === this.registeredObservers.size && this.observe()
            }, e.prototype.remove = function(e) {
                this.registeredObservers.delete(e), this.registeredObservers.size || this.disconnect()
            }, e.prototype.observe = function() {
                this.intervalId = this.context.setInterval(this.processEntries.bind(this), this.interval)
            }, e.prototype.disconnect = function() {
                this.intervalId = this.context.clearInterval(this.intervalId)
            }, e
        }()),
        v = function() {
            function e(e, t) {
                void 0 === t && (t = d), this.entryTypes = [], this.callback = e, this.buffer = new Set, this.taskQueue = t
            }
            return e.prototype.observe = function(e) {
                if (!e) throw new Error(h);
                if (e.entryTypes && e.type) throw new Error("Failed to execute 'observe' on 'PerformanceObserver': either an 'entryTypes' or 'type' member must be present, not both.");
                var t;
                if (e.entryTypes) t = e.entryTypes;
                else {
                    if (!e.type) throw new Error(h);
                    t = [e.type]
                }
                var n = t.filter(l);
                n.length > 0 && n.length !== t.length && console.warn("Invalid or unsupported entry types provided to 'observe' on 'PerformanceObserver'."), n.length ? (this.entryTypes = n, this.taskQueue.add(this)) : console.warn("Aborting 'observe' on 'PerformanceObserver': no valid entry types present in either 'entryTypes' or 'type' member.")
            }, e.prototype.disconnect = function() {
                this.taskQueue.remove(this)
            }, e.prototype.takeRecords = function() {
                return Array.from(this.buffer)
            }, e
        }();
    v.supportedEntryTypes = p;
    var y, g = "PerformanceObserver" in self && "function" == typeof PerformanceObserver ? PerformanceObserver : v;

    function m(e, t, n) {
        return new Promise((function(r, o) {
            var i, s = new g((function(t, o) {
                var s = t.getEntriesByName(e);
                (i = function(e, t) {
                    for (var n = 0; n < e.length;) {
                        var r = e[n];
                        if (t(r)) return r;
                        n++
                    }
                }(s, n)) && (o.disconnect(), r(i))
            }));
            setTimeout((function() {
                i || (s.disconnect(), o(new Error("Timed out observing resource timing (" + e + ")")))
            }), t);
            try {
                s.observe({
                    entryTypes: ["resource"]
                })
            } catch (e) {
                o(e)
            }
        }))
    }! function(e) {
        e[e.NotStarted = 0] = "NotStarted", e[e.Error = 1] = "Error", e[e.Running = 2] = "Running", e[e.Finished = 3] = "Finished"
    }(y || (y = {}));
    var _ = function() {
            function e(e, t) {
                this._provider = e, this._config = t, this._state = y.NotStarted
            }
            return Object.defineProperty(e.prototype, "state", {
                get: function() {
                    return this._state
                },
                enumerable: !1,
                configurable: !0
            }), e.prototype.execute = function() {
                var e = this;
                return this._state = y.Running, this._provider.testSetUp(this._config).then((function(t) {
                    return e.test(t)
                })).then((function(t) {
                    return t.providerName = e._provider.name, t.beaconData = e._provider.makeBeaconData(e._config, t), e._provider.sendBeacon(e._config, e._provider.encodeBeaconData(e._config, t.beaconData)).then((function(t) {
                        e._provider.onSendBeaconResolved(t)
                    }), (function(t) {
                        e._provider.onSendBeaconRejected(t)
                    })), e._state = y.Finished, t
                })).then((function(t) {
                    return e._provider.testTearDown(t)
                })).catch((function() {
                    return e._state = y.Error, Promise.resolve({
                        providerName: e._provider.name,
                        testType: e._config.type,
                        data: [],
                        setupResult: {
                            data: {}
                        }
                    })
                }))
            }, e
        }(),
        b = function(e) {
            return 0 !== e.requestStart && e.connectStart !== e.connectEnd
        },
        w = function(e) {
            function n(t, n, r) {
                var o = this;
                return (o = e.call(this, t, n) || this)._isValidEntryFunc = b, r && (o._isValidEntryFunc = r), o
            }
            return t(n, e), n.prototype.test = function(e) {
                var t = this;
                return Promise.all([this.fetchObject(), m(this.getResourceUrl(), this._config.performanceTimingObserverTimeout || 5e3, this._isValidEntryFunc)]).then((function(n) {
                    var r = n[0],
                        o = n[1];
                    return t._provider.createFetchTestResult(o, r, t._config, e)
                }))
            }, n.prototype.getResourceUrl = function() {
                return this._provider.getResourceUrl(this._config)
            }, n.prototype.fetchObject = function() {
                var e = {},
                    t = this._provider.getResourceRequestHeaders(this._config);
                Object.keys(t).length && (e.headers = t);
                var n = new Request(this.getResourceUrl(), e);
                return fetch(n)
            }, n
        }(_);
    var O = function() {
        function e(e) {
            this._name = e
        }
        return e.prototype.getBeaconMethod = function(e) {
            return o.Post
        }, e.prototype.onSendBeaconRejected = function(e) {
            this.handleError(n.SendBeacon, e)
        }, e.prototype.onSendBeaconResolved = function(e) {}, Object.defineProperty(e.prototype, "name", {
            get: function() {
                return this._name
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.encodeBeaconData = function(e, t) {
            return JSON.stringify(t)
        }, e.prototype.sendBeacon = function(e, t) {
            return n = this.makeBeaconURL(e), r = t, (i = this.getBeaconMethod(e)) == o.Get ? fetch(n, {
                method: i,
                keepalive: !0
            }) : s ? navigator.sendBeacon(n, r) ? Promise.resolve() : Promise.reject(new Error("navigator.sendBeacon failed")) : fetch(n, {
                method: i,
                body: r,
                keepalive: !0
            });
            var n, r, i
        }, e.prototype.setSessionConfig = function(e) {
            this._sessionConfig = e
        }, Object.defineProperty(e.prototype, "sessionConfig", {
            get: function() {
                return this._sessionConfig
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.makeBeaconURL = function(e) {
            throw new Error("Method not implemented.")
        }, e.prototype.testSetUp = function(e) {
            return Promise.resolve({})
        }, e.prototype.testTearDown = function(e) {
            return Promise.resolve(e)
        }, e
    }();

    function T(e, t) {
        for (var n = t * Math.random(), r = 0, o = e[0].weight; o < n;) o += e[r += 1].weight;
        return r
    }
    var S, k = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            return t.reduce((function(e, t) {
                return function(n) {
                    return e(t(n))
                }
            }), e)
        }((function(e) {
            return Object.keys(e).reduce((function(t, n) {
                return t[n.replace(/(?:^|\.?)([A-Z])/g, (function(e, t) {
                    return "_" + t.toLowerCase()
                })).replace(/^_/, "")] = e[n], t
            }), {})
        }), (S = ["name", "initiatorType", "entryType", "toJSON"], function(e) {
            return function(e, t) {
                return Object.keys(e).reduce((function(n, r) {
                    return t.indexOf(r) < 0 && (n[r] = e[r]), n
                }), {})
            }(e, S)
        }), (function(e) {
            var t = {};
            for (var n in e) t[n] = e[n];
            return t
        })),
        E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        P = E.length;

    function R(e) {
        return e.replace(/\s/g, "")
    }

    function B(e) {
        var t = Array(16).fill(null).reduce((function(e) {
            return e + E.charAt(Math.floor(Math.random() * P))
        }), "");
        return e.replace(/<%RANDOM%>/gi, t)
    }

    function j(e, t) {
        return e.replace(/<%TEST_ID%>/gi, t.test.id)
    }
    var C = {};

    function F(e, t, n) {
        return void 0 === t && (t = 3), void 0 === n && (n = 100), new Promise((function(r, o) {
            e().then(r).catch((function(i) {
                return --t > 0 ? function(e) {
                    return new Promise((function(t) {
                        return setTimeout(t, e)
                    }))
                }(n).then((function() {
                    return F(e, t, n)
                })).then(r).catch(o) : o(i)
            }))
        }))
    }
    var D = function(e) {
        function n(t) {
            var n = e.call(this, "fastly") || this;
            return n._resourceCache = {}, n._configUrl = "https://fastly-insights.com/api/v1/config/" + t.token, n._libraryVersion = "1.0.1", n._maxTasks = t.max_tasks ? t.max_tasks : 10, n._sampleRate = t.sample_rate ? t.sample_rate : 1, t.config_url && "" !== t.config_url && (n._configUrl = t.config_url), t.library_version && "" !== t.library_version && (n._libraryVersion = t.library_version), n
        }
        return t(n, e), n.prototype.shouldRun = function() {
            return !(this._sampleRate > 0 && this._sampleRate < 1) || this._sampleRate > Math.random()
        }, n.prototype.fetchSessionConfig = function() {
            var e = this;
            return F((function() {
                return fetch(e._configUrl).then((function(e) {
                    return e.json()
                }))
            }))
        }, n.prototype.expandTasks = function() {
            var e = this,
                t = this.sessionConfig,
                n = t.client;
            return function(e, t) {
                if (t >= e.length) return e;
                for (var n, r = e.map((function(e) {
                        return Object.assign({}, e)
                    })), o = e.map((function(e) {
                        return e.weight
                    })).reduce((function(e, t) {
                        return e + t
                    })), i = e.map((function(e) {
                        return e.weight
                    })), s = Math.min((n = i).reduce((function(e, t) {
                        return e + t
                    })) / n.length, .05 * o), c = [], u = 0; u < t; u++) {
                    var a = {
                            weight: s
                        },
                        f = T(r.concat([a]), o + s);
                    f < r.length && (c.push(Object.assign({}, r[f])), o -= r[f].weight, r[f].weight = 0)
                }
                return c
            }(function(e, t) {
                return e.filter((function(e) {
                    var n = e.classification;
                    return Object.keys(n).reduce((function(e, r) {
                        var o = n[r];
                        return o ? e && o.some((function(e) {
                            return e === t[r]
                        })) : e
                    }), !0)
                }))
            }(t.tasks, n), this._maxTasks).map((function(t) {
                return new w(e, r(r({}, e.sessionConfig), t))
            }))
        }, n.prototype.createFetchTestResult = function(e, t, n, o) {
            var s, c = this,
                u = this.sessionConfig.hosts.lookup,
                a = this.sessionConfig.test.id;
            return (s = "https://" + a + "." + u + "/l", C[s] || (C[s] = fetch(s).then((function(e) {
                return e.json()
            }))), C[s]).then((function(s) {
                var u, a, f = t.headers.get("X-Datacenter") || "",
                    p = t.ok ? i.Success : i.Failure,
                    h = function() {
                        var e = navigator,
                            t = null == e ? void 0 : e.connection;
                        if (t) {
                            var n = {};
                            for (var r in t) {
                                var o = typeof t[r];
                                "number" !== o && "string" !== o && "boolean" !== o || (n[r] = t[r])
                            }
                            return n
                        }
                        return {}
                    }(),
                    l = Object.assign({
                        client_connection: h
                    }, (u = r({
                        id: f,
                        attempted_id: n.id
                    }, k(e)), a = "subject_", Object.keys(u).reduce((function(e, t) {
                        return e[a + t] = u[t], e
                    }), {}))),
                    d = {
                        state: p,
                        data: Object.assign({
                            task_client_data: JSON.stringify(l)
                        }, s),
                        testConfig: n
                    };
                return {
                    providerName: c.name,
                    beaconData: d,
                    testType: n.type,
                    data: [d],
                    setupResult: o
                }
            }))
        }, n.prototype.getResourceRequestHeaders = function() {
            return {}
        }, n.prototype.getResourceUrl = function(e) {
            var t = e.resource;
            return this._resourceCache[t] || (this._resourceCache[t] = function(e, t) {
                return [R, j, B].reduce((function(e, n) {
                    return n(e, t)
                }), e)
            }(e.resource, this.sessionConfig)), this._resourceCache[t]
        }, n.prototype.handleError = function(e, t) {}, n.prototype.makeBeaconData = function(e, t) {
            if (void 0 === t.beaconData) return {
                state: i.Failure,
                testConfig: e
            };
            var n = this.sessionConfig,
                r = n.test,
                o = n.settings,
                s = n.server;
            return Object.assign(t.beaconData, {
                data: Object.assign({
                    test_id: r.id,
                    test_api_key: o.token,
                    test_lib_version: this._libraryVersion,
                    test_server: JSON.stringify(s),
                    test_timestamp: Math.floor(Date.now() / 1e3),
                    task_type: e.type,
                    task_id: e.id,
                    task_schema_version: "0.0.0",
                    task_server_data: "<% SERVER_DATA %>"
                }, t.beaconData.data)
            })
        }, n.prototype.encodeBeaconData = function(e, t) {
            return JSON.stringify(t.data)
        }, n.prototype.makeBeaconURL = function() {
            var e = this.sessionConfig,
                t = e.session,
                n = e.settings;
            return "https://" + e.hosts.host + "/b?k=" + n.token + "&s=" + t
        }, n
    }(O);
    var x = function(e) {
            return e.hasAttribute("src")
        },
        A = function(e) {
            return e.getAttribute("src") || ""
        };
    var N, U, M = function(e, t) {
            var n;
            try {
                n = t.every((function(t) {
                    return function(e, t) {
                        var n;
                        try {
                            n = e.hasOwnProperty(t)
                        } catch (r) {
                            n = !("object" != typeof e || null === e || !(t in e) || void 0 === e[t])
                        }
                        return n && (e = e[t]), n
                    }(e, t)
                }))
            } catch (e) {
                n = !1
            }
            return n
        }(window, ["Promise", "fetch"]) && "getEntriesByType" in performance && "function" == typeof performance.getEntriesByType,
        L = {
            client: {
                hasFeatureSupport: M
            },
            results: window.FASTLY && window.FASTLY.results || []
        };
    if (M) {
        var I = function(e) {
                var t, n = (t = "script", [].slice.call(document.getElementsByTagName(t))).filter(x).find((function(t) {
                        return !!A(t).match(e)
                    })),
                    r = {};
                if (n) {
                    var o = A(n),
                        i = new URL(o);
                    r.host = i.origin, i.searchParams.forEach((function(e, t) {
                        r[t] = e
                    }))
                }
                return r
            }(/^https?:\/\/(localhost|[a-z]+\.fastly-insights\.com)/),
            V = new a,
            q = {
                config_url: (N = I, U = N.host, ("https://www.fastly-insights.com" === U ? "https://fastly-insights.com" : U) + "/api/v1/config/" + N.k),
                report_errors: !0,
                token: I.token
            };
        V.addProvider(new D(q)),
            function(e) {
                return ("complete" === document.readyState ? Promise.resolve() : new Promise((function(e) {
                    document.addEventListener("readystatechange", (function() {
                        "complete" === document.readyState && e()
                    }))
                }))).then((function() {
                    return e.preConfigStartDelay ? function(e, t) {
                        return new Promise((function(n) {
                            setTimeout((function() {
                                u(t).then((function(e) {
                                    return n(e)
                                }))
                            }), e)
                        }))
                    }(e.preConfigStartDelay, e) : u(e)
                }))
            }(V.toSettings()).then((function(e) {
                Array.prototype.push.apply(L.results, e.testResults.filter((function(e) {
                    return void 0 !== e.beaconData
                })).map((function(e) {
                    return e.beaconData.data
                })))
            }))
    }
    return L
}();
