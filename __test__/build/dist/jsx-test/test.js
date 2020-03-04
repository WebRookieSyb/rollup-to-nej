/**
* ------------------------------------------
* Rollup vue to nej
* @version  1.2.5
* @path  __test__/build/dist/jsx-test/test.js
* 
* You need to check the changes after packing
* ------------------------------------------
*/
NEJ.define(function () {

  var ShowFooter = {
    name: "ShowFooter",
    data: function data() {
      return {
        author: "aaa"
      };
    },
    methods: {
      changeName: function changeName() {
        this.author = this.author == "aaa" ? "lili" : "ccc";
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("div", {
        attrs: {
          id: "footer"
        }
      }, [h("span", ["Power by author: ", this.author]), h("button", {
        on: {
          "click": this.changeName
        }
      }, ["\u4FEE\u6539\u4F5C\u8005"]), h("br")]);
    }
  };

  var UI = {
    components: {
      ShowFooter: ShowFooter
    },
    data: function data() {
      return {
        author: [1, 2, 3]
      };
    },
    render: function render() {
      var h = arguments[0];
      return h("div", [h("p", ["\u6211\u662Fjsx"]), h("show-footer")]);
    }
  };

  MyComponent = Vue.extend(UI);

  return MyComponent;

});
