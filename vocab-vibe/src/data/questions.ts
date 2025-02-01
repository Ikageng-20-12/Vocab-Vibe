// Question bank for IELTS Speaking Test
export interface Question {
    id: string;
    text: string;
    part: 'part1' | 'part2' | 'part3';
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    followUp?: string[];
  }
  
  export const questions: Question[] = [
    // Part 1 Questions (Introduction and Interview)
    {
      id: 'p1_1',
      text: "Let's talk about your hometown. What do you like most about it?",
      part: 'part1',
      difficulty: 'Easy',
      followUp: [
        "How long have you been living there?",
        "Would you say it's a good place for tourists to visit?",
        "Has your hometown changed much since you were a child?"
      ]
    },
    {
      id: 'p1_2',
      text: "What kind of work or study do you do?",
      part: 'part1',
      difficulty: 'Easy',
      followUp: [
        "Why did you choose this field?",
        "What do you enjoy most about it?",
        "Would you like to change your career in the future?"
      ]
    },
    
    // Part 2 Questions (Long Turn)
    {
      id: 'p2_1',
      text: "Describe a skill you would like to learn. You should say:\n- what the skill is\n- how you would learn it\n- how long it would take to learn\n- and explain why you want to learn this skill",
      part: 'part2',
      difficulty: 'Medium'
    },
    {
      id: 'p2_2',
      text: "Describe a place you visited that exceeded your expectations. You should say:\n- where it was\n- when you went there\n- what you did there\n- and explain why it exceeded your expectations",
      part: 'part2',
      difficulty: 'Medium'
    },
    
    // Part 3 Questions (Discussion)
    {
      id: 'p3_1',
      text: "How do you think technology will change education in the future?",
      part: 'part3',
      difficulty: 'Hard',
      followUp: [
        "What are the advantages and disadvantages of online learning?",
        "Do you think traditional classrooms will disappear completely?",
        "How can teachers adapt to these changes?"
      ]
    },
    {
      id: 'p3_2',
      text: "What role does social media play in modern society?",
      part: 'part3',
      difficulty: 'Hard',
      followUp: [
        "Do you think social media has more positive or negative effects?",
        "How might social media change in the next decade?",
        "Should there be more regulation of social media platforms?"
      ]
    }
  ];