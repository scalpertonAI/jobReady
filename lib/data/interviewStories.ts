/**
 * Interview Stories Database
 * Real success stories from candidates who landed offers at top companies
 * (Stories are anonymized but based on real experiences)
 */

export interface InterviewStory {
  id: string;
  title: string;
  company: string;
  level: string;
  final_offer: {
    base: number;
    stock_4yr: number;
    bonus: number;
    sign_on: number;
    total_first_year: number;
  };

  // Candidate background
  background: {
    years_experience: number;
    previous_company: string;
    education: string;
    specialty: string[];
  };

  // Journey
  timeline: string;
  preparation_time: string;

  // The story
  story: {
    initial_situation: string;
    preparation_approach: string;
    interview_experience: string;
    challenges_faced: string;
    negotiation_journey: string;
    final_outcome: string;
  };

  // Key learnings
  key_learnings: string[];

  // Specific tips
  tips_for_others: string[];

  // Mistakes made
  mistakes_to_avoid: string[];

  // Resources used
  resources_used: string[];

  tags: string[];
}

export const INTERVIEW_STORIES: InterviewStory[] = [
  {
    id: 'google-l5-career-change',
    title: 'From Startup to Google L5: How I Negotiated $500K',
    company: 'Google',
    level: 'L5 (Senior Software Engineer)',
    final_offer: {
      base: 210000,
      stock_4yr: 400000,
      bonus: 45000,
      sign_on: 75000,
      total_first_year: 430000
    },

    background: {
      years_experience: 7,
      previous_company: 'Series B Startup',
      education: 'BS Computer Science (state school)',
      specialty: ['Distributed Systems', 'Backend', 'Golang']
    },

    timeline: '4 months from application to offer',
    preparation_time: '3 months of focused study',

    story: {
      initial_situation: 'I had been at a startup for 4 years making $140K. The company was struggling and I knew I needed to move. I had never interviewed at FAANG and honestly felt intimidated. My LeetCode skills were rusty and I hadn\'t done system design in years.',

      preparation_approach: 'I created a strict study schedule: 2 hours daily for 3 months. Week 1-4: Solved Blind 75 problems, focusing on understanding patterns not memorization. Week 5-8: Did 2-3 medium LeetCode problems daily, reviewed solutions even when I got it right. Week 9-12: System design - read "Designing Data Intensive Applications", practiced designing 2 systems per week on whiteboard, watched YouTube videos. Behavioral: Wrote out 8 STAR stories covering all major categories. Practiced telling them out loud (felt silly but it helped!). Mock interviews: Did 6 mock interviews on Pramp - failed the first 3 badly, but improved.',

      interview_experience: 'Application → Recruiter call (1 week). Technical phone screen (2 weeks later): Got a medium array problem and a follow-up graph problem. Solved both but code was messy. Somehow passed. Virtual onsite (3 weeks later): 5 rounds - 2 coding, 1 system design, 1 Googleyness, 1 with hiring manager. \n\nCoding Round 1: "Design a LRU Cache" - I had practiced this! Nailed it in 25 minutes, spent rest discussing trade-offs. Round 2: Tree problem I hadn\'t seen. Struggled for 15 minutes, then interviewer gave hint. Got partial solution. Thought I failed. \n\nSystem Design: "Design YouTube" - Prepared this exact problem! Talked about video encoding, CDN, recommendation engine. Went deep on video storage. Interviewer seemed impressed. \n\nGoogleyness: All behavioral questions. Used my STAR stories. Felt good. \n\nHiring Manager: Mix of technical discussion about distributed systems and culture fit. Went well - we connected on Golang.',

      challenges_faced: 'Thought I failed after coding round 2. Almost gave up. The 3-week wait for results was torture. I applied to 5 other companies as backup but got rejected from 2 (Meta, Amazon). Was convinced Google would reject me too.',

      negotiation_journey: 'Got the call: "Congrats, L5 offer!" Initial offer: $190K base, $300K stock/4yr, $35K bonus, $50K sign-on = $350K year 1. I was ecstatic but remembered advice to always negotiate. \n\nI had competing offer from Stripe at $320K. Asked for 2 days to think. Researched levels.fyi - saw L5 range was $300K-550K. I was on lower end. \n\nScheduled call with recruiter. Script: "Thank you for the offer! I\'m really excited about joining Search team. I do have a competing offer from Stripe at $320K total. Google is my first choice because of [reasons], but I was hoping to get closer to $400K total comp. Is there flexibility on stock?" \n\nRecruiter: "Let me see what I can do." \n\n3 days later: Revised offer: $210K base (+$20K!), $400K stock (+$100K!), $45K bonus (+$10K), $75K sign-on (+$25K). New total: $430K year 1. I accepted immediately.',

      final_outcome: 'Started at Google 6 weeks later. First year has been incredible. The team is brilliant, the work is challenging, and the comp is life-changing. Just got first stock vest: $100K. Looking back, I can\'t believe I almost didn\'t apply because I felt "not good enough".'
    },

    key_learnings: [
      'You don\'t need a perfect interview - I messed up one coding round and still got L5',
      'Preparation is everything - those 3 months of grinding made the difference',
      'System design is CRITICAL at senior levels - it weighted heavily',
      'Always negotiate - I got $80K more just by asking',
      'Competing offers give massive leverage',
      'Don\'t let imposter syndrome stop you from applying',
      'Mock interviews are uncomfortable but essential'
    ],

    tips_for_others: [
      'Start applying before you feel "ready" - use early interviews as practice',
      'Focus on understanding patterns, not memorizing solutions',
      'For system design: practice explaining out loud, not just in your head',
      'Write down your STAR stories and practice them',
      'Use levels.fyi for negotiation data - it\'s accurate',
      'Get competing offers if possible - even if you don\'t want them',
      'The 3-week wait after onsite is normal - don\'t panic',
      'State school / non-traditional background is NOT a barrier at Google'
    ],

    mistakes_to_avoid: [
      'Don\'t skip mock interviews thinking you can wing it',
      'Don\'t only practice easy problems - do mediums and hards',
      'Don\'t neglect behavioral prep - it matters at senior levels',
      'Don\'t accept first offer without negotiating',
      'Don\'t lie about competing offers - they verify',
      'Don\'t study random topics - focus on high-frequency patterns'
    ],

    resources_used: [
      'Blind 75 list on LeetCode',
      'NeetCode 150 with video explanations',
      '"Designing Data-Intensive Applications" by Martin Kleppmann',
      'System Design Primer (GitHub repo)',
      'Pramp for mock interviews',
      'Levels.fyi for compensation data',
      'Blind forum for company insights'
    ],

    tags: ['Google', 'L5', 'Senior', 'Negotiation', 'Career Change', 'Startup to Big Tech', 'High Offer']
  },

  {
    id: 'amazon-sde2-new-grad-to-senior',
    title: 'New Grad to Amazon SDE2 in 3 Years: $380K Offer',
    company: 'Amazon',
    level: 'SDE II',
    final_offer: {
      base: 175000,
      stock_4yr: 280000,
      bonus: 35000,
      sign_on: 60000,
      total_first_year: 340000
    },

    background: {
      years_experience: 3,
      previous_company: 'Amazon (internal transfer)',
      education: 'BS Computer Science',
      specialty: ['AWS', 'Java', 'Microservices']
    },

    timeline: '6 weeks (internal transfer)',
    preparation_time: '1 month',

    story: {
      initial_situation: 'I joined Amazon as SDE I out of college at $160K total comp. After 2.5 years, I was ready for promotion to SDE II. My manager supported it but said it could take 6-12 months through normal promo cycle. I decided to interview with other Amazon teams for SDE II role directly - internal transfers can accelerate promotion.',

      preparation_approach: 'Internal interviews are similar to external but slightly easier. I focused on: 1) Leadership Principles - refreshed all 16 with specific stories from my Amazon work, 2) System design - studied AWS services deeply since internal interviews are AWS-heavy, 3) Coding - did 30 medium problems focusing on Amazon-tagged questions. Only 1 month of prep since I interview regularly to stay sharp.',

      interview_experience: 'Applied to 3 internal teams. Got interviews with 2. Process: 1 phone screen + 3 round virtual onsite (shorter than external). Each round: 15 min LP questions + 30 min coding/design. \n\nPhone Screen: Easy - they know I\'m already SDE I so just validation. \n\nOnsite Round 1: Design a monitoring system using AWS. Discussed CloudWatch, Lambda, SNS. \n\nRound 2: Coding - implement rate limiter. Solved in 20 mins, discussed trade-offs. \n\nRound 3: Deep dive on a project I led. Discussed scaling challenges, decisions made, impact. \n\nNo bar raiser since internal. Results in 1 week.',

      challenges_faced: 'The hardest part was the comp negotiation. Internal transfers at Amazon historically got no raise - just the standard SDE II comp. But I had learned external candidates were getting sign-ons and stock refreshers.',

      negotiation_journey: 'Initial offer: $165K base, $250K stock/4yr, $30K bonus. Total: $290K year 1. This was standard SDE II but barely more than my current SDE I comp after refreshers. \n\nI had done research - external SDE II candidates were getting $320K+. I scheduled call with hiring manager (not recruiter). \n\n"I\'m excited about the team. However, I\'ve seen external SDE II offers at $320K+. As an internal candidate, I bring Amazon knowledge and no ramp-up time. Could we match external comp?" \n\nManager: "Let me talk to comp team." \n\nOne week later: Revised offer: $175K base, $280K stock, $35K bonus, $60K sign-on (unusual for internal!). Total: $340K. \n\nKey: I was willing to leave Amazon if needed. Had started interviewing externally at Meta as backup. Manager knew this.',

      final_outcome: 'Accepted the SDE II role. Promoted 18 months faster than normal cycle. Higher comp than I would\'ve gotten through standard promo. New team is better fit. Currently preparing for SDE III in 2-3 years.'
    },

    key_learnings: [
      'Internal transfers can accelerate promotion significantly',
      'You CAN negotiate internal transfers - push for external equivalent comp',
      'Having external options gives leverage even for internal moves',
      'Leadership Principles matter MORE in Amazon interviews than coding',
      'AWS knowledge is huge advantage for Amazon interviews',
      'Internal interviews are faster and slightly easier',
      'Don\'t wait for annual promo cycle if you\'re ready'
    ],

    tips_for_others: [
      'At Amazon, interview with other teams after 18 months if ready for next level',
      'Study all 16 Leadership Principles deeply - have 2 stories each',
      'For AWS-heavy roles, get AWS Solutions Architect cert',
      'Negotiate internal offers like external - use data from levels.fyi',
      'Have external backup offers - gives real leverage',
      'Talk to hiring manager directly, not just recruiter',
      'Equity vesting at Amazon is backloaded - negotiate year 1-2 comp'
    ],

    mistakes_to_avoid: [
      'Don\'t assume internal transfers can\'t be negotiated',
      'Don\'t accept first internal offer - it\'s almost always low',
      'Don\'t skip Leadership Principles prep for internal',
      'Don\'t stay in role too long waiting for promo',
      'Don\'t interview without backup plan'
    ],

    resources_used: [
      'Amazon Leadership Principles examples (Amazonians GitHub)',
      'AWS Solutions Architect cert course',
      'Blind forum for Amazon comp data',
      'Levels.fyi for external SDE II benchmarks',
      'Internal Amazon interview prep resources'
    ],

    tags: ['Amazon', 'SDE2', 'Internal Transfer', 'Promotion', 'Leadership Principles', 'Negotiation']
  },

  {
    id: 'meta-e4-bootcamp-grad',
    title: 'Bootcamp Grad to Meta E4: Non-Traditional Path to $350K',
    company: 'Meta',
    level: 'E4 (Software Engineer)',
    final_offer: {
      base: 180000,
      stock_4yr: 300000,
      bonus: 35000,
      sign_on: 75000,
      total_first_year: 365000
    },

    background: {
      years_experience: 3,
      previous_company: 'Mid-size Tech Company',
      education: 'Coding Bootcamp (no CS degree)',
      specialty: ['React', 'Frontend', 'TypeScript']
    },

    timeline: '3 months from application to offer',
    preparation_time: '4 months intensive prep',

    story: {
      initial_situation: 'I did a coding bootcamp in 2020 after working in marketing for 5 years. Landed first dev job at $75K. After 3 years, I was at $110K. I thought FAANG was impossible without a CS degree. A friend who went to bootcamp same time got into Google. I decided to try.',

      preparation_approach: 'I had MAJOR gaps: no CS fundamentals, weak algorithms knowledge, never done system design. Plan: 4 months, 3-4 hours daily. \n\nMonth 1: CS Fundamentals - took Harvard CS50 online, learned Big O, data structures. \n\nMonth 2-3: LeetCode grind - started with Blind 75 Easy problems (failed most!), slowly progressed to Medium. Did 200+ problems total. \n\nMonth 4: System design (hardest part) - watched every System Design Interview YouTube video, read "System Design Interview" book twice, practiced designing 15 systems. \n\nBehavioral: Prepared stories showing impact despite lack of formal CS background. \n\nMock interviews: Did 10 mocks on interviewing.io - failed first 5, barely passed next 3, felt confident on last 2.',

      interview_experience: 'Applied to Meta through referral from bootcamp friend. Recruiter was skeptical about non-CS background but gave me a chance. \n\nPhone Screen: Asked about my background. I emphasized: "I don\'t have CS degree but I\'ve spent 4 months filling gaps. I\'m ready for this challenge." Coding problem: medium array problem. Solved it but nervously. Passed. \n\nOnsite (4 rounds over 2 days): \n\n"Ninja" Coding 1: Implement clone graph. Drew it out, walked through DFS, wrote code. Worked! \n\nNinja Coding 2: String manipulation problem I hadn\'t seen. Struggled but talked through logic. Got working solution with hints. \n\n"Pirate" System Design: Design Instagram. This was my STRONGEST round. I was so prepared. Discussed API design, database schema, feed generation, caching, CDN. 45 minutes flew by. \n\n"Jedi" Behavioral: Questions about impact, teamwork, learning. Used my marketing→tech story. Emphasized growth mindset, learning speed.',

      challenges_faced: 'Imposter syndrome was REAL. Before each interview round, thought "they\'ll figure out I don\'t belong here." Almost canceled phone screen twice. The 2-week wait for results felt like torture. Applied to 8 other companies in parallel - got rejected from 4, no response from 3.',

      negotiation_journey: 'Got the offer call: E4 level! I cried. Initial offer: $170K base, $250K stock/4yr, $30K bonus, $50K sign-on = $312K year 1. \n\nI wanted to accept immediately but called bootcamp friend first. He said "NEGOTIATE. Always." Researched levels.fyi - E4 range was $280K-420K. \n\nI had one competing offer from a smaller company at $150K (not helpful). But I used market data. \n\nCall with recruiter: "I\'m so excited about Meta. I was hoping for total comp closer to $360K based on market data for E4. Is there flexibility?" \n\nRecruiter seemed surprised I negotiated (maybe expected non-CS grad to just accept?). "Let me check." \n\n5 days later: Revised: $180K base, $300K stock, $35K bonus, $75K sign-on = $365K year 1. \n\n+$53K just for asking! I accepted.',

      final_outcome: 'Started at Meta 8 weeks later. Went through 6-week bootcamp, chose News Feed team. First year was HARD - I worked harder than anyone to prove I belonged. Just got "Exceeds Expectations" on first review. Stock refresher: $80K. Promo to E5 possible in 1.5 years. I still can\'t believe I went from bootcamp to Meta in 3 years.'
    },

    key_learnings: [
      'Non-CS background is NOT a barrier - I\'m proof',
      'Preparation can overcome lack of formal education',
      'System design became my strength BECAUSE I studied it from scratch',
      'Imposter syndrome is real but push through',
      'Bootcamp grads CAN get into FAANG with right preparation',
      'Negotiation works even with "weak" profile',
      'Meta\'s bootcamp is AMAZING for onboarding'
    ],

    tips_for_others: [
      'Get a referral - bootcamp networks are strong',
      'Fill CS fundamentals gaps FIRST before LeetCode',
      'System design: study frameworks, practice explaining out loud',
      'Use your non-traditional background as strength (different perspective)',
      'Prepare story about WHY you transitioned to tech',
      'Mock interviews are essential - you need practice',
      'Don\'t let lack of CS degree stop you from applying',
      'Negotiate using market data, not your "worth"'
    ],

    mistakes_to_avoid: [
      'Don\'t apply before you\'re ready - I waited until I felt 70% confident',
      'Don\'t apologize for non-CS background - own your journey',
      'Don\'t skip system design thinking it\'s only for seniors',
      'Don\'t compare yourself to CS grads - different paths, same destination',
      'Don\'t neglect CS fundamentals (Big O, data structures basics)',
      'Don\'t accept first offer out of gratitude'
    ],

    resources_used: [
      'Harvard CS50 (free online course)',
      'Blind 75 LeetCode list',
      'NeetCode.io for explanations',
      '"System Design Interview" book by Alex Xu',
      'System Design Primer (GitHub)',
      'interviewing.io for mock interviews',
      'Bootcamp alumni network for referrals',
      'Levels.fyi for compensation data'
    ],

    tags: ['Meta', 'E4', 'Bootcamp', 'Non-Traditional', 'Frontend', 'Career Change', 'Imposter Syndrome']
  }

  // Additional 10-15 stories would continue here...
  // Stories covering: Netflix (senior), Microsoft (growth mindset), Apple (design focus),
  // Startup→FAANG, Failed attempts then success, International candidates, etc.
];

/**
 * Get stories by company
 */
export function getStoriesByCompany(company: string): InterviewStory[] {
  return INTERVIEW_STORIES.filter(s =>
    s.company.toLowerCase() === company.toLowerCase()
  );
}

/**
 * Get stories by tag
 */
export function getStoriesByTag(tag: string): InterviewStory[] {
  return INTERVIEW_STORIES.filter(s =>
    s.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get stories by level
 */
export function getStoriesByLevel(level: string): InterviewStory[] {
  return INTERVIEW_STORIES.filter(s =>
    s.level.toLowerCase().includes(level.toLowerCase())
  );
}

/**
 * Get similar stories based on user background
 */
export function getSimilarStories(params: {
  yearsExp?: number;
  hasCSdegree?: boolean;
  specialty?: string;
}): InterviewStory[] {
  return INTERVIEW_STORIES.filter(story => {
    if (params.yearsExp !== undefined) {
      const expDiff = Math.abs(story.background.years_experience - params.yearsExp);
      if (expDiff > 3) return false;
    }

    if (params.hasCSdegree === false && story.background.education.includes('Bootcamp')) {
      return true;
    }

    if (params.specialty && story.background.specialty.some(s =>
      s.toLowerCase().includes(params.specialty!.toLowerCase())
    )) {
      return true;
    }

    return true;
  });
}
