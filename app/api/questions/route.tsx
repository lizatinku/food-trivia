// app/api/questions/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'Which of the following is a traditional South Indian breakfast item made from fermented rice and lentil batter?',
      options: [
        'Samosa',
        'Dosa',
        'Naan',
        'Paratha'
      ],
      answer: 'Dosa'
    },
    {
      question: 'Which North Indian dish is a popular street food made with a spicy potato filling, chickpea curry, and tamarind chutney?',
      options: [
        'Aloo Gobi',
        'Chole Bhature',
        'Pani Puri',
        'Kachori'
      ],
      answer: 'Pani Puri'
    },
    {
      question: 'What is the primary ingredient in the traditional Indian dish "Dhokla"?',
      options: [
        'Rice',
        'Lentils',
        'Chickpeas',
        'Fermented Rice Flour'
      ],
      answer: 'Fermented Rice Flour'
    },
    {
      question: 'Which Mughal emperor is credited with popularizing the biryani in India?',
      options: [
        'Akbar',
        'Babur',
        'Aurangzeb',
        'Shah Jahan'
      ],
      answer: 'Aurangzeb'
    },
    {
      question: 'The dish "Vindaloo" originated from which country\'s cuisine and was adapted in Goa?',
      options: [
        'Portugal',
        'Spain',
        'France',
        'Italy'
      ],
      answer: 'Portugal'
    },
    {
      question: 'Which Indian dish was historically known as "Khichdi" and was served to royal families as a humble yet nutritious meal?',
      options: [
        'Biryani',
        'Khichdi',
        'Pulao',
        'Pongal'
      ],
      answer: 'Khichdi'
    },
    {
      question: 'Which Indian dish, often associated with Kolkata, was created by Chinese immigrants in the 18th century?',
      options: [
        'Chicken Tikka Masala',
        'Hakka Noodles',
        'Kathi Roll',
        'Puchka'
      ],
      answer: 'Hakka Noodles'
    },
    {
      question: 'Which Indian dish is made with fermented rice and urad dal batter, steamed in a special mold, and is known for its unique texture and taste?',
      options: [
        'Idli',
        'Vada',
        'Sambhar',
        'Uttapam'
      ],
      answer: 'Idli'
    },
    {
      question: 'The preparation of which Indian dish involves a cooking technique known as "dum", where the ingredients are cooked in their own juices under low heat for an extended period?',
      options: [
        'Biryani',
        'Paneer Tikka',
        'Dal Makhani',
        'Butter Chicken'
      ],
      answer: 'Biryani'
    },
    {
      question: 'In which region of India did the use of mustard oil as a primary cooking fat originate, and which dish prominently features this ingredient?',
      options: [
        'Punjab - Sarson Da Saag',
        'Bengal - Fish Curry',
        'Kerala - Avial',
        'Gujarat - Undhiyu'
      ],
      answer: 'Punjab - Sarson Da Saag'
    }
  ];

  return NextResponse.json(questions);
}
