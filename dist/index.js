var Y = Object.defineProperty;
var Z = (e, t, r) => t in e ? Y(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var h = (e, t, r) => Z(e, typeof t != "symbol" ? t + "" : t, r);
import { useSyncExternalStore as L } from "react";
function _e(e) {
  return function(r) {
    return L(e.subscribe, () => r(e.get()));
  };
}
function ye(e) {
  return function() {
    return (r) => {
      e.set(r);
    };
  };
}
var W = Symbol.for("immer-nothing"), R = Symbol.for("immer-draftable"), u = Symbol.for("immer-state"), V = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function f(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = V[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var m = Object.getPrototypeOf;
function p(e) {
  return !!e && !!e[u];
}
function _(e) {
  var t;
  return e ? H(e) || Array.isArray(e) || !!e[R] || !!((t = e.constructor) != null && t[R]) || O(e) || D(e) : !1;
}
var ee = Object.prototype.constructor.toString();
function H(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = m(e);
  if (t === null)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return r === Object ? !0 : typeof r == "function" && Function.toString.call(r) === ee;
}
function w(e, t) {
  z(e) === 0 ? Reflect.ownKeys(e).forEach((r) => {
    t(r, e[r], e);
  }) : e.forEach((r, n) => t(n, r, e));
}
function z(e) {
  const t = e[u];
  return t ? t.type_ : Array.isArray(e) ? 1 : O(e) ? 2 : D(e) ? 3 : 0;
}
function N(e, t) {
  return z(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function B(e, t, r) {
  const n = z(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function te(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function O(e) {
  return e instanceof Map;
}
function D(e) {
  return e instanceof Set;
}
function d(e) {
  return e.copy_ || e.base_;
}
function v(e, t) {
  if (O(e))
    return new Map(e);
  if (D(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = H(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[u];
    let i = Reflect.ownKeys(n);
    for (let o = 0; o < i.length; o++) {
      const s = i[o], c = n[s];
      c.writable === !1 && (c.writable = !0, c.configurable = !0), (c.get || c.set) && (n[s] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: c.enumerable,
        value: e[s]
      });
    }
    return Object.create(m(e), n);
  } else {
    const n = m(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function x(e, t = !1) {
  return E(e) || p(e) || !_(e) || (z(e) > 1 && (e.set = e.add = e.clear = e.delete = re), Object.freeze(e), t && Object.entries(e).forEach(([r, n]) => x(n, !0))), e;
}
function re() {
  f(2);
}
function E(e) {
  return Object.isFrozen(e);
}
var ne = {};
function y(e) {
  const t = ne[e];
  return t || f(0, e), t;
}
var P;
function G() {
  return P;
}
function ie(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function j(e, t) {
  t && (y("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function C(e) {
  k(e), e.drafts_.forEach(oe), e.drafts_ = null;
}
function k(e) {
  e === P && (P = e.parent_);
}
function $(e) {
  return P = ie(P, e);
}
function oe(e) {
  const t = e[u];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function U(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[u].modified_ && (C(t), f(4)), _(e) && (e = g(t, e), t.parent_ || S(t, e)), t.patches_ && y("Patches").generateReplacementPatches_(
    r[u].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = g(t, r, []), C(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== W ? e : void 0;
}
function g(e, t, r) {
  if (E(t))
    return t;
  const n = t[u];
  if (!n)
    return w(
      t,
      (i, o) => K(e, n, t, i, o, r)
    ), t;
  if (n.scope_ !== e)
    return t;
  if (!n.modified_)
    return S(e, n.base_, !0), n.base_;
  if (!n.finalized_) {
    n.finalized_ = !0, n.scope_.unfinalizedDrafts_--;
    const i = n.copy_;
    let o = i, s = !1;
    n.type_ === 3 && (o = new Set(i), i.clear(), s = !0), w(
      o,
      (c, l) => K(e, n, i, c, l, r, s)
    ), S(e, i, !1), r && e.patches_ && y("Patches").generatePatches_(
      n,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return n.copy_;
}
function K(e, t, r, n, i, o, s) {
  if (process.env.NODE_ENV !== "production" && i === r && f(5), p(i)) {
    const c = o && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !N(t.assigned_, n) ? o.concat(n) : void 0, l = g(e, i, c);
    if (B(r, n, l), p(l))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else s && r.add(i);
  if (_(i) && !E(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    g(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && Object.prototype.propertyIsEnumerable.call(r, n) && S(e, i);
  }
}
function S(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && x(t, r);
}
function se(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : G(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let i = n, o = M;
  r && (i = [n], o = b);
  const { revoke: s, proxy: c } = Proxy.revocable(i, o);
  return n.draft_ = c, n.revoke_ = s, c;
}
var M = {
  get(e, t) {
    if (t === u)
      return e;
    const r = d(e);
    if (!N(r, t))
      return ce(e, r, t);
    const n = r[t];
    return e.finalized_ || !_(n) ? n : n === F(e.base_, t) ? (A(e), e.copy_[t] = T(n, e)) : n;
  },
  has(e, t) {
    return t in d(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(d(e));
  },
  set(e, t, r) {
    const n = X(d(e), t);
    if (n != null && n.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = F(d(e), t), o = i == null ? void 0 : i[u];
      if (o && o.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (te(r, i) && (r !== void 0 || N(e.base_, t)))
        return !0;
      A(e), I(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return F(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, A(e), I(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = d(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    f(11);
  },
  getPrototypeOf(e) {
    return m(e.base_);
  },
  setPrototypeOf() {
    f(12);
  }
}, b = {};
w(M, (e, t) => {
  b[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
b.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && f(13), b.set.call(this, e, t, void 0);
};
b.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && f(14), M.set.call(this, e[0], t, r, e[0]);
};
function F(e, t) {
  const r = e[u];
  return (r ? d(r) : e)[t];
}
function ce(e, t, r) {
  var i;
  const n = X(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = n.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function X(e, t) {
  if (!(t in e))
    return;
  let r = m(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = m(r);
  }
}
function I(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && I(e.parent_));
}
function A(e) {
  e.copy_ || (e.copy_ = v(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var fe = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const o = r;
        r = t;
        const s = this;
        return function(l = o, ...J) {
          return s.produce(l, (Q) => r.call(this, Q, ...J));
        };
      }
      typeof r != "function" && f(6), n !== void 0 && typeof n != "function" && f(7);
      let i;
      if (_(t)) {
        const o = $(this), s = T(t, void 0);
        let c = !0;
        try {
          i = r(s), c = !1;
        } finally {
          c ? C(o) : k(o);
        }
        return j(o, n), U(i, o);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === W && (i = void 0), this.autoFreeze_ && x(i, !0), n) {
          const o = [], s = [];
          y("Patches").generateReplacementPatches_(t, i, o, s), n(o, s);
        }
        return i;
      } else
        f(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (s, ...c) => this.produceWithPatches(s, (l) => t(l, ...c));
      let n, i;
      return [this.produce(t, r, (s, c) => {
        n = s, i = c;
      }), n, i];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    _(e) || f(8), p(e) && (e = ue(e));
    const t = $(this), r = T(e, void 0);
    return r[u].isManual_ = !0, k(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[u];
    (!r || !r.isManual_) && f(9);
    const { scope_: n } = r;
    return j(n, t), U(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = y("Patches").applyPatches_;
    return p(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function T(e, t) {
  const r = O(e) ? y("MapSet").proxyMap_(e, t) : D(e) ? y("MapSet").proxySet_(e, t) : se(e, t);
  return (t ? t.scope_ : G()).drafts_.push(r), r;
}
function ue(e) {
  return p(e) || f(10, e), q(e);
}
function q(e) {
  if (!_(e) || E(e))
    return e;
  const t = e[u];
  let r;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = v(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    r = v(e, !0);
  return w(r, (n, i) => {
    B(r, n, q(i));
  }), t && (t.finalized_ = !1), r;
}
var a = new fe(), ae = a.produce;
a.produceWithPatches.bind(
  a
);
a.setAutoFreeze.bind(a);
a.setUseStrictShallowCopy.bind(a);
a.applyPatches.bind(a);
a.createDraft.bind(a);
a.finishDraft.bind(a);
class he {
  constructor(t) {
    h(this, "state");
    h(this, "listeners", /* @__PURE__ */ new Set());
    h(this, "get", () => this.state);
    h(this, "set", (t) => {
      const r = typeof t == "function" ? ae(this.state, t) : { ...this.state, ...t };
      r !== this.state && (this.state = r, this.listeners.forEach((n) => n(this.state)));
    });
    h(this, "subscribe", (t) => (this.listeners.add(t), () => {
      this.listeners.delete(t);
    }));
    this.state = t;
  }
}
export {
  he as Store,
  _e as createSelectorHook,
  ye as createUpdateStoreHook
};
