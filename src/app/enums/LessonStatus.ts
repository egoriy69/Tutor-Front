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
  PROCESSING = 'var(--ui-violet-500)',
  DONE = 'var(--ui-blue-500)',
  REMAKE = 'var(--ui-orange-500)',
  FINISH = 'var(--ui-green-500)'
}
