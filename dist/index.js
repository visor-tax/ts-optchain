"use strict";
/**
 * Copyright (C) 2018-present, Rimeto, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Proxies access to the passed object to support optional chaining w/ default values.
 * To look at a property deep in a tree-like structure, invoke it as a function passing an optional
 * default value.
 *
 * @example
 *   // Given:
 *   const x = oc<T>({
 *     a: 'hello',
 *     b: { d: 'world' },
 *     c: [-100, 200, -300],
 *   });
 *
 *   // Then:
 *   x.a() === 'hello'
 *   x.b.d() === 'world'
 *   x.c[0]() === -100
 *   x.c[100]() === undefined
 *   x.c[100](1234) === 1234
 *   x.c.map((e) => e()) === [-100, 200, -300]
 *   x.d.e() === undefined
 *   x.d.e('optional default value') === 'optional default value'
 *   (x as any).y.z.a.b.c.d.e.f.g.h.i.j.k() === undefined
 */
function oc(data, parentKey) {
    return new Proxy((function (defaultValue) {
        return data == null ? defaultValue : data;
    }), {
        get: function (target, key) {
            if (key === '_err') {
                return (function (errorMsg) {
                    if (data == null) {
                        throw new Error(errorMsg || String(parentKey) + " is not set");
                    }
                    return data;
                });
            }
            var obj = target();
            return oc(typeof obj === 'object' ? obj[key] : undefined, key);
        },
    });
}
exports.oc = oc;
