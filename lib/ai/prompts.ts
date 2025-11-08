/**
 * AI Prompt Templates for JobReady.AI
 * All prompts used for various AI operations
 */

/**
 * Resume Parsing Prompt
 */
export function getResumeParsingPrompt(resumeText: string): string {
  return `You are an expert resume parser. Extract structured information from this resume text.

Resume Text:
${resumeText}

Extract and return the following information in JSON format:
{
  "personal_info": {
    "name": "string or null",
    "email": "string or null",
    "phone": "string or null",
    "location": "string or null",
    "linkedin": "string or null",
    "github": "string or null",
    "portfolio": "string or null"
  },
  "summary": "professional summary if present",
  "skills": {
    "technical": ["array of technical skills"],
    "soft": ["array of soft skills"],
    "tools": ["array of tools/technologies"],
    "languages": ["programming languages"]
  },
  "experience": [
    {
      "company": "string",
      "title": "string",
      "location": "string or null",
      "start_date": "string",
      "end_date": "string or Present",
      "description": "string",
      "achievements": ["array of achievements/responsibilities"],
      "technologies": ["technologies used"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "start_date": "string or null",
      "end_date": "string or null",
      "gpa": "string or null"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["array"],
      "url": "string or null",
      "github": "string or null"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string",
      "url": "string or null"
    }
  ]
}

Important:
- Extract all skills mentioned (technical, soft skills, tools)
- Separate technologies from descriptions
- Use null for missing fields
- Be thorough and accurate`;
}

/**
 * Job Description Parsing Prompt
 */
export function getJobDescriptionParsingPrompt(jdText: string): string {
  return `You are an expert job description analyzer. Extract structured information from this job posting.

Job Description:
${jdText}

Extract and return the following information in JSON format:
{
  "title": "job title",
  "company": "company name or null",
  "location": "location or null",
  "job_type": "full-time/part-time/contract/null",
  "experience_level": "entry/mid/senior/null",
  "required_skills": [
    {
      "skill": "skill name",
      "proficiency": "basic/intermediate/advanced/expert or null",
      "priority": "required"
    }
  ],
  "preferred_skills": [
    {
      "skill": "skill name",
      "proficiency": "basic/intermediate/advanced/expert or null",
      "priority": "preferred"
    }
  ],
  "responsibilities": ["array of responsibilities"],
  "qualifications": ["array of qualifications"],
  "benefits": ["array of benefits if mentioned"],
  "salary_range": {
    "min": number or null,
    "max": number or null,
    "currency": "USD/EUR/etc or null"
  },
  "years_of_experience": number or null
}

Important:
- Clearly separate required vs preferred skills
- Extract years of experience from text
- Identify skill proficiency levels when mentioned
- Be comprehensive`;
}

/**
 * Job Match Analysis Prompt
 */
export function getJobMatchAnalysisPrompt(
  resumeData: any,
  jdData: any
): string {
  return `You are an expert career coach and technical recruiter. Analyze how well this candidate's resume matches the job requirements.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

JOB DESCRIPTION DATA:
${JSON.stringify(jdData, null, 2)}

Provide a comprehensive analysis in JSON format:
{
  "match_percentage": number (0-100),
  "skills_matched": [
    {
      "skill": "skill name",
      "proficiency_user": "beginner/intermediate/advanced/expert",
      "proficiency_required": "beginner/intermediate/advanced/expert",
      "match": "strong/exact/partial/weak"
    }
  ],
  "skills_missing": [
    {
      "skill": "skill name",
      "proficiency_required": "level",
      "priority": "high/medium/low",
      "reason": "why this skill is important"
    }
  ],
  "skills_weak": [
    {
      "skill": "skill name",
      "proficiency_user": "current level",
      "proficiency_required": "required level",
      "gap": "description of gap",
      "priority": "high/medium/low"
    }
  ],
  "experience_analysis": {
    "years_user": number,
    "years_required": number,
    "gap": "description",
    "assessment": "detailed assessment"
  },
  "strengths": ["array of candidate's strengths for this role"],
  "weaknesses": ["array of areas needing improvement"],
  "recommendations": [
    {
      "category": "skills/resume/interview_prep/project/certification",
      "priority": "high/medium/low",
      "action": "specific action to take",
      "reason": "why this action matters",
      "estimated_time": "time estimate"
    }
  ],
  "keyword_analysis": {
    "jd_keywords": ["important keywords from JD"],
    "resume_keywords_matched": ["keywords present in resume"],
    "resume_keywords_missing": ["keywords missing from resume"],
    "ats_score": number (0-100),
    "ats_notes": "notes about ATS compatibility"
  }
}

Provide honest, actionable feedback. Calculate match_percentage based on:
- Skills overlap (40%)
- Experience match (30%)
- Education fit (15%)
- Overall profile strength (15%)`;
}

/**
 * Preparation Plan Generation Prompt
 */
export function getPreparationPlanPrompt(
  matchAnalysis: any,
  durationDays: number = 30
): string {
  return `You are an expert career coach and technical interviewer. Create an EXTREMELY COMPREHENSIVE ${durationDays}-day preparation plan that will GUARANTEE interview success for this candidate.

JOB MATCH ANALYSIS:
${JSON.stringify(matchAnalysis, null, 2)}

IMPORTANT: This plan must include EVERYTHING needed to succeed - detailed content, coding problems with solutions, system design topics, learning modules with examples, practice exercises, and more. Leave NOTHING out.

Create a detailed preparation plan in JSON format:
{
  "overview": {
    "title": "plan title",
    "description": "plan description",
    "focus_areas": ["array of main focus areas"],
    "estimated_daily_hours": number
  },
  "weekly_breakdown": [
    {
      "week": number,
      "theme": "week theme",
      "goals": ["array of weekly goals"],
      "estimated_hours": number
    }
  ],
  "daily_tasks": [
    {
      "day": number,
      "title": "day title",
      "description": "what to focus on",
      "type": "learning/practice/project/review/mock_interview",
      "tasks": [
        {
          "task": "specific task",
          "duration_minutes": number,
          "resource_url": "url or null",
          "completed": false
        }
      ],
      "xp_reward": number (50-200 based on difficulty)
    }
  ],
  "projects": [
    {
      "title": "project title",
      "description": "project description",
      "skills_covered": ["array of skills"],
      "estimated_hours": number,
      "deliverables": ["array of deliverables"],
      "priority": "high/medium/low"
    }
  ],
  "resources": [
    {
      "skill": "skill name",
      "type": "video/course/article/documentation/tutorial",
      "title": "resource title",
      "url": "resource url",
      "duration_minutes": number or null,
      "difficulty": "beginner/intermediate/advanced",
      "is_free": boolean,
      "cost": number or null
    }
  ],
  "mock_interview_questions": {
    "technical": [
      {
        "category": "category",
        "difficulty": "easy/medium/hard",
        "question": "question text",
        "keywords": ["expected keywords in answer"]
      }
    ],
    "behavioral": [
      {
        "category": "category",
        "question": "question text",
        "hints": ["STAR method hints"]
      }
    ]
  },
  "milestones": [
    {
      "day": number,
      "title": "milestone title",
      "description": "milestone description",
      "xp_reward": number (200-500)
    }
  ],
  "coding_problems": [
    {
      "id": "unique_id",
      "title": "Problem title",
      "difficulty": "easy/medium/hard",
      "category": "Arrays/Strings/Trees/DP/etc",
      "problem_statement": "Detailed problem description with clear requirements",
      "examples": [
        {
          "input": "sample input",
          "output": "expected output",
          "explanation": "why this is the output"
        }
      ],
      "constraints": ["list of constraints like time/space limits"],
      "hints": ["hint 1", "hint 2", "hint 3"],
      "solution_approach": "Step-by-step approach to solve the problem",
      "code_template": "starter code template",
      "optimal_solution": "complete working solution with comments",
      "time_complexity": "O(n) etc",
      "space_complexity": "O(1) etc",
      "related_topics": ["related concepts"],
      "practice_day": number (which day to practice this)
    }
  ],
  "system_design_topics": [
    {
      "id": "unique_id",
      "title": "System design topic (e.g., Design Twitter, Design URL Shortener)",
      "description": "Detailed description of what needs to be designed",
      "key_concepts": ["concept 1", "concept 2"],
      "components": [
        {
          "name": "component name",
          "purpose": "what it does",
          "considerations": ["things to think about"]
        }
      ],
      "scalability_considerations": ["how to scale", "bottlenecks"],
      "trade_offs": ["trade-off discussions"],
      "example_systems": ["real-world examples"],
      "diagrams_description": "text description of architecture diagram",
      "practice_day": number
    }
  ],
  "learning_modules": [
    {
      "id": "unique_id",
      "title": "Module title",
      "skill": "skill being taught",
      "day": number,
      "content": {
        "theory": "Detailed theoretical explanation with examples",
        "key_points": ["key point 1", "key point 2"],
        "code_examples": [
          {
            "title": "Example title",
            "code": "complete working code",
            "explanation": "line by line explanation"
          }
        ],
        "practice_exercises": [
          {
            "question": "practice question",
            "difficulty": "easy/medium/hard",
            "solution_hint": "hint for solving"
          }
        ]
      },
      "duration_minutes": number,
      "quiz": [
        {
          "question": "quiz question",
          "options": ["option 1", "option 2", "option 3", "option 4"],
          "correct_answer": index (0-3),
          "explanation": "why this is correct"
        }
      ]
    }
  ]
}

CRITICAL GUIDELINES:
- Generate AT LEAST 20-30 coding problems across all difficulty levels
- Include DETAILED learning modules for EVERY missing/weak skill
- Each learning module must have complete theory, examples, and practice
- System design topics must include complete architecture discussions
- Daily tasks must reference specific learning modules and coding problems
- Provide COMPLETE code solutions with detailed explanations
- Include 30+ technical interview questions with model answers
- Make this plan so comprehensive that following it guarantees success
- Every day should have specific, actionable content - no vague tasks
- Include quiz questions to test understanding
- Provide step-by-step approaches for solving problems
- Cover all aspects: coding, system design, behavioral, projects
- Missing skills get 2-3x more focus than matched skills
- Include real URLs to high-quality free resources (YouTube, documentation, articles)`;
}

/**
 * Resume Optimization Prompt
 */
export function getResumeOptimizationPrompt(
  resumeData: any,
  jdData: any
): string {
  return `You are an expert resume writer and ATS specialist. Optimize this resume for the target job.

CURRENT RESUME:
${JSON.stringify(resumeData, null, 2)}

TARGET JOB:
${JSON.stringify(jdData, null, 2)}

Provide optimization suggestions in JSON format:
{
  "ats_analysis": {
    "current_score": number (0-100),
    "potential_score": number (0-100),
    "missing_keywords": ["array of missing keywords"]
  },
  "keyword_suggestions": [
    {
      "keyword": "keyword to add",
      "where_to_add": "section name",
      "priority": "high/medium/low",
      "context": "how to incorporate it naturally"
    }
  ],
  "section_improvements": {
    "technical_skills": {
      "current": "current skills section text",
      "suggested": "improved version",
      "reason": "why this is better"
    },
    "experience": [
      {
        "section": "specific job entry",
        "improvement_type": "add_metrics/add_keywords/restructure/enhance",
        "current": "current text",
        "suggested": "improved text",
        "reason": "explanation"
      }
    ]
  },
  "formatting_tips": ["array of formatting suggestions"],
  "overall_suggestions": [
    {
      "category": "summary/projects/certifications/etc",
      "suggestion": "specific suggestion",
      "priority": "high/medium/low"
    }
  ]
}

Focus on:
- ATS-friendly keywords
- Quantifiable achievements
- Action verbs
- Relevance to target role`;
}

/**
 * Mock Interview Question Generation Prompt
 */
export function getMockInterviewQuestionsPrompt(
  jdData: any,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 5
): string {
  return `Generate ${count} ${difficulty} interview questions for this job role.

JOB DETAILS:
${JSON.stringify(jdData, null, 2)}

Generate questions in JSON format:
{
  "questions": [
    {
      "question_number": number,
      "question_text": "the question",
      "category": "technical category or behavioral",
      "difficulty": "${difficulty}",
      "type": "technical/behavioral",
      "keywords": ["expected keywords in a good answer"],
      "hints": ["hints for answering"]
    }
  ]
}

Mix technical and behavioral questions (70% technical, 30% behavioral).
Make questions realistic and job-relevant.`;
}

/**
 * Interview Answer Evaluation Prompt
 */
export function getAnswerEvaluationPrompt(
  question: string,
  userAnswer: string,
  expectedKeywords: string[]
): string {
  return `You are an expert interviewer. Evaluate this candidate's answer.

QUESTION: ${question}

CANDIDATE'S ANSWER: ${userAnswer}

EXPECTED KEYWORDS: ${expectedKeywords.join(', ')}

Provide evaluation in JSON format:
{
  "score": number (0-10),
  "feedback": "constructive feedback on the answer",
  "suggested_improvements": ["array of specific improvements"],
  "example_answer": "a strong example answer",
  "strengths": ["what they did well"],
  "weaknesses": ["what needs work"]
}

Be constructive and encouraging while providing honest feedback.`;
}
