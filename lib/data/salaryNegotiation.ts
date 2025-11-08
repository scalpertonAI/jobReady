/**
 * Salary Negotiation Toolkit
 * Scripts, timing, tactics, and data for successful negotiations
 */

export interface NegotiationScript {
  id: string;
  scenario: string;
  context: string;
  script: string;
  why_it_works: string;
  variations: string[];
  mistakes_to_avoid: string[];
}

export interface NegotiationTactic {
  id: string;
  name: string;
  description: string;
  when_to_use: string;
  how_to_use: string;
  example: string;
  success_rate: string;
  risks: string[];
}

export interface CompensationComponent {
  component: string;
  what_it_is: string;
  negotiability: 'High' | 'Medium' | 'Low';
  tips: string[];
  typical_ranges: string;
}

// ============================================
// NEGOTIATION SCRIPTS
// ============================================

export const NEGOTIATION_SCRIPTS: NegotiationScript[] = [
  {
    id: 'initial-offer-response',
    scenario: 'Responding to the First Offer',
    context: 'Recruiter just gave you an offer: $150K base, $100K stock, $20K bonus. You want to negotiate without seeming greedy.',
    script: '"Thank you so much for the offer! I\'m really excited about the opportunity to join [Company] and work on [specific project/team]. This is definitely a competitive package. Before I respond, could you share the salary range for this level? I want to make sure I\'m understanding the full picture correctly. Also, I\'d love to take a day or two to review everything carefully - would that work for you?"',
    why_it_works: 'Shows enthusiasm, doesn\'t accept immediately (preserves negotiating power), asks for range (sets anchor), buys time to strategize, sounds professional not greedy.',
    variations: [
      'If you already know the range: "I was expecting something closer to the top of the range for this level given my [specific skill/experience]. Is there flexibility there?"',
      'If offer is low: "I appreciate the offer. Based on my research and conversations with folks at [Company], I was expecting something in the $X-Y range. Can we discuss that?"',
      'If you have competing offers: "This is a strong offer. I do have another offer I\'m considering. Could we schedule a call to discuss the details?"'
    ],
    mistakes_to_avoid: [
      'Accepting immediately (even if excited)',
      'Saying "I need more money" without justification',
      'Negotiating over email before phone conversation',
      'Asking for unrealistic numbers',
      'Being vague about what you want'
    ]
  },

  {
    id: 'competing-offer-leverage',
    scenario: 'Leveraging a Competing Offer',
    context: 'You have an offer from Google ($200K total comp) and Amazon just offered $180K. You prefer Amazon\'s team but want them to match.',
    script: '"I really appreciate Amazon\'s offer and I\'m genuinely excited about the team and the work. I want to be transparent - I have another offer from [Company] with a total compensation of $200K. Amazon is my top choice because [specific reasons: team, product, growth], but the compensation gap is making this decision difficult. Is there any flexibility to get closer to that number?"',
    why_it_works: 'Honest and transparent, shows you\'re not just chasing money (explains why you prefer them), gives them a clear number to match, asks open-ended question.',
    variations: [
      'If they can\'t match: "I understand. Would it be possible to re-evaluate compensation at the 6-month mark based on performance?"',
      'If they ask for proof: "I\'d be happy to share the offer letter. The other company is [Name] and the role is [Title]."',
      'If you don\'t have competing offer but market data: "Based on market research and conversations, similar roles at [Companies] are offering $X-Y. Can we align closer to that?"'
    ],
    mistakes_to_avoid: [
      'Lying about competing offers (easily verified)',
      'Making ultimatums ("Match or I walk")',
      'Mentioning companies you wouldn\'t actually join',
      'Being vague about the competing offer amount',
      'Sounding like you\'re just using them for leverage'
    ]
  },

  {
    id: 'non-salary-negotiation',
    scenario: 'Negotiating Non-Salary Components',
    context: 'Company says base salary is fixed at $150K (at top of band) but you want more total comp.',
    script: '"I understand the base salary is at the top of the band. I appreciate that. Given my [specific experience/skill], I was hoping for total compensation closer to $250K. Since base is fixed, could we explore other components? For example: 1) Additional equity grant, 2) Sign-on bonus to offset year 1 difference, 3) Performance bonus target increase, 4) Earlier first review/raise at 6 months instead of 12. Which of these has the most flexibility?"',
    why_it_works: 'Accepts their constraint, pivots to total comp, provides specific alternatives (makes their job easier), shows flexibility, asks which is easiest for them.',
    variations: [
      'For startups: "Could we discuss a larger equity stake given the stage of the company?"',
      'For remote roles: "Would there be flexibility on a remote work stipend or home office budget?"',
      'For relocation: "I noticed there\'s no relocation package. Given the move from [City], could we add $20K for that?"',
      'For benefits: "Could we increase the professional development budget or add more PTO?"'
    ],
    mistakes_to_avoid: [
      'Only focusing on base salary',
      'Not knowing what\'s negotiable',
      'Asking for everything at once',
      'Not prioritizing what matters most to you',
      'Forgetting to calculate total comp'
    ]
  },

  {
    id: 'lowball-offer-response',
    scenario: 'Responding to a Lowball Offer',
    context: 'You were expecting $180K+ but they offered $130K. This is 30% below market.',
    script: '"Thank you for the offer. I\'m very interested in the role and impressed by the team. However, I was surprised by the compensation - it\'s quite a bit lower than I expected. Based on my [X years experience], [specific skills: e.g., expertise in ML/distributed systems], and market research for this level at companies like [comparable companies], I was expecting $180K-200K total comp. The $130K offer is significantly below that. Is there room to discuss bringing this more in line with market rates?"',
    why_it_works: 'Professional not offended, shows you did research, provides specific justification, references market data, ends with open question.',
    variations: [
      'If they say no flexibility: "I understand. Would there be a path to get to market rate within the first year based on performance?"',
      'If it\'s a startup: "I understand you may have budget constraints. Could we explore more equity to offset the lower base?"',
      'If it\'s really insulting: "This offer is 40% below market rate. I don\'t think we\'re aligned on the level. Could we clarify whether this is for Senior vs Staff level?"'
    ],
    mistakes_to_avoid: [
      'Getting emotional or angry',
      'Accepting a lowball just because you need a job',
      'Not doing research before the conversation',
      'Saying "That\'s insulting" (unprofessional)',
      'Not giving them a chance to revise'
    ]
  },

  {
    id: 'extending-deadline',
    scenario: 'Asking for More Time to Decide',
    context: 'They gave you 7 days to decide but you\'re waiting on another offer that takes 14 days.',
    script: '"I really appreciate the offer and I\'m taking it very seriously. I want to be respectful of your timeline, but I need a bit more time to make such an important decision. I\'m in final stages with another company and should have clarity in about 10 days. Would it be possible to extend the deadline to [specific date]? I promise to give you my decision by then and I won\'t drag this out."',
    why_it_works: 'Respectful of their time, specific about why you need time, gives exact date (not open-ended), shows commitment to decide promptly, implies competing offer.',
    variations: [
      'If they say no: "I understand the urgency. Could we extend by just 3-4 days? That would really help."',
      'If they pressure: "I want to join a company where I\'m 100% certain it\'s the right fit. Rushing this decision wouldn\'t be good for either of us."',
      'If deadline is unreasonable (2-3 days): "I appreciate the offer but 2 days isn\'t enough time for such a big decision. Industry standard is 1-2 weeks. Could we extend to at least 7 days?"'
    ],
    mistakes_to_avoid: [
      'Not asking (companies usually give extensions)',
      'Being vague about why you need time',
      'Asking for too much time (>3 weeks)',
      'Not giving a firm date',
      'Sounding uncertain about wanting the job'
    ]
  },

  {
    id: 'accepting-offer',
    scenario: 'Accepting the Final Offer',
    context: 'They\'ve negotiated to $175K total comp. You\'re happy with it and ready to accept.',
    script: '"Thank you for working with me on the compensation. I really appreciate your flexibility and it shows how much [Company] values its people. I\'m excited to accept the offer! The total package of $175K [break down: $X base, $Y stock, $Z bonus] is great, and more importantly, I\'m thrilled about [specific: working with the team/product]. When can we make this official? I\'ll need to give 2 weeks notice to my current employer, so my start date would be [Date]. Looking forward to joining the team!"',
    why_it_works: 'Shows appreciation, confirms the numbers explicitly (avoid surprises), expresses genuine excitement, provides clear next steps, professional about notice period.',
    variations: [
      'If asking for written offer: "Could you send the official offer letter with all the details we discussed? I\'d like to review it before formally accepting."',
      'If negotiating start date: "Everything looks great. One thing - would it be possible to start on [later date] instead? I have some personal commitments."',
      'If confirming verbal promises: "Just to confirm, we discussed [X benefit/raise timeline/etc] - will that be in the written offer?"'
    ],
    mistakes_to_avoid: [
      'Continuing to negotiate after saying yes',
      'Not getting everything in writing',
      'Not confirming ALL components of compensation',
      'Burning bridges with current employer',
      'Starting before background check clears'
    ]
  }
];

// ============================================
// NEGOTIATION TACTICS
// ============================================

export const NEGOTIATION_TACTICS: NegotiationTactic[] = [
  {
    id: 'anchor-high',
    name: 'Anchoring High',
    description: 'Set the first number higher than your target to anchor the negotiation in your favor.',
    when_to_use: 'When asked for salary expectations early in the process.',
    how_to_use: 'If your target is $150K, say "I\'m looking for $170K-190K" - this anchors high. They\'ll negotiate down to $160-170K which is above your target.',
    example: 'Recruiter: "What are your salary expectations?" You: "Based on my experience and market research, I\'m targeting $180K-200K in total compensation."',
    success_rate: '70% - works if your anchor is within reason (not 2x market)',
    risks: [
      'If you anchor too high, they may stop the process',
      'They may ask you to justify the number',
      'Works best when you have competing offers or strong leverage'
    ]
  },

  {
    id: 'never-first',
    name: 'Never Give Number First',
    description: 'Delay sharing your number until they share theirs. Whoever names first loses leverage.',
    when_to_use: 'Early conversations before you have full context of the role/level.',
    how_to_use: 'When asked for expectations: "I\'d love to learn more about the role and level first. What\'s the budget for this position?" or "I\'m flexible and more focused on the opportunity. What range did you have in mind?"',
    example: 'Recruiter: "What are your salary expectations?" You: "I\'m sure you have a range budgeted for this role. What is it? I can let you know if we\'re in the same ballpark."',
    success_rate: '60% - recruiters are trained to counter this, but worth trying',
    risks: [
      'They may insist you share first',
      'Can sound evasive if done poorly',
      'Doesn\'t work if they have strict policy'
    ]
  },

  {
    id: 'total-comp-focus',
    name: 'Total Compensation Focus',
    description: 'Negotiate on total comp (base + bonus + equity + perks) not just base salary.',
    when_to_use: 'When base salary is fixed or capped at top of band.',
    how_to_use: 'Calculate total comp: Base + Annual Bonus + Stock (vested year 1) + Sign-on + Perks. Negotiate this number. Example: $150K base + $30K bonus + $50K stock (year 1) + $20K sign-on = $250K total.',
    example: '"I understand base is capped at $160K. Could we increase the stock grant from $200K to $300K over 4 years? That would bring year 1 total comp to my target of $240K."',
    success_rate: '80% - companies often have more flexibility here than base',
    risks: [
      'Stock may not vest if you leave',
      'Some components are taxed differently',
      'Make sure you understand vesting schedules'
    ]
  },

  {
    id: 'competing-offer',
    name: 'Competing Offer Leverage',
    description: 'Use other offers to negotiate better compensation.',
    when_to_use: 'When you have a legitimate competing offer and company is your top choice.',
    how_to_use: 'Be transparent: "I have another offer at $X but I prefer your company because [reasons]. Can you match?" Don\'t lie - they may ask for proof.',
    example: '"I have an offer from Google at $220K total comp. I\'m more excited about the work at Meta, but the $40K difference is significant. Is there flexibility to get closer?"',
    success_rate: '85% if offer is real and comparable',
    risks: [
      'They may call your bluff and ask for offer letter',
      'If you lie and they find out, offer may be rescinded',
      'They may say "take the other offer" if gap is too large'
    ]
  },

  {
    id: 'future-raise',
    name: 'Future Raise Guarantee',
    description: 'If they can\'t meet your number now, negotiate a guaranteed raise after 6-12 months.',
    when_to_use: 'When offer is below target but close, and you really want the job.',
    how_to_use: '"The offer is $10K below my target. If I accept, could we commit to a performance review at 6 months with a raise to $X if performance is strong?"',
    example: '"I understand $160K is the max for now. Could we agree to re-evaluate at my 6-month review with a path to $175K?"',
    success_rate: '50% - get it in writing or it won\'t happen',
    risks: [
      'Must be in writing in offer letter',
      'May not happen if company has budget freeze',
      'Usually tied to performance (subjective)'
    ]
  }
];

// ============================================
// COMPENSATION COMPONENTS
// ============================================

export const COMPENSATION_COMPONENTS: CompensationComponent[] = [
  {
    component: 'Base Salary',
    what_it_is: 'Annual salary paid in regular paychecks (bi-weekly or monthly). Guaranteed regardless of performance.',
    negotiability: 'Medium',
    tips: [
      'Hardest to negotiate - usually tied to level/band',
      'If at top of band, focus on other components',
      'New grads: less room. Senior+: more room',
      'Can sometimes get higher base by leveling up (L4→L5)'
    ],
    typical_ranges: 'Entry: $80K-120K, Mid: $120K-180K, Senior: $160K-250K, Staff+: $200K-350K (FAANG)'
  },

  {
    component: 'Stock/Equity',
    what_it_is: 'Company stock granted over 4 years (typical vesting: 25% per year). Value depends on stock price.',
    negotiability: 'High',
    tips: [
      'Most negotiable component at FAANG',
      'Ask for more shares, not dollar value (value changes)',
      'Understand vesting schedule (backloaded vs linear)',
      'Startups: equity percentage matters more than dollar value',
      'Ask about refresh grants (additional stock after year 1)'
    ],
    typical_ranges: 'FAANG Entry: $50K-150K/4yr, Senior: $200K-500K/4yr, Staff+: $500K-2M/4yr'
  },

  {
    component: 'Sign-On Bonus',
    what_it_is: 'One-time cash payment when you join. Usually paid in first paycheck. Often has 1-year clawback if you leave early.',
    negotiability: 'High',
    tips: [
      'Very negotiable - used to offset equity left behind at old job',
      'Ask for sign-on to bridge gap if base/stock capped',
      'Watch for clawback clauses (must repay if leave within 1 year)',
      'Taxed as regular income (~40% goes to taxes)',
      'Great for offsetting equity cliff or annual bonus you\'re losing'
    ],
    typical_ranges: '$10K-50K for mid-level, $50K-200K for senior+'
  },

  {
    component: 'Annual Bonus',
    what_it_is: 'Performance-based cash paid annually. Typically 10-30% of base salary. Not guaranteed.',
    negotiability: 'Medium',
    tips: [
      'Can negotiate target percentage (e.g., 15% → 20% of base)',
      'Actual payout varies based on company + individual performance',
      'Ask about historical payout rates',
      'Some companies pay 0-200% of target',
      'Less common at startups, standard at established companies'
    ],
    typical_ranges: '10-15% (mid-level), 15-25% (senior), 25-50% (executive)'
  },

  {
    component: 'Relocation Package',
    what_it_is: 'Money to cover moving expenses. Can be lump sum or reimbursement.',
    negotiability: 'Medium',
    tips: [
      'Always ask if relocating - many companies offer it',
      'Negotiate amount based on distance and family size',
      'Ask about temporary housing coverage',
      'Some companies add home sale assistance',
      'Watch for clawback (must repay if leave within 1-2 years)'
    ],
    typical_ranges: '$5K-20K (single), $15K-40K (family), $50K+ (executive)'
  },

  {
    component: 'Benefits & Perks',
    what_it_is: 'Health insurance, 401k match, PTO, parental leave, learning budget, etc.',
    negotiability: 'Low',
    tips: [
      'Usually standardized, hard to negotiate',
      'Can sometimes get more PTO (especially at director+ level)',
      'Ask about remote work stipend, learning budget',
      'Compare health insurance costs (premiums, deductibles)',
      'Consider 401k match in total comp (free money!)'
    ],
    typical_ranges: 'Varies widely. Top companies: $20K-50K/year value'
  }
];

// ============================================
// TIMELINE & PROCESS
// ============================================

export const NEGOTIATION_TIMELINE = {
  title: 'When to Negotiate in the Interview Process',
  stages: [
    {
      stage: 'Initial Recruiter Call',
      timing: 'Week 0',
      what_to_do: 'Avoid sharing salary expectations. If pressed: "I\'m flexible and want to learn more about the role first. What\'s the range?"',
      what_not_to_do: 'Don\'t anchor low. Don\'t accept their first range without research.'
    },
    {
      stage: 'During Interviews',
      timing: 'Weeks 1-4',
      what_to_do: 'Focus on showing value. Build relationships. Gather information about level/comp.',
      what_not_to_do: 'Don\'t bring up compensation. Don\'t ask interviewers about salary.'
    },
    {
      stage: 'After Final Interview',
      timing: 'Week 4-5',
      what_to_do: 'Send thank you notes. If recruiter asks about timeline, mention other companies if true.',
      what_not_to_do: 'Don\'t seem desperate or too eager.'
    },
    {
      stage: 'Verbal Offer',
      timing: 'Week 5',
      what_to_do: 'Express excitement. Ask for time to review. Get written offer. Research market rates.',
      what_not_to_do: 'Don\'t accept immediately. Don\'t negotiate over email first.'
    },
    {
      stage: 'Negotiation Call',
      timing: 'Week 5-6',
      what_to_do: 'Schedule call with recruiter. Come prepared with research and specific ask. Use scripts above.',
      what_not_to_do: 'Don\'t be emotional or make ultimatums.'
    },
    {
      stage: 'Decision',
      timing: 'Week 6',
      what_to_do: 'Get revised offer in writing. Confirm all details. Accept or decline gracefully.',
      what_not_to_do: 'Don\'t keep negotiating after accepting.'
    }
  ]
};

// ============================================
// MARKET DATA & BENCHMARKS
// ============================================

export const MARKET_BENCHMARKS = {
  faang_levels: {
    'Entry (L3/E3/SDE1)': {
      years_exp: '0-2',
      base: '$120K-160K',
      total: '$180K-280K',
      top_companies: 'Google, Meta, Amazon'
    },
    'Mid (L4/E4/SDE2)': {
      years_exp: '2-5',
      base: '$150K-200K',
      total: '$250K-400K',
      top_companies: 'Google, Meta, Amazon'
    },
    'Senior (L5/E5/SDE3)': {
      years_exp: '5-8',
      base: '$180K-250K',
      total: '$350K-600K',
      top_companies: 'Google, Meta, Netflix'
    },
    'Staff (L6/E6)': {
      years_exp: '8-12',
      base: '$200K-300K',
      total: '$500K-900K',
      top_companies: 'Google, Meta, Netflix'
    },
    'Senior Staff (L7/E7)': {
      years_exp: '12-15',
      base: '$250K-350K',
      total: '$800K-1.5M',
      top_companies: 'Google, Meta, Netflix'
    }
  },

  negotiation_tips: [
    'Research levels.fyi, glassdoor, blind for real data',
    'Total comp more important than base',
    'Equity value varies - Google/Meta stock more stable than startup',
    'Consider taxes - CA has 13% state tax, WA has none',
    'COL matters - $150K in Austin ≈ $200K in SF',
    'Remote roles often pay ~10-20% less than onsite',
    'Negotiate before accepting, not after'
  ]
};

/**
 * Helper functions
 */
export function getScriptByScenario(scenarioId: string) {
  return NEGOTIATION_SCRIPTS.find(s => s.id === scenarioId);
}

export function getTacticById(tacticId: string) {
  return NEGOTIATION_TACTICS.find(t => t.id === tacticId);
}

export function calculateTotalComp(components: {
  base: number;
  stock_year1: number;
  bonus: number;
  sign_on: number;
}) {
  return components.base + components.stock_year1 + components.bonus + components.sign_on;
}
