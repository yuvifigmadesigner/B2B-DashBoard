import { LucideIcon } from "lucide-react";

export interface ProjectStat {
  label: string;
  value: string;
  description: string;
}

export interface KPICardProps {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
  icon: LucideIcon;
}

export interface Review {
  id: number;
  user: string;
  role: string;
  text: string;
  avatar: string;
}

export interface RiceItem {
  feature: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  score: number;
}
