import { FilterStatus } from "./types.d";
export type Task = {
  id: string;
  title: string;
  des: string;
  completed: boolean;
  pinned: boolean;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type FilterStatus = "all" | "pending" | "completed";

export type TasksSectionProps = {
  searchQuery: string;
  filterStatus: FilterStatus;
};

export type Props = {
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, title: string, des: string) => void;
};
