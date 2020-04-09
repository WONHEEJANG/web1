/* 코드를 작성해 보세요. */
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const calendar = new Calendar('#calendar', {
  defaultView: 'week',
  useCreationPopup: true,
  useDetailPopup: true
});
calendar.render();


/* ---------------------------------------------- */
/* 이동 및 뷰 타입 변경 버튼 이벤트 핸들러 */
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dayViewBtn = document.getElementById('dayViewBtn');
const weekViewBtn = document.getElementById('weekViewBtn');
const monthViewBtn = document.getElementById('monthViewBtn');

prevBtn.addEventListener('click', () => {
calendar.prev();
});

nextBtn.addEventListener('click', () => {
calendar.next();
});

dayViewBtn.addEventListener('click', () => {
  // 일간 보기
  calendar.changeView('day', true);
});

weekViewBtn.addEventListener('click', () => {
    // 주간 보기
    calendar.changeView('week', true);
});

monthViewBtn.addEventListener('click', () => {

      // 월간 보기
      calendar.changeView('month', true);
});

calendar.setCalendarColor('Major Lecture', {
  color: '#ffffff',
  bgColor: '#ff5583',
  dragBgColor: '#ff5583',
  borderColor: '#ff5583'
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

calendar.on('clickSchedule', function(event) {
    var schedule = event.schedule;

    // focus the schedule
    if (lastClickSchedule) {
        calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
            isFocused: false
        });
    }
    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        isFocused: true
    });

    lastClickSchedule = schedule;

    // open detail view
});

calendar.on('beforeUpdateSchedule', function(event) {
    var schedule = event.schedule;
    var changes = event.changes;

    calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
});

calendar.on('beforeDeleteSchedule', scheduleData => {
  const {schedule, start, end} = scheduleData;

  schedule.start = start;
  schedule.end = end;
  calendar.deleteSchedule(schedule.id, schedule.calendarId);
});
