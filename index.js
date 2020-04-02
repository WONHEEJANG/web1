/* 코드를 작성해 보세요. */
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const calendar = new Calendar('#calendar', {
  defaultView: 'week',
  useCreationPopup: true,
  useDetailPopup: true,
  //taskView : false,
  //scheduleView : false
});

calendar.render();


calendar.createSchedules([

  {
    id: '2',
    calendarId: 'General Lecture',
    title: '건강과 영양',
    category: 'time',
    dueDateClass: '',
    start: '2020-04-01T14:30:00',
    end: '2020-04-01T16:30:00',
    isReadOnly: true // schedule is read-only
  }
]);
calendar.createSchedules([
  {
    id: '3',
    calendarId: 'Travel', // calendarId가 바뀌었죠?
    title: '강촌 OT',
    category: 'allday', // 'allday'로 지정합니다
    start: '2020-04-02',
    end: '2020-04-02',
    color: '#ffffff', // 일정 색상을 직접 지정할 수 있어요
    bgColor: '#03bd9e',
    dragBgColor: '#03bd9e',
    borderColor: '#03bd9e'
  }
]);
calendar.createSchedules([
  {
    id: '4',
    calendarId: 'Major Lecture',
    title: '소프트웨어 개론 레포트 제출',
    category: 'task', // 'task'로 지정합니다
    start: '2020-04-03T10:30:00',
    end: '2020-04-03T11:30:00',
    color: '#ffffff', // 일정 색상을 직접 지정할 수 있어요
    bgColor: '#9e5fff',
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff'
  }
]);

calendar.createSchedules([
  {
    id: '5',
    calendarId: 'Homework',
    title: '중간고사 종료',
    category: 'milestone', // 'milestone'으로 지정합니다
    start: '2020-03-31T10:30:00',
    end: '2020-03-31T11:30:00',
    color: '#bbdc00', // 일정 색상을 직접 지정할 수 있어요
    bgColor: '#ffffff',
    dragBgColor: '#ffffff',
    borderColor: '#ffffff'
  }
]);



calendar.setCalendarColor('Major Lecture', {
  color: '#ffffff',
  bgColor: '#ff5583',
  dragBgColor: '#ff5583',
  borderColor: '#ff5583'
});
calendar.setCalendarColor('General Lecture', {
  color: '#ffffff',
  bgColor: '#dc9656',
  dragBgColor: '#dc9656',
  borderColor: '#dc9656'
});




/* ---------------------------------------------- */
/* 이동 및 뷰 타입 변경 버튼 이벤트 핸들러 */
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dayViewBtn = document.getElementById('dayViewBtn');
const weekViewBtn = document.getElementById('weekViewBtn');
const monthViewBtn = document.getElementById('monthViewBtn');

prevBtn.addEventListener('click', () => {

});

nextBtn.addEventListener('click', () => {

});

dayViewBtn.addEventListener('click', () => {
calendar.changeView('day', true);
});

weekViewBtn.addEventListener('click', () => {
calendar.changeView('week', true);
});

monthViewBtn.addEventListener('click', () => {
calendar.changeView('month', true);
});

calendar.on('beforeCreateSchedule', scheduleData => {
  const schedule = {
    calendarId: 'Major Lecture',
    id: String(Math.random() * 100000000000000000),
    title: scheduleData.title,
    isAllDay: scheduleData.isAllDay,
    start: scheduleData.start,
    end: scheduleData.end,
    category: scheduleData.isAllDay ? 'allday' : 'time'
  };

  calendar.createSchedules([schedule]);

  alert('일정 생성 완료');
});

calendar.on('beforeUpdateSchedule', scheduleData => {
  const {schedule} = scheduleData;

  calendar.updateSchedule(schedule.id, schedule.calendarId, schedule);
});

calendar.on('beforeDeleteSchedule', scheduleData => {
  const {schedule, start, end} = scheduleData;

  schedule.start = start;
  schedule.end = end;
  calendar.deleteSchedule(schedule.id, schedule.calendarId);
});
