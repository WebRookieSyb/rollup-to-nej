import ShowFooter from '../another/footer.jsx'
export default {
  components: {
      ShowFooter
  },
  data() {
    return {
      author: [1,2,3]
    };
  },
  render() {
    return (
      <div>
      <p>我是jsx</p>
      
      <show-footer></show-footer>
      </div>
    );
  }
}