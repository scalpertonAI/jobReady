/**
 * Database Types for JobReady.AI
 * Auto-generated types for Supabase tables
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          total_xp: number
          level: number
          streak_days: number
          last_activity_date: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          total_xp?: number
          level?: number
          streak_days?: number
          last_activity_date?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          total_xp?: number
          level?: number
          streak_days?: number
          last_activity_date?: string | null
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_url: string
          file_size: number | null
          raw_text: string | null
          parsed_data: Json | null
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_url: string
          file_size?: number | null
          raw_text?: string | null
          parsed_data?: Json | null
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_url?: string
          file_size?: number | null
          raw_text?: string | null
          parsed_data?: Json | null
          is_primary?: boolean
          created_at?: string
        }
      }
      job_descriptions: {
        Row: {
          id: string
          user_id: string
          title: string
          company_name: string | null
          raw_text: string
          parsed_data: Json | null
          url: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          company_name?: string | null
          raw_text: string
          parsed_data?: Json | null
          url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          company_name?: string | null
          raw_text?: string
          parsed_data?: Json | null
          url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      job_matches: {
        Row: {
          id: string
          user_id: string
          resume_id: string
          job_description_id: string
          match_percentage: number | null
          analysis_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resume_id: string
          job_description_id: string
          match_percentage?: number | null
          analysis_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resume_id?: string
          job_description_id?: string
          match_percentage?: number | null
          analysis_data?: Json
          created_at?: string
        }
      }
      preparation_plans: {
        Row: {
          id: string
          job_match_id: string
          user_id: string
          duration_days: number
          difficulty_level: string
          plan_data: Json
          status: string
          progress_percentage: number
          started_at: string
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          job_match_id: string
          user_id: string
          duration_days?: number
          difficulty_level?: string
          plan_data: Json
          status?: string
          progress_percentage?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          job_match_id?: string
          user_id?: string
          duration_days?: number
          difficulty_level?: string
          plan_data?: Json
          status?: string
          progress_percentage?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
        }
      }
      plan_tasks: {
        Row: {
          id: string
          preparation_plan_id: string
          day_number: number
          title: string
          description: string | null
          task_type: string
          content: Json | null
          estimated_hours: number | null
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          preparation_plan_id: string
          day_number: number
          title: string
          description?: string | null
          task_type: string
          content?: Json | null
          estimated_hours?: number | null
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          preparation_plan_id?: string
          day_number?: number
          title?: string
          description?: string | null
          task_type?: string
          content?: Json | null
          estimated_hours?: number | null
          order_index?: number | null
          created_at?: string
        }
      }
      task_progress: {
        Row: {
          id: string
          user_id: string
          plan_task_id: string
          status: string
          completion_percentage: number
          notes: string | null
          user_rating: number | null
          started_at: string | null
          completed_at: string | null
          xp_earned: number
        }
        Insert: {
          id?: string
          user_id: string
          plan_task_id: string
          status?: string
          completion_percentage?: number
          notes?: string | null
          user_rating?: number | null
          started_at?: string | null
          completed_at?: string | null
          xp_earned?: number
        }
        Update: {
          id?: string
          user_id?: string
          plan_task_id?: string
          status?: string
          completion_percentage?: number
          notes?: string | null
          user_rating?: number | null
          started_at?: string | null
          completed_at?: string | null
          xp_earned?: number
        }
      }
      mock_interview_sessions: {
        Row: {
          id: string
          user_id: string
          preparation_plan_id: string | null
          interview_type: string | null
          difficulty: string | null
          questions_data: Json | null
          total_questions: number | null
          score: number | null
          feedback_summary: string | null
          status: string
          started_at: string
          completed_at: string | null
          xp_earned: number
        }
        Insert: {
          id?: string
          user_id: string
          preparation_plan_id?: string | null
          interview_type?: string | null
          difficulty?: string | null
          questions_data?: Json | null
          total_questions?: number | null
          score?: number | null
          feedback_summary?: string | null
          status?: string
          started_at?: string
          completed_at?: string | null
          xp_earned?: number
        }
        Update: {
          id?: string
          user_id?: string
          preparation_plan_id?: string | null
          interview_type?: string | null
          difficulty?: string | null
          questions_data?: Json | null
          total_questions?: number | null
          score?: number | null
          feedback_summary?: string | null
          status?: string
          started_at?: string
          completed_at?: string | null
          xp_earned?: number
        }
      }
      interview_responses: {
        Row: {
          id: string
          session_id: string
          question_number: number
          question_text: string
          question_type: string | null
          user_answer: string
          feedback: string | null
          score: number | null
          suggested_improvements: string | null
          example_answer: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          question_number: number
          question_text: string
          question_type?: string | null
          user_answer: string
          feedback?: string | null
          score?: number | null
          suggested_improvements?: string | null
          example_answer?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          question_number?: number
          question_text?: string
          question_type?: string | null
          user_answer?: string
          feedback?: string | null
          score?: number | null
          suggested_improvements?: string | null
          example_answer?: string | null
          created_at?: string
        }
      }
      resume_improvements: {
        Row: {
          id: string
          user_id: string
          resume_id: string
          job_description_id: string | null
          improvements_data: Json
          applied: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resume_id: string
          job_description_id?: string | null
          improvements_data: Json
          applied?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resume_id?: string
          job_description_id?: string | null
          improvements_data?: Json
          applied?: boolean
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string | null
          badge_icon: string | null
          xp_reward: number
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description?: string | null
          badge_icon?: string | null
          xp_reward?: number
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string | null
          badge_icon?: string | null
          xp_reward?: number
          unlocked_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
