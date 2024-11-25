export enum LessonStatus {
  UNDONE = "UNDONE",
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  REMAKE = 'REMAKE',
  FINISH = 'FINISH'
}

export enum homeWork {
  UNDONE = "Не сделано",
  PROCESSING = 'На проверке',
  DONE = 'Сделано',
  REMAKE = 'Переделать',
  FINISH = 'Доделано'
}

export enum homeWorkColors {
  UNDONE = "var(--ui-red-400)",
  PROCESSING = 'var(--ui-violet-400)',
  DONE = 'var(--ui-sky-400)',
  REMAKE = 'var(--ui-orange-400)',
  FINISH = 'var(--ui-green-400)'
}
