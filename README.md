# rollup-to-nej

***Transform _.vue to _.js with nej define***

If you want to use Vue or Vue Jsx, you still need a \*.js to be entry file.

You can see how to use it in the examples file

## Usage

```sh
npm install

* build
roll build vue -i *** -o *** -s ***=***,***=***

* watch
roll dev vue -i *** -o *** -s ***=***,***=***
```

if you has a config file, you can use

```sh
npm install

* build
roll build vue

* watch
roll dev vue
```

## Support config

generate config file by:

```
roll init 
```


.rolltonejrc.json
use include to set real pack file

```json
{
  "input": "raw",
  "output": "src",
  "alias": {
    "@nej": "./src",
    "vueSrc": "../../",
    "***": "***"
  },
  "include": [
    "raw/button",
    "raw/tab/index.js"
  ]
}
```
## Support api

```js
const doRollup = require("rollup-to-nej");
doRollup.build("vue", {
  input: "raw",
  output: "src",
  alias: {
    "@nej": "./src",
    "vueSrc": "../../",
    "***": "***"
  }
});
```

---


## Config 

### alias

You can use alias to avoid public modules being packaged. 
use like `-s @nej=./src,vueSrc=../../` . Please note that if you use `@` , you can not use like `@**` or `*@*`

### removeComments

Remove comments after package. Use it in cli by `--removeComments`, or in params as `removeComments:true`

### externalHelpers

If you do not wish the babel helpers to be included in your bundle at all (but instead reference the global babelHelpers object), you may set the externalHelpers option to true and import babel-runtime in you code. Use it in cli by `--externalHelpers`, or in params as `externalHelpers:true`


## Example
demo.vue
```js
<template>
    <div class="uv-demmo">
        <div>{{txt}}</div>
        <!-- <other></other> -->
        <el-button type="text" @click="doClick">button</el-button>
    </div>
</template>

<script>
const Comp = {
    name: 'demo',
    components:{
    },
    props:{
    },
    data:()=>{
        return {
            txt:'test'
        }
    },
    methods: {
      doclick() {
        console.log('click')
      }
    }
}

export default Comp;
</script>

<style>
</style>
```
index.js
```js
import Demo from './demo.vue'
MyComponent = Vue.extend(Demo);
export default MyComponent
```
after packing
```js
/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.10
* @path  src/wap/javascript/vue/src/assistRank/index.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(function () {

    var Comp = {
      name: 'demo',
      components: {},
      props: {},
      data: function data() {
        return {
          txt: 'test'
        };
      },
      methods: {
        doclick: function doclick() {
          console.log('click');
        }
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    function createInjector(context) {
      return function (id, style) {
        return addStyle(id, style);
      };
    }

    var HEAD;
    var styles = {};

    function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });

      if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) style.element.setAttribute('media', css.media);

          if (HEAD === undefined) {
            HEAD = document.head || document.getElementsByTagName('head')[0];
          }

          HEAD.appendChild(style.element);
        }

        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          var index = style.ids.size - 1;
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
        }
      }
    }

    /* script */
    const __vue_script__ = Comp;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        { staticClass: "uv-demmo" },
        [
          _c("div", [_vm._v(_vm._s(_vm.txt))]),
          _vm._v(" "),
          _c("el-button", { attrs: { type: "text" }, on: { click: _vm.doClick } }, [
            _vm._v("button")
          ])
        ],
        1
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-1c1013d0_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: undefined, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    MyComponent = Vue.extend(__vue_component__);

    return MyComponent;

});
```