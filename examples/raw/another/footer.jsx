export default {
  name: "ShowFooter",
  data() {
    return {
      author: "aaa"
    };
  },
  methods: {
    changeName() {
      this.author = this.author == "aaa" ? "lili" : "ccc";
    }
  },
  render() {
    return (
      <div id="footer">
        <span>Power by author: {this.author}</span>
        <button onClick={this.changeName}>修改作者</button>
        <br />
      </div>
    );
  }
};