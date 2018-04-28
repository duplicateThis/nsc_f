import Vue from 'vue'

// import
import {
  Button,
  Row,
  Col,
  Input,
  MessageBox,
  Message
} from 'element-ui'

// use
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

