import { dispatcher } from "../../Helper/middleware/appDispatcher";
import { StudentConstant } from "../../Helper/constants/student.constanct";
var EventEmitter = require("events").EventEmitter;

const CHANGE_EVENT = "change";
let _studentData = [];
let _familymemebrs = [];

class StudentStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getStudentData() {
    return _studentData.sort((a, b) => a.ID - b.ID);
  }

  getFamilyMembers() {
    return _familymemebrs;
  }
}

const store = new StudentStore();

dispatcher.register((event) => {
  switch (event.actionType) {
    case StudentConstant.GET:
      _studentData = event.data;
      store.emitChange();
      break;
    case StudentConstant.ADD:
      if (_studentData.filter((x) => x.ID === event.data.ID).length === 0)
        _studentData.push(event.data);
      store.emitChange();
      break;
    case StudentConstant.UPDATE:
      _studentData = _studentData.filter((x) => x.ID !== event.data.ID);
      _studentData.push(event.data);
      store.emitChange();
      break;
    case StudentConstant.GETFAMILYMEMBERS:
      _familymemebrs = event.data;
      store.emitChange();
      break;
    case StudentConstant.ADDFAMILYMEMBER:
      _familymemebrs = _familymemebrs.filter((x) => x.ID !== event.data.ID);
      _familymemebrs.push(event.data);

      store.emitChange();
      break;
    case StudentConstant.UPDATEFAMILYMEMBER:
      _familymemebrs = _familymemebrs.filter(
        (x) => parseInt(x.ID || 0) !== parseInt(event.data.ID || 0)
      );
      _familymemebrs.push(event.data);
      store.emitChange();
      break;
    case StudentConstant.DELETEFAMILYMEMBER:
      _familymemebrs = _familymemebrs.filter(
        (x) => parseInt(x.ID || 0) !== parseInt(event.data.ID || 0)
      );
      store.emitChange();
      break;
    default:
  }
});

export default store;
