import { dispatcher } from "../../Helper/middleware/appDispatcher";
import { CommonConstant } from "../../Helper/constants/common.constant";
import { StudentConstant } from "../../Helper/constants/student.constanct";
var EventEmitter = require("events").EventEmitter;

const CHANGE_EVENT = "change";
let _data = [];
let selectedNationality = [];

class CommonStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getData() {
    return _data;
  }

  getSelectedNationality() {
    return selectedNationality;
  }
}

const commonStore = new CommonStore();

dispatcher.register((event) => {
  switch (event.actionType) {
    case CommonConstant.NATIONALITY:
      _data = event.data;
      commonStore.emitChange();
      break;
    case CommonConstant.GETNATIONALITY: 
      selectedNationality = event.data;
      commonStore.emitChange();
      break;
    case CommonConstant.SETGETNATIONALITY:
      _data = event.data;
      commonStore.emitChange();
      break;

    default:
  }
});

export default commonStore;
