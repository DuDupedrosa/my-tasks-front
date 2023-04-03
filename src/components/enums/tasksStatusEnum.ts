interface TaskStatusProps {
  PENDING: number;
  IN_PROGRESS: number;
  FINALIZED: number;
}

export const taskStatus: TaskStatusProps = {
  PENDING: 1,
  IN_PROGRESS: 2,
  FINALIZED: 3,
};
