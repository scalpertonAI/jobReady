/**
 * Company Interview Guides
 * Complete breakdown of interview processes at top tech companies
 * Based on real interview experiences and public data
 */

export interface InterviewRound {
  name: string;
  duration: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  focus: string;
  question_types?: string[];
  tips: string[];
  common_questions?: string[];
  example_problems?: string[];
}

export interface CompensationLevel {
  level: string;
  title: string;
  years_exp: string;
  base: { min: number; max: number };
  stock: { min: number; max: number; vesting?: string };
  bonus: { min: number; max: number };
  signing_bonus?: { min: number; max: number };
  total_first_year: { min: number; max: number };
}

export interface CompanyGuide {
  id: string;
  company: string;
  logo_url: string;
  headquarters: string;
  size: string;
  industry: string;

  // Interview process
  interview_process: {
    overview: string;
    typical_timeline: string;
    rounds: InterviewRound[];
  };

  // Evaluation criteria
  evaluation_criteria: {
    coding: number;
    system_design: number;
    behavioral: number;
    cultural_fit: number;
  };

  // Compensation
  compensation: {
    levels: CompensationLevel[];
    equity_vesting: string;
    benefits: string[];
  };

  // Culture & values
  culture: {
    values: string[];
    work_life_balance: string;
    team_structure: string;
  };

  // Insider tips
  insider_tips: string[];

  // Common rejection reasons
  red_flags: string[];

  // Preparation recommendations
  prep_recommendations: {
    coding_focus: string[];
    system_design_topics: string[];
    behavioral_themes: string[];
    study_time: string;
  };
}

export const COMPANY_GUIDES: CompanyGuide[] = [
  // ============================================
  // GOOGLE
  // ============================================
  {
    id: 'google',
    company: 'Google',
    logo_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    headquarters: 'Mountain View, CA',
    size: '150,000+ employees',
    industry: 'Search, Advertising, Cloud',

    interview_process: {
      overview: 'Google has one of the most rigorous interview processes. Expect 4-6 interviews focusing heavily on coding, algorithms, and "Googleyness". System design is required for L4+.',
      typical_timeline: '4-8 weeks from application to offer',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background review, role fit, timeline discussion',
          tips: [
            'Prepare a concise 2-minute intro highlighting your best achievements',
            'Research the specific team/product beforehand',
            'Ask about team structure and day-to-day responsibilities',
            'Be ready to discuss your timeline and notice period'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '45 minutes',
          difficulty: 'Medium',
          focus: 'Coding problem solving in Google Doc',
          question_types: ['Arrays', 'Strings', 'Hash Tables', 'Two Pointers'],
          tips: [
            'Use Google Doc (no syntax highlighting!) - practice this beforehand',
            'Think out loud - communication is critical',
            'Ask clarifying questions before diving in',
            'Discuss multiple approaches and their trade-offs',
            'Write clean, working code with proper variable names',
            'Test your code with examples'
          ],
          example_problems: [
            'Two Sum',
            'Valid Parentheses',
            'Longest Substring Without Repeating Characters'
          ]
        },
        {
          name: 'Virtual Onsite (4-5 rounds)',
          duration: '4-5 hours total',
          difficulty: 'Hard',
          focus: '2 coding, 1 system design (L4+), 1 "Googleyness" behavioral',
          tips: [
            'Each round is 45 minutes',
            'Different interviewers assess different aspects',
            'Stay sharp - performance matters in ALL rounds',
            'Take breaks between rounds to reset'
          ]
        },
        {
          name: 'Coding Round 1',
          duration: '45 minutes',
          difficulty: 'Medium',
          focus: 'Data structures & algorithms',
          question_types: ['Trees', 'Graphs', 'Dynamic Programming'],
          tips: [
            'Explain your thought process clearly',
            'Start with brute force, then optimize',
            'Discuss time and space complexity',
            'Handle edge cases',
            'Write production-quality code'
          ],
          example_problems: [
            'Binary Tree Level Order Traversal',
            'Course Schedule (Graph)',
            'Coin Change'
          ]
        },
        {
          name: 'Coding Round 2',
          duration: '45 minutes',
          difficulty: 'Medium',
          focus: 'Problem solving & optimization',
          question_types: ['Arrays', 'Strings', 'Sorting', 'Binary Search'],
          tips: [
            'Focus on optimal solution',
            'Discuss trade-offs between different approaches',
            'Be ready for follow-up questions that increase complexity',
            'Show how you debug and test code'
          ],
          example_problems: [
            'Merge Intervals',
            'Product of Array Except Self',
            'Search in Rotated Sorted Array'
          ]
        },
        {
          name: 'System Design (L4+)',
          duration: '45 minutes',
          difficulty: 'Hard',
          focus: 'Design scalable systems',
          tips: [
            'Start with requirements gathering - clarify functional & non-functional requirements',
            'Estimate capacity - users, requests, storage, bandwidth',
            'Design high-level components first, then dive deep into 1-2 areas',
            'Discuss trade-offs explicitly (consistency vs availability, SQL vs NoSQL)',
            'Talk about scalability, reliability, and performance',
            'Draw diagrams - visual communication matters'
          ],
          common_questions: [
            'Design Google Search',
            'Design YouTube',
            'Design Google Drive',
            'Design URL Shortener',
            'Design Pub/Sub System'
          ]
        },
        {
          name: 'Googleyness & Leadership',
          duration: '45 minutes',
          focus: 'Cultural fit, past experiences, leadership',
          tips: [
            'Prepare 8-10 STAR stories covering: leadership, teamwork, conflict, failure, innovation',
            'Show humility and willingness to learn',
            'Demonstrate collaboration - Google values teamwork over individual heroics',
            'Discuss how you handle ambiguity and adapt',
            'Show passion for technology and continuous learning',
            'Be authentic - they can spot fake answers'
          ],
          common_questions: [
            'Tell me about a time you disagreed with your manager',
            'Describe a project where you showed leadership',
            'How do you handle ambiguous requirements?',
            'Tell me about a time you failed',
            'Why Google?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 40,
      system_design: 25,
      behavioral: 20,
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: 'L3',
          title: 'Software Engineer II',
          years_exp: '0-1 years',
          base: { min: 120000, max: 150000 },
          stock: { min: 100000, max: 180000, vesting: '4 years' },
          bonus: { min: 15000, max: 30000 },
          signing_bonus: { min: 10000, max: 30000 },
          total_first_year: { min: 270000, max: 400000 }
        },
        {
          level: 'L4',
          title: 'Software Engineer III',
          years_exp: '2-4 years',
          base: { min: 150000, max: 190000 },
          stock: { min: 200000, max: 350000, vesting: '4 years' },
          bonus: { min: 30000, max: 50000 },
          signing_bonus: { min: 25000, max: 75000 },
          total_first_year: { min: 305000, max: 565000 }
        },
        {
          level: 'L5',
          title: 'Senior Software Engineer',
          years_exp: '5-7 years',
          base: { min: 180000, max: 230000 },
          stock: { min: 300000, max: 500000, vesting: '4 years' },
          bonus: { min: 40000, max: 70000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 395000, max: 700000 }
        },
        {
          level: 'L6',
          title: 'Staff Software Engineer',
          years_exp: '8-10+ years',
          base: { min: 200000, max: 250000 },
          stock: { min: 500000, max: 800000, vesting: '4 years' },
          bonus: { min: 60000, max: 100000 },
          signing_bonus: { min: 75000, max: 150000 },
          total_first_year: { min: 510000, max: 1100000 }
        }
      ],
      equity_vesting: '4 years (33% year 1, 33% year 2, 22% year 3, 12% year 4)',
      benefits: [
        'Excellent health insurance (medical, dental, vision)',
        'Free meals (breakfast, lunch, dinner at campus)',
        '401k matching',
        'Generous parental leave',
        'Learning & development budget',
        'Gym and wellness programs',
        'On-site services (massage, dry cleaning, etc.)'
      ]
    },

    culture: {
      values: [
        'Focus on the user',
        'Innovation and risk-taking',
        'Data-driven decisions',
        'Collaboration over competition',
        'Long-term thinking'
      ],
      work_life_balance: 'Generally good, varies by team. Expect 40-50 hours/week. Flexible remote work post-COVID.',
      team_structure: 'Small teams (5-10 engineers) with significant autonomy. Flat hierarchy, but promo can be competitive.'
    },

    insider_tips: [
      'Google values "Googleyness" - show you\'re collaborative, adaptable, and humble',
      'For system design, discuss trade-offs extensively - there\'s no one "right" answer',
      'Use Google products heavily and be ready to discuss what you\'d improve',
      'The hiring committee reviews all interviews - consistency across rounds matters',
      'L4 vs L5 decision often happens at committee - negotiate hard if downleveled',
      'Recent grads: focus on academic projects, internships, and passion projects',
      'Stock refreshers are generous - total comp grows significantly over time',
      'Internal transfers are easy - you can switch teams/products every 1-2 years'
    ],

    red_flags: [
      'Not asking clarifying questions - shows poor communication',
      'Jumping to code without discussing approach',
      'Being inflexible when interviewer gives hints',
      'Arrogance or dismissing interviewer\'s feedback',
      'Not discussing trade-offs in system design',
      'Unprepared for "Why Google?" question'
    ],

    prep_recommendations: {
      coding_focus: [
        'Master Blind 75 completely',
        'Focus on Google-tagged problems on LeetCode (200+)',
        'Practice in Google Doc (no IDE)',
        'Arrays, Strings, Trees, Graphs, DP are most common'
      ],
      system_design_topics: [
        'Scalability fundamentals (load balancing, caching, sharding)',
        'Database design (SQL vs NoSQL, indexing, normalization)',
        'Distributed systems (CAP theorem, consistency models)',
        'Real-time systems (WebSockets, streaming)',
        'Study Google products (Search, Maps, YouTube, Drive) architecture'
      ],
      behavioral_themes: [
        'Leadership and influence',
        'Teamwork and collaboration',
        'Handling failure and ambiguity',
        'Innovation and problem-solving',
        'Learning and growth mindset'
      ],
      study_time: '2-3 months of focused preparation (2-3 hours/day)'
    }
  },

  // ============================================
  // AMAZON
  // ============================================
  {
    id: 'amazon',
    company: 'Amazon',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    headquarters: 'Seattle, WA',
    size: '1,600,000+ employees',
    industry: 'E-commerce, Cloud Computing (AWS)',

    interview_process: {
      overview: 'Amazon heavily emphasizes their 16 Leadership Principles. Expect behavioral questions in EVERY round. The "Bar Raiser" round is specifically designed to maintain high hiring standards.',
      typical_timeline: '3-6 weeks from application to offer',
      rounds: [
        {
          name: 'Online Assessment (OA)',
          duration: '90 minutes',
          difficulty: 'Easy to Medium',
          focus: '2 coding problems + work style assessment',
          tips: [
            'Solve both problems correctly and efficiently',
            'Focus on optimal solutions (time/space complexity)',
            'Debug section tests edge cases - be thorough',
            'Work style assessment: answer honestly, show leadership',
            'Practice on HackerRank or similar platforms'
          ],
          example_problems: [
            'Two Sum variants',
            'String manipulation',
            'Array problems',
            'Basic algorithms'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: '30 min coding + 30 min behavioral (Leadership Principles)',
          question_types: ['Arrays', 'Strings', 'Trees', 'Recursion'],
          tips: [
            'Use Amazon Chime - have reliable internet',
            'Prepare 5-6 STAR stories covering different Leadership Principles',
            'Coding: start simple, then optimize',
            'Behavioral: be specific, use metrics, show impact',
            'Always tie answers back to Leadership Principles'
          ],
          example_problems: [
            'Valid Palindrome',
            'Merge Two Sorted Lists',
            'Binary Tree Traversal'
          ]
        },
        {
          name: 'Virtual Onsite (5 rounds)',
          duration: '5-6 hours',
          difficulty: 'Medium to Hard',
          focus: '4 coding/behavioral + 1 Bar Raiser',
          tips: [
            'Each round: 15 min behavioral + 30 min coding',
            'Every interviewer asks Leadership Principle questions',
            'Bar Raiser is a senior interviewer from another team',
            'Take detailed notes on which LP each interviewer focuses on'
          ]
        },
        {
          name: 'Coding Round (x4)',
          duration: '45 minutes each',
          difficulty: 'Medium',
          focus: 'Coding + 2-3 Leadership Principle questions',
          question_types: ['All topics', 'Focus on Amazon-tagged problems'],
          tips: [
            'First 15 min: Behavioral (2-3 LP questions)',
            'Next 30 min: Coding problem',
            'Prepare STAR stories for: Bias for Action, Customer Obsession, Deliver Results, Ownership',
            'Coding: write production-quality code, handle edge cases',
            'Ask if they want you to run through test cases'
          ],
          example_problems: [
            'Merge K Sorted Lists',
            'Word Ladder',
            'LRU Cache',
            'Number of Islands'
          ]
        },
        {
          name: 'Bar Raiser Round',
          duration: '60 minutes',
          difficulty: 'Hard',
          focus: 'Deep dive on Leadership Principles',
          tips: [
            'This interviewer has veto power - critical round',
            'They assess if you raise the bar for the team',
            'Expect toughest behavioral questions',
            'May challenge your answers - stay composed',
            'Show deep thinking, self-awareness, and growth',
            'Prepare for: "Tell me about a time you failed", "Disagreed with manager", "Made a tough decision with limited info"'
          ],
          common_questions: [
            'Tell me about your most significant accomplishment',
            'Describe a time you had to make a decision with incomplete information',
            'Tell me about a time you disagreed with your team and had to convince them',
            'What\'s the most complex problem you\'ve solved?'
          ]
        },
        {
          name: 'System Design (SDE2+)',
          duration: '60 minutes',
          difficulty: 'Hard',
          focus: 'Design scalable AWS-based systems',
          tips: [
            'Amazon loves AWS - reference their services (S3, DynamoDB, Lambda, SQS, etc.)',
            'Focus on scalability and cost optimization',
            'Discuss trade-offs between different AWS services',
            'Talk about monitoring, logging, and operations',
            'Customer obsession: always consider user experience'
          ],
          common_questions: [
            'Design Amazon product page',
            'Design order fulfillment system',
            'Design package tracking system',
            'Design recommendation engine'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 35,
      system_design: 20,
      behavioral: 35, // Very high!
      cultural_fit: 10
    },

    compensation: {
      levels: [
        {
          level: 'SDE I',
          title: 'Software Development Engineer I',
          years_exp: '0-2 years',
          base: { min: 110000, max: 140000 },
          stock: { min: 70000, max: 150000, vesting: '4 years' },
          bonus: { min: 12000, max: 25000 },
          signing_bonus: { min: 20000, max: 50000 },
          total_first_year: { min: 230000, max: 365000 }
        },
        {
          level: 'SDE II',
          title: 'Software Development Engineer II',
          years_exp: '3-5 years',
          base: { min: 140000, max: 180000 },
          stock: { min: 150000, max: 300000, vesting: '4 years' },
          bonus: { min: 25000, max: 45000 },
          signing_bonus: { min: 40000, max: 80000 },
          total_first_year: { min: 280000, max: 530000 }
        },
        {
          level: 'SDE III',
          title: 'Senior Software Development Engineer',
          years_exp: '6-10 years',
          base: { min: 165000, max: 210000 },
          stock: { min: 300000, max: 500000, vesting: '4 years' },
          bonus: { min: 40000, max: 70000 },
          signing_bonus: { min: 60000, max: 120000 },
          total_first_year: { min: 390000, max: 700000 }
        }
      ],
      equity_vesting: '4 years (5% year 1, 15% year 2, 40% year 3, 40% year 4) - Backloaded!',
      benefits: [
        'Health insurance',
        '401k matching',
        'Parental leave',
        'Employee discount',
        'Relocation assistance',
        'Note: No free food (unlike Google/Meta)'
      ]
    },

    culture: {
      values: [
        'Customer Obsession (most important)',
        'Ownership',
        'Invent and Simplify',
        'Bias for Action',
        'Learn and Be Curious',
        'Hire and Develop the Best',
        'Insist on Highest Standards',
        'Think Big',
        'Frugality',
        'Earn Trust',
        'Dive Deep',
        'Have Backbone; Disagree and Commit',
        'Deliver Results',
        'Strive to be Earth\'s Best Employer',
        'Success and Scale Bring Broad Responsibility'
      ],
      work_life_balance: 'Varies significantly by team. Some teams have great WLB, others are intense. Oncall rotations are common.',
      team_structure: 'Two-pizza teams (6-10 people). High autonomy but also high accountability.'
    },

    insider_tips: [
      'Memorize all 16 Leadership Principles - they come up in EVERY round',
      'Prepare at least 2 STAR stories for each Leadership Principle (32 stories total)',
      'Use metrics in your behavioral answers - Amazon loves data',
      'For "Customer Obsession": always start with customer impact',
      'Bar Raiser round is critical - they have veto power',
      'Equity is backloaded (40% in years 3-4) - negotiate year 1-2 comp',
      'Ask about on-call rotation and team WLB during interviews',
      'AWS knowledge is a plus - familiarize yourself with major services',
      'Coding problems are generally Medium difficulty - focus on clean code and edge cases'
    ],

    red_flags: [
      'Not demonstrating Leadership Principles in behavioral answers',
      'Being vague in STAR stories - they want specific examples',
      'Not showing customer focus',
      'Lack of ownership/accountability in past roles',
      'Not asking thoughtful questions about the role/team'
    ],

    prep_recommendations: {
      coding_focus: [
        'Amazon-tagged problems on LeetCode (150+)',
        'Focus on Medium difficulty',
        'Trees, Graphs, Arrays, Strings most common',
        'Practice on HackerRank for OA preparation'
      ],
      system_design_topics: [
        'AWS services (S3, EC2, Lambda, DynamoDB, SQS, SNS)',
        'Microservices architecture',
        'E-commerce systems (Amazon\'s domain)',
        'Scalability and cost optimization',
        'Distributed systems basics'
      ],
      behavioral_themes: [
        'MEMORIZE all 16 Leadership Principles',
        'Prepare 2 STAR stories for each principle',
        'Focus on: Customer Obsession, Ownership, Bias for Action, Deliver Results',
        'Practice with mock behavioral interviews',
        'Be ready to discuss failures and conflicts'
      ],
      study_time: '2-3 months (heavy focus on behavioral prep - 50% of time!)'
    }
  },

  // ============================================
  // META (Facebook)
  // ============================================
  {
    id: 'meta',
    company: 'Meta',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    headquarters: 'Menlo Park, CA',
    size: '86,000+ employees',
    industry: 'Social Media, VR/AR, Advertising',

    interview_process: {
      overview: 'Meta has a unique "Jedi" interview process focusing on coding skills, system design, and building products users love. The process is fast-paced and expects strong fundamentals.',
      typical_timeline: '3-5 weeks from application to offer',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, motivation, compensation expectations',
          tips: [
            'Be passionate about Meta products (Facebook, Instagram, WhatsApp)',
            'Discuss your impact using metrics',
            'Research the specific team you\'re interviewing for',
            'Be honest about compensation expectations'
          ]
        },
        {
          name: 'Technical Phone Screen (1-2 rounds)',
          duration: '45 minutes each',
          difficulty: 'Medium',
          focus: 'Coding in CoderPad',
          question_types: ['Arrays', 'Strings', 'Trees', 'Graphs', 'Hash Tables'],
          tips: [
            'CoderPad has syntax highlighting - practice on it',
            'Focus on optimal solutions from the start',
            'Explain your thinking process',
            'Test your code thoroughly',
            'Be ready for follow-up complexity questions'
          ],
          example_problems: [
            'Valid Palindrome',
            'Binary Tree Vertical Order Traversal',
            'Group Anagrams'
          ]
        },
        {
          name: 'Virtual Onsite (4-5 rounds)',
          duration: '4-5 hours',
          difficulty: 'Hard',
          focus: '2 Coding ("Ninja"), 1 System Design ("Pirate"), 1 Behavioral ("Jedi")',
          tips: [
            'Meta uses role names: Ninja (coding), Pirate (design), Jedi (behavioral)',
            'All rounds are critical - no "Bar Raiser" concept',
            'Coding rounds are harder than most companies',
            'Strong product sense is valued'
          ]
        },
        {
          name: 'Coding Round 1 (Ninja)',
          duration: '45 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Data structures & algorithms',
          question_types: ['All topics', 'Heavy on medium-hard problems'],
          tips: [
            'Expect 1-2 problems in 45 minutes',
            'First problem medium, follow-up harder',
            'Optimize for time complexity',
            'Discuss space-time trade-offs',
            'Code should be production-ready'
          ],
          example_problems: [
            'Clone Graph',
            'Add and Search Word',
            'Binary Tree Right Side View',
            'Remove Invalid Parentheses'
          ]
        },
        {
          name: 'Coding Round 2 (Ninja)',
          duration: '45 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Problem solving under pressure',
          tips: [
            'Similar to Round 1 but may test different topics',
            'Be ready for string manipulation and graph problems',
            'Meta loves BFS/DFS problems',
            'Show how you debug and optimize'
          ],
          example_problems: [
            'Word Break II',
            'Serialize and Deserialize Binary Tree',
            'Minimum Window Substring'
          ]
        },
        {
          name: 'System Design (Pirate)',
          duration: '45-60 minutes',
          difficulty: 'Hard',
          focus: 'Design scalable social media systems',
          tips: [
            'Start with product requirements and user flows',
            'Discuss newsfeed ranking algorithms',
            'Talk about caching strategies (Meta uses Memcached heavily)',
            'Consider read-heavy vs write-heavy workloads',
            'Discuss consistency vs availability trade-offs',
            'Scalability is critical - think billions of users'
          ],
          common_questions: [
            'Design Facebook Newsfeed',
            'Design Instagram',
            'Design WhatsApp',
            'Design Messenger',
            'Design a live comments system',
            'Design a notification system'
          ]
        },
        {
          name: 'Behavioral (Jedi)',
          duration: '45 minutes',
          focus: 'Past experiences, collaboration, impact',
          tips: [
            'Meta values "Move Fast" and "Be Bold"',
            'Prepare stories showing impact at scale',
            'Discuss cross-functional collaboration',
            'Show how you handle ambiguity',
            'Be authentic - culture fit matters',
            'Prepare questions about team and product'
          ],
          common_questions: [
            'Tell me about your most impactful project',
            'Describe a time you had to make a trade-off between speed and quality',
            'How do you handle disagreements with teammates?',
            'Tell me about a time you took a risk',
            'Why Meta?',
            'What Meta product do you use most and how would you improve it?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 45,
      system_design: 25,
      behavioral: 20,
      cultural_fit: 10
    },

    compensation: {
      levels: [
        {
          level: 'E3',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 125000, max: 155000 },
          stock: { min: 125000, max: 250000, vesting: '4 years' },
          bonus: { min: 15000, max: 30000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 346250, max: 597500 }
        },
        {
          level: 'E4',
          title: 'Software Engineer',
          years_exp: '2-4 years',
          base: { min: 155000, max: 200000 },
          stock: { min: 200000, max: 350000, vesting: '4 years' },
          bonus: { min: 25000, max: 40000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 280000, max: 540000 }
        },
        {
          level: 'E5',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 190000, max: 240000 },
          stock: { min: 300000, max: 500000, vesting: '4 years' },
          bonus: { min: 35000, max: 60000 },
          signing_bonus: { min: 75000, max: 150000 },
          total_first_year: { min: 375000, max: 700000 }
        },
        {
          level: 'E6',
          title: 'Staff Software Engineer',
          years_exp: '8-12+ years',
          base: { min: 230000, max: 280000 },
          stock: { min: 500000, max: 900000, vesting: '4 years' },
          bonus: { min: 50000, max: 100000 },
          signing_bonus: { min: 100000, max: 200000 },
          total_first_year: { min: 505000, max: 1105000 }
        }
      ],
      equity_vesting: '4 years (25% per year) - Much better than Amazon!',
      benefits: [
        'Excellent health insurance',
        'Free meals (breakfast, lunch, dinner)',
        '401k matching',
        'Generous parental leave (4-6 months)',
        '$5000/year for professional development',
        'Free Oculus/VR devices',
        'Wellness reimbursement',
        'Commuter benefits'
      ]
    },

    culture: {
      values: [
        'Move Fast',
        'Be Bold',
        'Focus on Impact',
        'Be Open',
        'Build Social Value'
      ],
      work_life_balance: 'Generally good, but can vary by team. 45-50 hours typical. Hybrid/remote friendly post-COVID.',
      team_structure: 'Small cross-functional teams. Engineers have high autonomy and influence on product decisions.'
    },

    insider_tips: [
      'Meta coding interviews are harder than Google/Amazon - prepare accordingly',
      'Product sense matters - use Meta products and have opinions on improvements',
      'Bootcamp: new hires spend 6 weeks in bootcamp before choosing a team',
      'Performance reviews are twice a year - high performers get promoted fast',
      'E3→E4 typically takes 1.5-2 years, E4→E5 takes 2-3 years',
      'Stock refreshers are very generous - RSUs grow significantly over time',
      'Graph problems come up frequently - master BFS/DFS',
      'The "Pirate" (system design) round can make or break your level',
      'Company going through transformation - Reality Labs (VR), AI focus'
    ],

    red_flags: [
      'Not knowing Meta products well',
      'Inefficient solutions - Meta expects optimal from the start',
      'Not showing impact in past work',
      'Being risk-averse - they value boldness',
      'Not asking product questions'
    ],

    prep_recommendations: {
      coding_focus: [
        'Meta-tagged problems on LeetCode (200+)',
        'Focus on Medium-Hard difficulty',
        'BFS/DFS, Graphs, Trees, Strings are most common',
        'Practice on CoderPad',
        'Study Blind 75 + NeetCode 150'
      ],
      system_design_topics: [
        'Social network architectures (newsfeed, messaging)',
        'Real-time systems (live updates, notifications)',
        'Caching strategies (Memcached, Redis)',
        'Scalability for billions of users',
        'Content delivery networks',
        'Graph databases'
      ],
      behavioral_themes: [
        'Impact and results',
        'Moving fast and taking risks',
        'Cross-functional collaboration',
        'Handling ambiguity',
        'Product thinking'
      ],
      study_time: '2-3 months (heavy emphasis on hard coding problems)'
    }
  },

  // ============================================
  // APPLE
  // ============================================
  {
    id: 'apple',
    company: 'Apple',
    logo_url: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png',
    headquarters: 'Cupertino, CA',
    size: '164,000+ employees',
    industry: 'Consumer Electronics, Software',

    interview_process: {
      overview: 'Apple interviews are unique - highly secretive, product-focused, and vary significantly by team. Expect discussions about attention to detail, polish, and user experience.',
      typical_timeline: '4-8 weeks (can be longer due to scheduling)',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background review, passion for Apple products',
          tips: [
            'Show genuine enthusiasm for Apple products',
            'Discuss how you use Apple devices',
            'Mention attention to detail in past work',
            'Be prepared for NDA discussions'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: '40 min coding + 20 min discussion',
          question_types: ['Arrays', 'Strings', 'Trees', 'Object-Oriented Design'],
          tips: [
            'Expect practical problems related to Apple products',
            'OOP design is important',
            'Code quality and edge cases matter',
            'May ask about iOS/macOS development',
            'Discuss performance and memory optimization'
          ],
          example_problems: [
            'Design a photo album data structure',
            'Implement autocomplete for keyboard',
            'Design a music playlist'
          ]
        },
        {
          name: 'Onsite (5-8 rounds)',
          duration: 'Full day or split across 2 days',
          difficulty: 'Medium to Hard',
          focus: 'Coding, system design, team fit, product sense',
          tips: [
            'Varies dramatically by team',
            'Some teams do 5 rounds, others do 8+',
            'Expect deep technical discussions',
            'Product polish and UX are critical',
            'May include domain-specific questions (ML, graphics, etc.)'
          ]
        },
        {
          name: 'Coding Rounds (2-4 rounds)',
          duration: '60 minutes each',
          difficulty: 'Medium',
          focus: 'Algorithms + practical coding',
          question_types: ['All topics', 'Heavy on OOP design'],
          tips: [
            'Code quality is paramount - write clean, maintainable code',
            'Discuss memory management',
            'May ask platform-specific questions (Objective-C, Swift)',
            'Test edge cases thoroughly',
            'Explain your design decisions'
          ],
          example_problems: [
            'LRU Cache',
            'Design a class hierarchy',
            'Implement a linked list with specific operations',
            'String parsing problems'
          ]
        },
        {
          name: 'System Design',
          duration: '60 minutes',
          difficulty: 'Hard',
          focus: 'Design systems with excellent UX',
          tips: [
            'Consider user experience in every decision',
            'Discuss performance and battery life',
            'Apple cares about offline capabilities',
            'Security and privacy are critical',
            'May be product-specific (iOS, macOS, iCloud)'
          ],
          common_questions: [
            'Design iMessage',
            'Design Apple Photos sync',
            'Design Find My iPhone',
            'Design Apple Music streaming',
            'Design iCloud backup system'
          ]
        },
        {
          name: 'Behavioral & Team Fit',
          duration: '45-60 minutes',
          focus: 'Past work, collaboration, attention to detail',
          tips: [
            'Apple values secrecy and discretion',
            'Show examples of going above and beyond',
            'Discuss how you ensure quality',
            'Mention cross-functional collaboration',
            'Be humble but confident'
          ],
          common_questions: [
            'Tell me about a project where you paid extreme attention to detail',
            'Describe a time you made a product better for users',
            'How do you ensure code quality?',
            'Tell me about a time you had to learn something new quickly',
            'Why Apple?'
          ]
        },
        {
          name: 'Domain Expertise (varies by role)',
          duration: '60 minutes',
          focus: 'Deep technical knowledge in specific area',
          tips: [
            'For ML roles: algorithms, model training, deployment',
            'For iOS: Swift, UIKit, architecture patterns',
            'For backend: distributed systems, databases',
            'Be ready to go very deep in your specialty'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 35,
      system_design: 25,
      behavioral: 20,
      cultural_fit: 20 // Very important at Apple!
    },

    compensation: {
      levels: [
        {
          level: 'ICT2',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 120000, max: 150000 },
          stock: { min: 50000, max: 150000, vesting: '4 years' },
          bonus: { min: 10000, max: 25000 },
          signing_bonus: { min: 20000, max: 50000 },
          total_first_year: { min: 212500, max: 400000 }
        },
        {
          level: 'ICT3',
          title: 'Software Engineer',
          years_exp: '2-5 years',
          base: { min: 150000, max: 190000 },
          stock: { min: 150000, max: 300000, vesting: '4 years' },
          bonus: { min: 20000, max: 35000 },
          signing_bonus: { min: 30000, max: 70000 },
          total_first_year: { min: 237500, max: 520000 }
        },
        {
          level: 'ICT4',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 175000, max: 220000 },
          stock: { min: 250000, max: 500000, vesting: '4 years' },
          bonus: { min: 30000, max: 50000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 317500, max: 695000 }
        },
        {
          level: 'ICT5',
          title: 'Staff Software Engineer',
          years_exp: '8-12+ years',
          base: { min: 200000, max: 250000 },
          stock: { min: 400000, max: 800000, vesting: '4 years' },
          bonus: { min: 45000, max: 75000 },
          signing_bonus: { min: 75000, max: 150000 },
          total_first_year: { min: 420000, max: 1025000 }
        }
      ],
      equity_vesting: '4 years (25% per year)',
      benefits: [
        'Excellent health insurance',
        'Free Apple products (discounts on all devices)',
        '401k matching',
        'Parental leave',
        'Gym and fitness centers on campus',
        'Commuter benefits',
        'On-site cafeterias (subsidized, not free)',
        'Professional development budget'
      ]
    },

    culture: {
      values: [
        'Excellence and attention to detail',
        'User privacy and security',
        'Innovation through focus',
        'Cross-functional collaboration',
        'Secrecy and discretion'
      ],
      work_life_balance: 'Generally good, but intense before product launches. 40-50 hours typical, spikes during launch cycles.',
      team_structure: 'Siloed teams due to secrecy. Limited visibility into other projects. Strong team bonds within groups.'
    },

    insider_tips: [
      'Apple is extremely secretive - expect to sign lots of NDAs',
      'Product quality is paramount - show attention to detail',
      'Interview process can be slow due to scheduling and approvals',
      'Each team has different interview styles - ask your recruiter',
      'Working on shipped products (iPhone, Mac, etc.) is prestigious',
      'Stock vesting is linear (better than Amazon, not as good as Meta)',
      'Promotions can be slow - Apple values depth over breadth',
      'Campus is beautiful but work is compartmentalized',
      'Benefits are good but not as generous as Google/Meta'
    ],

    red_flags: [
      'Not caring about product quality and polish',
      'Discussing confidential info from previous companies',
      'Sloppy code or poor attention to detail',
      'Not using or caring about Apple products',
      'Being unable to go deep in your technical area'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on Medium difficulty problems',
        'OOP design is critical - study design patterns',
        'Practice writing clean, readable code',
        'Study Swift/Objective-C if applying for iOS',
        'Arrays, Strings, Trees, Linked Lists common'
      ],
      system_design_topics: [
        'Client-server architecture',
        'Offline capabilities and sync',
        'Security and encryption',
        'Performance optimization',
        'Battery life considerations',
        'Study Apple services (iCloud, Messages, Photos)'
      ],
      behavioral_themes: [
        'Attention to detail',
        'User-focused thinking',
        'Collaboration across teams',
        'Quality and craftsmanship',
        'Handling ambiguity'
      ],
      study_time: '2-3 months'
    }
  },

  // ============================================
  // MICROSOFT
  // ============================================
  {
    id: 'microsoft',
    company: 'Microsoft',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    headquarters: 'Redmond, WA',
    size: '221,000+ employees',
    industry: 'Software, Cloud Computing (Azure)',

    interview_process: {
      overview: 'Microsoft has a straightforward, professional interview process. Emphasis on problem-solving, collaboration, and growth mindset. Azure knowledge is a plus.',
      typical_timeline: '4-6 weeks',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, interest in Microsoft',
          tips: [
            'Discuss your passion for technology',
            'Show enthusiasm for Microsoft products',
            'Be clear about role expectations',
            'Ask about team and growth opportunities'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Coding + problem-solving discussion',
          question_types: ['Arrays', 'Strings', 'Linked Lists', 'Trees'],
          tips: [
            'Use Codility or Teams for coding',
            'Explain your thought process clearly',
            'Discuss multiple approaches',
            'Test your code',
            'Ask clarifying questions'
          ],
          example_problems: [
            'Reverse Linked List',
            'Valid Binary Search Tree',
            'First Unique Character in String'
          ]
        },
        {
          name: 'Virtual Onsite (4-5 rounds)',
          duration: '4-5 hours',
          difficulty: 'Medium',
          focus: '3 coding, 1 system design (senior), 1 behavioral',
          tips: [
            'Professional and straightforward',
            'Interviewers are generally friendly',
            'Show growth mindset',
            'Discuss trade-offs'
          ]
        },
        {
          name: 'Coding Rounds (3 rounds)',
          duration: '45-60 minutes each',
          difficulty: 'Medium',
          focus: 'Algorithms and data structures',
          question_types: ['All topics', 'Focus on fundamentals'],
          tips: [
            'Problems are typically fair and well-defined',
            'Less leetcode grinding than Google/Meta',
            'Focus on clean code and communication',
            'Discuss time/space complexity',
            'Test edge cases'
          ],
          example_problems: [
            'Merge Two Sorted Lists',
            'Lowest Common Ancestor',
            'Group Anagrams',
            'Word Search',
            'Implement Stack using Queues'
          ]
        },
        {
          name: 'System Design (Senior+)',
          duration: '60 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Design scalable systems, Azure knowledge helpful',
          tips: [
            'Reference Azure services if you know them',
            'Discuss microservices architecture',
            'Talk about reliability and monitoring',
            'Consider security and compliance',
            'Draw clear diagrams'
          ],
          common_questions: [
            'Design a file storage system (OneDrive-like)',
            'Design Microsoft Teams',
            'Design a notification system',
            'Design a distributed cache'
          ]
        },
        {
          name: 'Behavioral / "As Appropriate" (AA)',
          duration: '45-60 minutes',
          focus: 'Cultural fit, growth mindset, collaboration',
          tips: [
            'The "AA" round means you\'re likely to get an offer',
            'Show growth mindset - learning from failures',
            'Discuss collaboration and teamwork',
            'Be humble and open to feedback',
            'Prepare thoughtful questions about the role'
          ],
          common_questions: [
            'Tell me about a time you failed and what you learned',
            'Describe a challenging project and how you overcame obstacles',
            'How do you handle feedback?',
            'Tell me about a time you helped a teammate',
            'Why Microsoft?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 40,
      system_design: 25,
      behavioral: 20,
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: '59',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 110000, max: 140000 },
          stock: { min: 80000, max: 150000, vesting: '4 years' },
          bonus: { min: 0, max: 20000 },
          signing_bonus: { min: 10000, max: 50000 },
          total_first_year: { min: 210000, max: 360000 }
        },
        {
          level: '60-61',
          title: 'Software Engineer II',
          years_exp: '2-5 years',
          base: { min: 130000, max: 170000 },
          stock: { min: 120000, max: 250000, vesting: '4 years' },
          bonus: { min: 15000, max: 30000 },
          signing_bonus: { min: 20000, max: 60000 },
          total_first_year: { min: 195000, max: 510000 }
        },
        {
          level: '62-63',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 155000, max: 210000 },
          stock: { min: 200000, max: 400000, vesting: '4 years' },
          bonus: { min: 25000, max: 50000 },
          signing_bonus: { min: 30000, max: 80000 },
          total_first_year: { min: 260000, max: 640000 }
        },
        {
          level: '64-65',
          title: 'Principal Software Engineer',
          years_exp: '8-12+ years',
          base: { min: 185000, max: 240000 },
          stock: { min: 300000, max: 700000, vesting: '4 years' },
          bonus: { min: 40000, max: 80000 },
          signing_bonus: { min: 50000, max: 120000 },
          total_first_year: { min: 350000, max: 965000 }
        }
      ],
      equity_vesting: '4 years (25% per year)',
      benefits: [
        'Excellent health insurance',
        'Generous 401k matching (50% up to IRS limit)',
        'Parental leave',
        'Tuition reimbursement',
        'Free software and discounts on hardware',
        'Gym and wellness benefits',
        'Commuter benefits',
        'Strong work-life balance culture'
      ]
    },

    culture: {
      values: [
        'Growth mindset (core value)',
        'Customer obsession',
        'Diversity and inclusion',
        'One Microsoft (collaboration)',
        'Making a difference'
      ],
      work_life_balance: 'Excellent! 40-45 hours/week typical. Remote-friendly. Strong family culture.',
      team_structure: 'Varies by division. Azure teams are fast-paced, Office teams more stable. Generous vacation policy.'
    },

    insider_tips: [
      'Growth mindset is THE core value - show willingness to learn',
      'Microsoft is more relaxed than Google/Meta - less competitive',
      'Stock refreshers are decent but not as generous as Google/Meta',
      'Azure knowledge is valuable - mention if you have it',
      'Work-life balance is genuinely good compared to other FAANG',
      'Remote work is widely accepted post-COVID',
      'Promotions: 59→61 is ~2 years, 61→63 is ~3 years',
      'The "As Appropriate" (AA) round is a good sign',
      'Benefits are excellent, especially for families',
      'Company is growing fast in AI and cloud'
    ],

    red_flags: [
      'Being closed-minded or arrogant',
      'Not showing willingness to learn',
      'Poor communication skills',
      'Not being a team player',
      'Negative attitude about previous employers'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on Medium difficulty problems',
        'Fundamentals are key - not as leetcode-heavy',
        'Microsoft-tagged problems on LeetCode',
        'Arrays, Strings, Trees, Linked Lists most common',
        'Study Blind 75'
      ],
      system_design_topics: [
        'Microservices architecture',
        'Azure services (optional but helpful)',
        'Distributed systems basics',
        'Database design',
        'API design',
        'Study Microsoft products (Teams, Office, Azure)'
      ],
      behavioral_themes: [
        'Growth mindset - learning from failures',
        'Collaboration and teamwork',
        'Customer focus',
        'Handling challenges and ambiguity',
        'Leadership and initiative'
      ],
      study_time: '1.5-2 months (less intense than Google/Meta)'
    }
  },

  // ============================================
  // NETFLIX
  // ============================================
  {
    id: 'netflix',
    company: 'Netflix',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    headquarters: 'Los Gatos, CA',
    size: '12,800+ employees',
    industry: 'Streaming Entertainment',

    interview_process: {
      overview: 'Netflix has a unique culture: "Freedom and Responsibility". Interviews assess senior-level thinking, judgment, and cultural fit. High bar, high compensation.',
      typical_timeline: '4-8 weeks (can be lengthy)',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30-45 minutes',
          focus: 'Culture fit assessment, compensation expectations',
          tips: [
            'Netflix culture is unique - read the culture memo',
            'They hire only senior performers ("Keeper Test")',
            'Be direct about compensation - Netflix pays top of market',
            'Show examples of high impact work'
          ]
        },
        {
          name: 'Hiring Manager Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Technical discussion + cultural alignment',
          tips: [
            'Deep technical discussion about past work',
            'Show your judgment and decision-making',
            'Discuss trade-offs you\'ve made',
            'Be ready to defend your technical choices'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Coding or system design (role-dependent)',
          question_types: ['Focus on practical problems', 'Less leetcode, more real-world'],
          tips: [
            'Questions are often open-ended',
            'Show how you think through ambiguity',
            'Discuss production considerations',
            'Netflix values pragmatic solutions over perfect algorithms'
          ]
        },
        {
          name: 'Virtual Onsite (4-6 rounds)',
          duration: '5-6 hours (can span multiple days)',
          difficulty: 'Hard',
          focus: 'Deep technical expertise + culture fit',
          tips: [
            'Each interviewer assesses technical depth',
            'Culture fit is equally important as technical',
            'High autonomy means high judgment',
            'Every round matters - no "freebie" rounds'
          ]
        },
        {
          name: 'Technical Deep Dives (2-3 rounds)',
          duration: '60 minutes each',
          difficulty: 'Hard',
          focus: 'System design, architecture, past work',
          tips: [
            'Expect discussions about systems you\'ve built',
            'Be ready to go very deep on architecture decisions',
            'Discuss production issues and how you resolved them',
            'Show how you handle scale and reliability',
            'Streaming/video experience is a plus'
          ],
          common_questions: [
            'Design a video streaming system',
            'Design a recommendation engine',
            'Design a content delivery network',
            'Discuss a complex system you built and challenges faced'
          ]
        },
        {
          name: 'Coding (1-2 rounds)',
          duration: '60 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Practical problem solving',
          tips: [
            'Less focus on algorithms, more on practical coding',
            'May be role-specific (backend, data, ML)',
            'Write production-quality code',
            'Discuss testing and error handling',
            'Show pragmatism'
          ]
        },
        {
          name: 'Culture Fit (2-3 rounds)',
          duration: '45-60 minutes each',
          focus: 'Netflix culture values',
          tips: [
            'Study the Netflix culture memo thoroughly',
            'Show high judgment and decision-making',
            'Discuss how you give/receive candid feedback',
            'Demonstrate high performance',
            'Show you can handle "Freedom and Responsibility"',
            'Prepare for "Keeper Test" discussions'
          ],
          common_questions: [
            'Tell me about a time you gave difficult feedback',
            'Describe a situation where you had to make a judgment call',
            'How do you handle minimal processes and maximum freedom?',
            'Tell me about your biggest failure',
            'How do you stay high-performing without close management?',
            'Why Netflix?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 30,
      system_design: 30,
      behavioral: 25,
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: 'Senior',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 300000, max: 450000 },
          stock: { min: 0, max: 200000, vesting: 'Cash option available' },
          bonus: { min: 0, max: 0 },
          signing_bonus: { min: 0, max: 100000 },
          total_first_year: { min: 300000, max: 650000 }
        },
        {
          level: 'Staff',
          title: 'Staff Software Engineer',
          years_exp: '8-12 years',
          base: { min: 400000, max: 550000 },
          stock: { min: 0, max: 300000, vesting: 'Cash option available' },
          bonus: { min: 0, max: 0 },
          signing_bonus: { min: 0, max: 150000 },
          total_first_year: { min: 400000, max: 850000 }
        },
        {
          level: 'Senior Staff',
          title: 'Senior Staff Software Engineer',
          years_exp: '12-15+ years',
          base: { min: 500000, max: 700000 },
          stock: { min: 0, max: 500000, vesting: 'Cash option available' },
          bonus: { min: 0, max: 0 },
          signing_bonus: { min: 0, max: 200000 },
          total_first_year: { min: 500000, max: 1200000 }
        }
      ],
      equity_vesting: 'Unique: you choose cash or stock options. Most take cash.',
      benefits: [
        'Top of market compensation (all-cash)',
        'Unlimited vacation (actually used)',
        'No formal tracking of hours',
        'Excellent health insurance',
        'Parental leave (generous)',
        'Free Netflix subscription',
        'No 401k match (offset by higher compensation)'
      ]
    },

    culture: {
      values: [
        'Judgment',
        'Communication',
        'Curiosity',
        'Courage',
        'Passion',
        'Selflessness',
        'Innovation',
        'Inclusion',
        'Integrity',
        'Impact'
      ],
      work_life_balance: 'Flexible but high-performance. Unlimited vacation (typically 4-6 weeks/year). Work when you want, but deliver results.',
      team_structure: '"Freedom and Responsibility" - minimal process, high autonomy. No formal approvals needed. Fast-paced.'
    },

    insider_tips: [
      'Netflix only hires senior-level talent - junior roles are rare',
      'Compensation is top of market, mostly cash (not stock)',
      'Culture is not for everyone - requires self-motivation and judgment',
      'The "Keeper Test": would your manager fight to keep you? If no, you get severance',
      'Generous severance (4-6 months) if let go',
      'Unlimited vacation is real - people take 4-6 weeks typically',
      'Minimal process means you need to be self-directed',
      'Read the culture memo multiple times before interviewing',
      'High performance is expected - low performers are let go quickly',
      'Work-life balance is good if you can handle the autonomy'
    ],

    red_flags: [
      'Needing hand-holding or extensive management',
      'Not showing high judgment',
      'Being uncomfortable with candid feedback',
      'Not demonstrating high impact',
      'Poor cultural fit with "Freedom and Responsibility"'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on practical coding, not just algorithms',
        'System design is more important than leetcode',
        'Study streaming/video systems if possible',
        'Be ready to discuss production systems'
      ],
      system_design_topics: [
        'Video streaming architecture',
        'Content delivery networks (CDN)',
        'Recommendation systems',
        'Microservices at scale',
        'A/B testing and experimentation',
        'Data pipelines'
      ],
      behavioral_themes: [
        'Read Netflix culture memo',
        'Prepare examples of high judgment',
        'Candid feedback situations',
        'High-impact projects',
        'Working with minimal direction',
        'Handling failures and learning'
      ],
      study_time: '2-3 months (heavy focus on system design and culture)'
    }
  },

  // ============================================
  // UBER
  // ============================================
  {
    id: 'uber',
    company: 'Uber',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
    headquarters: 'San Francisco, CA',
    size: '32,000+ employees',
    industry: 'Ride-sharing, Delivery, Logistics',

    interview_process: {
      overview: 'Uber interviews focus on practical problem-solving, scalability, and "Move with Hustle" mentality. Expect real-world scenarios and system design.',
      typical_timeline: '3-5 weeks',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, interest in Uber',
          tips: [
            'Show passion for Uber\'s mission',
            'Discuss experience with two-sided marketplaces',
            'Be ready to discuss past impact',
            'Know Uber products (Uber, Eats, Freight)'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Coding in CoderPad',
          question_types: ['Arrays', 'Hash Maps', 'Trees', 'Graphs'],
          tips: [
            'Focus on efficiency and scalability',
            'Discuss real-world applications',
            'Test edge cases',
            'Communicate clearly'
          ],
          example_problems: [
            'Design a ride pricing algorithm',
            'Find shortest path (related to routing)',
            'Implement surge pricing logic'
          ]
        },
        {
          name: 'Virtual Onsite (4-5 rounds)',
          duration: '4-5 hours',
          difficulty: 'Medium to Hard',
          focus: '2 coding, 1 system design, 1 behavioral',
          tips: [
            'Fast-paced interviews',
            'Practical problem-solving',
            'Show bias for action',
            'Discuss real-world constraints'
          ]
        },
        {
          name: 'Coding Rounds (2 rounds)',
          duration: '45 minutes each',
          difficulty: 'Medium',
          focus: 'Algorithms and data structures',
          tips: [
            'Often ride-sharing or delivery themed',
            'Focus on optimal solutions',
            'Discuss trade-offs',
            'Write clean, testable code'
          ],
          example_problems: [
            'Meeting Rooms II',
            'Design Tic-Tac-Toe',
            'Evaluate Division',
            'Word Ladder'
          ]
        },
        {
          name: 'System Design',
          duration: '60 minutes',
          difficulty: 'Hard',
          focus: 'Design Uber-like systems',
          tips: [
            'Consider two-sided marketplace dynamics',
            'Discuss real-time location tracking',
            'Talk about surge pricing and matching algorithms',
            'Consider scale (millions of rides/day)',
            'Discuss fault tolerance and reliability'
          ],
          common_questions: [
            'Design Uber ride-sharing system',
            'Design Uber Eats',
            'Design surge pricing system',
            'Design driver-rider matching algorithm',
            'Design ETA calculation system'
          ]
        },
        {
          name: 'Behavioral',
          duration: '45 minutes',
          focus: 'Past work, collaboration, Uber values',
          tips: [
            'Prepare STAR stories',
            'Show bias for action and results',
            'Discuss how you handle fast-paced environments',
            'Mention customer obsession',
            'Be ready to discuss failures'
          ],
          common_questions: [
            'Tell me about a time you moved fast and broke things',
            'Describe a complex project you delivered',
            'How do you prioritize when everything is urgent?',
            'Tell me about a time you disagreed with a decision',
            'Why Uber?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 35,
      system_design: 30,
      behavioral: 20,
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: 'L3',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 130000, max: 160000 },
          stock: { min: 100000, max: 200000, vesting: '4 years' },
          bonus: { min: 15000, max: 25000 },
          signing_bonus: { min: 20000, max: 50000 },
          total_first_year: { min: 290000, max: 460000 }
        },
        {
          level: 'L4',
          title: 'Software Engineer II',
          years_exp: '2-5 years',
          base: { min: 160000, max: 200000 },
          stock: { min: 200000, max: 350000, vesting: '4 years' },
          bonus: { min: 25000, max: 40000 },
          signing_bonus: { min: 40000, max: 80000 },
          total_first_year: { min: 275000, max: 580000 }
        },
        {
          level: 'L5',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 190000, max: 240000 },
          stock: { min: 300000, max: 500000, vesting: '4 years' },
          bonus: { min: 35000, max: 60000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 350000, max: 700000 }
        }
      ],
      equity_vesting: '4 years (25% per year)',
      benefits: [
        'Health insurance',
        'Uber credits for rides and eats',
        '401k matching',
        'Parental leave',
        'Commuter benefits',
        'Learning budget',
        'Gym membership'
      ]
    },

    culture: {
      values: [
        'Customer obsession',
        'Make magic',
        'Move with hustle',
        'Champion diversity',
        'Do the right thing'
      ],
      work_life_balance: 'Fast-paced, intense. 45-55 hours typical. Has improved post-cultural reset.',
      team_structure: 'Cross-functional teams. High autonomy. Bias for action.'
    },

    insider_tips: [
      'Uber is rebuilding culture after past issues - be aware',
      'System design often involves two-sided marketplaces',
      'Location-based services and maps knowledge is valuable',
      'Fast-paced environment - show you can move quickly',
      'Compensation is competitive with other tech companies',
      'Stock value has been volatile - negotiate accordingly',
      'Teams vary widely in tech stack and WLB'
    ],

    red_flags: [
      'Not showing urgency or bias for action',
      'Being inflexible about requirements',
      'Not considering real-world constraints',
      'Poor communication',
      'Not showing customer empathy'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on Medium problems',
        'Graphs and trees (routing, maps)',
        'Hash maps and arrays',
        'Uber-tagged LeetCode problems',
        'Practice practical coding'
      ],
      system_design_topics: [
        'Two-sided marketplaces',
        'Real-time location tracking',
        'Geospatial indexing',
        'Matching algorithms',
        'Pricing systems',
        'Microservices'
      ],
      behavioral_themes: [
        'Moving fast',
        'Customer focus',
        'Handling ambiguity',
        'Collaboration',
        'Delivering results under pressure'
      ],
      study_time: '2 months'
    }
  },

  // ============================================
  // AIRBNB
  // ============================================
  {
    id: 'airbnb',
    company: 'Airbnb',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg',
    headquarters: 'San Francisco, CA',
    size: '6,800+ employees',
    industry: 'Travel, Hospitality Tech',

    interview_process: {
      overview: 'Airbnb has a rigorous interview process emphasizing product thinking, design, and cultural values. "Core Values" are tested heavily. Expect thoughtful, well-designed questions.',
      typical_timeline: '4-6 weeks',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, cultural fit, passion for travel',
          tips: [
            'Show genuine passion for Airbnb\'s mission',
            'Discuss your travel experiences',
            'Know Airbnb products deeply',
            'Be ready to discuss core values'
          ]
        },
        {
          name: 'Technical Phone Screen (1-2 rounds)',
          duration: '45-60 minutes',
          difficulty: 'Medium',
          focus: 'Coding + discussion',
          question_types: ['Arrays', 'Strings', 'Hash Tables', 'Design'],
          tips: [
            'Use CoderPad or HackerRank',
            'Coding style and clarity matter',
            'Think about user experience in your solutions',
            'Be ready for follow-up questions'
          ],
          example_problems: [
            'Design a reservation system',
            'Text justification',
            'Meeting Rooms'
          ]
        },
        {
          name: 'Virtual Onsite (5-6 rounds)',
          duration: '5-6 hours',
          difficulty: 'Medium to Hard',
          focus: '2 coding, 1 system design, 1 cross-functional, 1-2 core values',
          tips: [
            'Airbnb values thoroughness - take your time',
            'Product thinking is critical',
            'Core values round is make-or-break',
            'Show empathy and user-first mindset'
          ]
        },
        {
          name: 'Coding Rounds (2 rounds)',
          duration: '60 minutes each',
          difficulty: 'Medium',
          focus: 'Algorithms and problem solving',
          tips: [
            'Problems are well-designed and fair',
            'Clean code matters - write production-quality',
            'Discuss edge cases and testing',
            'Show your thought process',
            'Consider user impact'
          ],
          example_problems: [
            'Merge K Sorted Lists',
            'Alien Dictionary',
            'Calendar scheduling problems',
            'String manipulation'
          ]
        },
        {
          name: 'System Design',
          duration: '60 minutes',
          difficulty: 'Hard',
          focus: 'Design travel/booking systems',
          tips: [
            'Start with user experience and flows',
            'Consider host and guest perspectives (two-sided)',
            'Discuss availability, booking conflicts, payments',
            'Talk about trust and safety',
            'Scalability and reliability'
          ],
          common_questions: [
            'Design Airbnb search and booking system',
            'Design a calendar availability system',
            'Design a payment and payout system',
            'Design a review and rating system',
            'Design notification system for hosts/guests'
          ]
        },
        {
          name: 'Cross-Functional / Coding',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Collaboration with PM/Design',
          tips: [
            'Show how you work with non-engineers',
            'Discuss product trade-offs',
            'Demonstrate empathy for users',
            'Talk about data-driven decisions',
            'May include coding or system design'
          ]
        },
        {
          name: 'Core Values (1-2 rounds)',
          duration: '45-60 minutes',
          focus: 'Airbnb core values assessment',
          tips: [
            'Study Airbnb\'s 6 core values thoroughly',
            'Prepare 2-3 STAR stories for each value',
            'Show genuine alignment with mission',
            'Discuss how you\'d contribute to culture',
            'Be authentic - they can spot fake passion',
            'This round often determines final decision'
          ],
          common_questions: [
            'Tell me about a time you championed a mission',
            'Describe when you were a "cereal entrepreneur" (scrappy)',
            'How do you embrace the adventure?',
            'Tell me about a time you were a host (helped others)',
            'Describe a situation where you had to be a simplifier',
            'How do you "be Airbnb"?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 35,
      system_design: 25,
      behavioral: 25, // Core values are critical!
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: 'L3',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 140000, max: 175000 },
          stock: { min: 150000, max: 250000, vesting: '4 years' },
          bonus: { min: 10000, max: 25000 },
          signing_bonus: { min: 25000, max: 75000 },
          total_first_year: { min: 362500, max: 587500 }
        },
        {
          level: 'L4',
          title: 'Software Engineer',
          years_exp: '2-5 years',
          base: { min: 165000, max: 210000 },
          stock: { min: 250000, max: 400000, vesting: '4 years' },
          bonus: { min: 20000, max: 40000 },
          signing_bonus: { min: 40000, max: 100000 },
          total_first_year: { min: 287500, max: 650000 }
        },
        {
          level: 'L5',
          title: 'Senior Software Engineer',
          years_exp: '5-8 years',
          base: { min: 200000, max: 250000 },
          stock: { min: 350000, max: 600000, vesting: '4 years' },
          bonus: { min: 30000, max: 60000 },
          signing_bonus: { min: 60000, max: 120000 },
          total_first_year: { min: 377500, max: 880000 }
        }
      ],
      equity_vesting: '4 years (25% per year)',
      benefits: [
        'Excellent health insurance',
        'Annual travel credit ($2000 Airbnb credit)',
        '401k matching',
        'Quarterly travel stipend',
        'Generous parental leave',
        'Professional development budget',
        'Wellness benefits',
        'Flexible work arrangements'
      ]
    },

    culture: {
      values: [
        'Champion the Mission',
        'Be a Host',
        'Embrace the Adventure',
        'Be a Cereal Entrepreneur',
        'Simplify',
        'Every Frame Matters'
      ],
      work_life_balance: 'Good overall. 40-50 hours typical. Travel-friendly remote work. Strong emphasis on belonging.',
      team_structure: 'Cross-functional teams (eng, PM, design). Collaborative culture. Emphasis on quality over speed.'
    },

    insider_tips: [
      'Core values interview is critical - many strong candidates fail here',
      'Airbnb values product thinking highly - engineers influence product decisions',
      'Annual travel credit is amazing perk - actually encourages using the product',
      'Company went through IPO 2020 - stock has been volatile',
      'Travel industry cyclical - compensation adjusted post-COVID',
      'Beautiful office spaces, strong design culture',
      'Interview process is thorough but fair',
      'L3→L4 takes 2-3 years, L4→L5 takes 3-4 years',
      'Show genuine passion for travel and the mission'
    ],

    red_flags: [
      'Not showing genuine interest in travel or the mission',
      'Failing to demonstrate core values',
      'Not considering user experience in technical solutions',
      'Being purely technically focused without product sense',
      'Not showing empathy'
    ],

    prep_recommendations: {
      coding_focus: [
        'Airbnb-tagged problems on LeetCode',
        'Focus on Medium difficulty',
        'Calendar/scheduling problems',
        'String manipulation',
        'Hash maps and arrays',
        'Practice clean code'
      ],
      system_design_topics: [
        'Two-sided marketplaces',
        'Booking and reservation systems',
        'Search and discovery',
        'Payment processing',
        'Trust and safety systems',
        'Calendar availability systems'
      ],
      behavioral_themes: [
        'Study all 6 core values deeply',
        'Prepare stories showing mission-driven work',
        'Scrappiness and entrepreneurship',
        'Helping others and being a host',
        'Simplifying complex problems',
        'Attention to detail ("every frame matters")'
      ],
      study_time: '2-3 months (heavy focus on core values prep)'
    }
  },

  // ============================================
  // BLOOMBERG
  // ============================================
  {
    id: 'bloomberg',
    company: 'Bloomberg',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/New_Bloomberg_Logo.svg',
    headquarters: 'New York, NY',
    size: '20,000+ employees',
    industry: 'Financial Data & Analytics',

    interview_process: {
      overview: 'Bloomberg interviews focus on technical depth, C++ knowledge (often), and ability to work on high-performance financial systems. Expect practical coding and system design.',
      typical_timeline: '3-5 weeks',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, interest in financial tech',
          tips: [
            'Show interest in financial markets',
            'Discuss experience with real-time systems',
            'Mention performance optimization experience',
            'Be ready to discuss technical stack (C++, Python)'
          ]
        },
        {
          name: 'HackerRank Assessment',
          duration: '90 minutes',
          difficulty: 'Medium',
          focus: '2-3 coding problems',
          tips: [
            'Focus on correctness and efficiency',
            'Test edge cases',
            'May include C++ specific questions',
            'Performance matters'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Coding + technical discussion',
          question_types: ['Arrays', 'Strings', 'Hash Tables', 'Performance'],
          tips: [
            'May be asked to code in specific language (C++)',
            'Discuss performance and optimization',
            'Bloomberg values pragmatic solutions',
            'Show understanding of low-level concepts'
          ],
          example_problems: [
            'Implement data structure for financial data',
            'Time series analysis',
            'String parsing (financial data formats)'
          ]
        },
        {
          name: 'Onsite (4-5 rounds)',
          duration: '4-5 hours',
          difficulty: 'Medium',
          focus: '2-3 coding, 1 system design (senior), 1 behavioral',
          tips: [
            'Professional atmosphere',
            'Focus on practical solutions',
            'Performance and reliability matter',
            'Bloomberg values experience and depth'
          ]
        },
        {
          name: 'Coding Rounds (2-3 rounds)',
          duration: '45-60 minutes each',
          difficulty: 'Medium',
          focus: 'Data structures, algorithms, practical coding',
          tips: [
            'May require C++ or Python',
            'Focus on efficiency',
            'Discuss memory management',
            'Real-time constraints matter',
            'Clean, maintainable code'
          ],
          example_problems: [
            'LRU Cache',
            'Design rate limiter',
            'Time series data processing',
            'Financial calculations',
            'Multi-threading problems'
          ]
        },
        {
          name: 'System Design (Senior)',
          duration: '60 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Design financial systems',
          tips: [
            'Consider low-latency requirements',
            'Discuss data consistency and accuracy',
            'Real-time data processing',
            'Fault tolerance is critical',
            'Security and compliance'
          ],
          common_questions: [
            'Design a market data feed system',
            'Design a trading platform',
            'Design time-series database',
            'Design real-time analytics dashboard',
            'Design alerting system for financial events'
          ]
        },
        {
          name: 'Behavioral',
          duration: '45 minutes',
          focus: 'Past work, teamwork, problem-solving',
          tips: [
            'Prepare STAR stories',
            'Discuss technical challenges solved',
            'Show ability to work under pressure',
            'Bloomberg values reliability and quality',
            'Discuss collaboration'
          ],
          common_questions: [
            'Tell me about a challenging technical problem',
            'Describe a time you optimized performance',
            'How do you ensure code quality?',
            'Tell me about working with tight deadlines',
            'Why Bloomberg?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 45, // Very important
      system_design: 25,
      behavioral: 20,
      cultural_fit: 10
    },

    compensation: {
      levels: [
        {
          level: 'Entry',
          title: 'Software Engineer',
          years_exp: '0-2 years',
          base: { min: 130000, max: 160000 },
          stock: { min: 0, max: 0 },
          bonus: { min: 20000, max: 40000 },
          signing_bonus: { min: 10000, max: 30000 },
          total_first_year: { min: 160000, max: 230000 }
        },
        {
          level: 'Mid',
          title: 'Software Engineer',
          years_exp: '3-6 years',
          base: { min: 160000, max: 200000 },
          stock: { min: 0, max: 0 },
          bonus: { min: 30000, max: 60000 },
          signing_bonus: { min: 15000, max: 40000 },
          total_first_year: { min: 205000, max: 300000 }
        },
        {
          level: 'Senior',
          title: 'Senior Software Engineer',
          years_exp: '6-10 years',
          base: { min: 190000, max: 250000 },
          stock: { min: 0, max: 0 },
          bonus: { min: 50000, max: 100000 },
          signing_bonus: { min: 20000, max: 60000 },
          total_first_year: { min: 260000, max: 410000 }
        }
      ],
      equity_vesting: 'No stock - Bloomberg is private. Compensation is primarily cash + bonus.',
      benefits: [
        'Excellent health insurance',
        'Free breakfast and lunch',
        'Free Bloomberg terminal access (learn finance)',
        'Generous 401k matching',
        'Parental leave',
        'Gym membership',
        'Tuition reimbursement',
        'Commuter benefits',
        'Strong work-life balance'
      ]
    },

    culture: {
      values: [
        'Do the right thing',
        'Innovation through collaboration',
        'Give back',
        'Diversity and inclusion',
        'Excellence in engineering'
      ],
      work_life_balance: 'Excellent! 40-45 hours typical. Very stable, not startup-like. Family-friendly.',
      team_structure: 'Stable teams. Less movement than tech companies. Strong mentorship. Long tenure common.'
    },

    insider_tips: [
      'Bloomberg is private company - no stock, but very stable',
      'Compensation is good but not FAANG level - focus is stability',
      'Free meals are excellent (especially in NYC office)',
      'C++ knowledge is valuable for many teams',
      'Learn about financial markets - using Bloomberg terminal helps',
      'Work-life balance is genuinely good',
      'Great place for learning financial domain',
      'Strong focus on reliability and uptime',
      'Less layoffs compared to tech companies',
      'Interview is fair and professional, less intense than FAANG'
    ],

    red_flags: [
      'Not showing interest in financial domain',
      'Ignoring performance and efficiency',
      'Poor coding fundamentals',
      'Not valuing stability and reliability',
      'Expecting startup culture'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on Medium problems',
        'C++ is valuable (not required)',
        'Data structures fundamentals',
        'Performance optimization',
        'Multi-threading',
        'Practical coding'
      ],
      system_design_topics: [
        'Low-latency systems',
        'Time-series databases',
        'Real-time data processing',
        'Market data systems',
        'High-availability design',
        'Data consistency'
      ],
      behavioral_themes: [
        'Technical problem solving',
        'Performance optimization stories',
        'Working under pressure',
        'Ensuring quality and reliability',
        'Collaboration',
        'Interest in finance'
      ],
      study_time: '1.5-2 months'
    }
  },

  // ============================================
  // ADOBE
  // ============================================
  {
    id: 'adobe',
    company: 'Adobe',
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
    headquarters: 'San Jose, CA',
    size: '26,000+ employees',
    industry: 'Creative Software, Digital Media',

    interview_process: {
      overview: 'Adobe interviews emphasize algorithms, system design, and passion for creative products. Expect fair, well-structured interviews with focus on fundamentals.',
      typical_timeline: '3-5 weeks',
      rounds: [
        {
          name: 'Recruiter Screen',
          duration: '30 minutes',
          focus: 'Background, interest in Adobe products',
          tips: [
            'Show passion for creative tools',
            'Discuss experience with Adobe products',
            'Mention interest in digital media',
            'Be clear about technical interests'
          ]
        },
        {
          name: 'Coding Assessment (optional)',
          duration: '60-90 minutes',
          difficulty: 'Medium',
          focus: '2-3 coding problems',
          tips: [
            'Not always required',
            'Focus on correctness',
            'Test edge cases',
            'Clean code matters'
          ]
        },
        {
          name: 'Technical Phone Screen',
          duration: '60 minutes',
          difficulty: 'Medium',
          focus: 'Coding + technical discussion',
          question_types: ['Arrays', 'Strings', 'Trees', 'Graphics algorithms (for some roles)'],
          tips: [
            'Use CoderPad or similar',
            'Explain your thinking',
            'Discuss time/space complexity',
            'For graphics roles: know algorithms (rendering, image processing)'
          ],
          example_problems: [
            'Image transformation',
            'Color palette generation',
            'Text layout algorithms',
            'Tree/Graph problems'
          ]
        },
        {
          name: 'Virtual Onsite (4-5 rounds)',
          duration: '4-5 hours',
          difficulty: 'Medium',
          focus: '2-3 coding, 1 system design (senior), 1 behavioral',
          tips: [
            'Professional and friendly atmosphere',
            'Focus on fundamentals',
            'Product passion is valued',
            'Thorough but fair'
          ]
        },
        {
          name: 'Coding Rounds (2-3 rounds)',
          duration: '45-60 minutes each',
          difficulty: 'Medium',
          focus: 'Algorithms and problem solving',
          tips: [
            'Well-defined problems',
            'Focus on clarity and correctness',
            'Discuss trade-offs',
            'Test your code',
            'May include domain-specific questions (image processing, PDF, etc.)'
          ],
          example_problems: [
            'Merge Intervals',
            'Binary Tree problems',
            'String manipulation',
            'Graph traversal',
            'Design data structure for document editing'
          ]
        },
        {
          name: 'System Design (Senior)',
          duration: '60 minutes',
          difficulty: 'Medium to Hard',
          focus: 'Design creative/media systems',
          tips: [
            'Consider collaboration features',
            'Discuss asset storage and processing',
            'Real-time collaboration',
            'Scalability for large files',
            'Cloud architecture (Creative Cloud)'
          ],
          common_questions: [
            'Design a collaborative document editing system (like Google Docs)',
            'Design image storage and processing pipeline',
            'Design video rendering service',
            'Design font management system',
            'Design Creative Cloud sync'
          ]
        },
        {
          name: 'Behavioral',
          duration: '45 minutes',
          focus: 'Past work, collaboration, passion',
          tips: [
            'Prepare STAR stories',
            'Show passion for creative products',
            'Discuss teamwork and collaboration',
            'Adobe values innovation and creativity',
            'Be ready to discuss product ideas'
          ],
          common_questions: [
            'Tell me about a creative solution you developed',
            'Describe a challenging project',
            'How do you approach new problems?',
            'Tell me about working in a team',
            'Why Adobe?',
            'What Adobe product do you use and how would you improve it?'
          ]
        }
      ]
    },

    evaluation_criteria: {
      coding: 40,
      system_design: 25,
      behavioral: 20,
      cultural_fit: 15
    },

    compensation: {
      levels: [
        {
          level: 'CS1',
          title: 'Computer Scientist 1',
          years_exp: '0-2 years',
          base: { min: 115000, max: 145000 },
          stock: { min: 50000, max: 100000, vesting: '4 years' },
          bonus: { min: 10000, max: 20000 },
          signing_bonus: { min: 10000, max: 30000 },
          total_first_year: { min: 197500, max: 320000 }
        },
        {
          level: 'CS2',
          title: 'Computer Scientist 2',
          years_exp: '2-5 years',
          base: { min: 140000, max: 180000 },
          stock: { min: 100000, max: 200000, vesting: '4 years' },
          bonus: { min: 15000, max: 30000 },
          signing_bonus: { min: 20000, max: 50000 },
          total_first_year: { min: 200000, max: 410000 }
        },
        {
          level: 'CS3',
          title: 'Senior Computer Scientist',
          years_exp: '5-8 years',
          base: { min: 170000, max: 220000 },
          stock: { min: 150000, max: 300000, vesting: '4 years' },
          bonus: { min: 25000, max: 45000 },
          signing_bonus: { min: 30000, max: 70000 },
          total_first_year: { min: 262500, max: 560000 }
        },
        {
          level: 'CS4',
          title: 'Principal Scientist',
          years_exp: '8-12+ years',
          base: { min: 200000, max: 260000 },
          stock: { min: 250000, max: 500000, vesting: '4 years' },
          bonus: { min: 40000, max: 70000 },
          signing_bonus: { min: 50000, max: 100000 },
          total_first_year: { min: 352500, max: 805000 }
        }
      ],
      equity_vesting: '4 years (25% per year)',
      benefits: [
        'Excellent health insurance',
        'Free Creative Cloud subscription',
        'Product discounts',
        '401k matching',
        'Generous parental leave',
        'Professional development budget',
        'Wellness benefits',
        'Flexible work arrangements',
        'Learning stipend'
      ]
    },

    culture: {
      values: [
        'Creativity',
        'Innovation',
        'Exceptional employee experience',
        'Genuine',
        'Inclusive'
      ],
      work_life_balance: 'Very good. 40-45 hours typical. Family-friendly. Flexible remote work.',
      team_structure: 'Stable teams working on established products. Collaborative environment. Less volatile than startups.'
    },

    insider_tips: [
      'Adobe has excellent work-life balance - very family-friendly',
      'Free Creative Cloud is amazing perk for creatives',
      'Less competitive than FAANG but good compensation',
      'Stock has been stable and growing',
      'Great for learning at scale (millions of users)',
      'Strong mentorship and career development',
      'Interview process is fair and professional',
      'Company is very stable - low layoff risk',
      'Good stepping stone or long-term career',
      'Passionate creative users make work meaningful'
    ],

    red_flags: [
      'Not showing interest in creative products',
      'Poor fundamentals',
      'Not being a team player',
      'Expecting startup pace and chaos',
      'Not valuing stability'
    ],

    prep_recommendations: {
      coding_focus: [
        'Focus on Medium difficulty',
        'Fundamentals: arrays, strings, trees, graphs',
        'Adobe-tagged LeetCode problems',
        'For graphics roles: study image processing algorithms',
        'Blind 75 coverage'
      ],
      system_design_topics: [
        'Collaborative editing systems',
        'File storage and processing',
        'Real-time sync',
        'Asset management',
        'Cloud architecture',
        'CDN for large files'
      ],
      behavioral_themes: [
        'Passion for creative tools',
        'Innovation and creativity',
        'Collaboration',
        'Problem-solving approach',
        'Learning and growth'
      ],
      study_time: '1.5-2 months'
    }
  }
];

/**
 * Get guide by company ID
 */
export function getCompanyGuide(companyId: string): CompanyGuide | undefined {
  return COMPANY_GUIDES.find(g => g.id === companyId);
}

/**
 * Get guide by company name (fuzzy match)
 */
export function getCompanyGuideByName(companyName: string): CompanyGuide | undefined {
  const normalized = companyName.toLowerCase().trim();
  return COMPANY_GUIDES.find(g =>
    g.company.toLowerCase() === normalized ||
    g.company.toLowerCase().includes(normalized) ||
    normalized.includes(g.company.toLowerCase())
  );
}

/**
 * Get all available companies
 */
export function getAllCompanies(): string[] {
  return COMPANY_GUIDES.map(g => g.company);
}
