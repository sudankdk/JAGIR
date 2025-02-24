interface User {
  bio: string;
  prfile_image?: string | null;
  role: string;
  username: string;
}

export interface Job {
  created_at: Date;
  description: string;
  job_id: string;
  job_name: string;
  location: string;
  salary: string;
  skills: string[];
  status: string;
  user: User;
}
