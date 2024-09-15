import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  const allQuestions = {
    'popular-dishes': [
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
    ],
    'eastern-and-north-eastern-cuisine': [
      {
        question: 'What is the primary ingredient in "Momos," a popular Tibetan dumpling often enjoyed with spicy chutney?',
        options: [
          'Rice',
          'Pork',
          'Vegetables',
          'Noodles'
        ],
        answer: 'Vegetables'
      },
      {
        question: 'Which dish, originating from Assam, is made with fermented bamboo shoots and is a staple in Assamese cuisine?',
        options: [
          'Khar',
          'Tenga',
          'Pitika',
          'Bhut Jolokia'
        ],
        answer: 'Khar'
      },
      {
        question: 'Which dish is a traditional Naga recipe, made with pork and bamboo shoots, and is a staple in Nagaland?',
        options: [
          'Pork with Bamboo Shoot',
          'Naga Stew',
          'Kiya',
          'Moktu'
        ],
        answer: 'Pork with Bamboo Shoot'
      },
      {
        question: 'Which Indian state is known for its traditional dish "Pakhala Bhata," a fermented rice dish, which has historical significance in the region?',
        options: [
          'West Bengal',
          'Odisha',
          'Assam',
          'Sikkim'
        ],
        answer: 'Odisha'
      },
      {
        question: 'The traditional dish "Thukpa" originated in which region and is known for its rich history among Tibetan and Himalayan communities?',
        options: [
          'Nepal',
          'Bhutan',
          'Tibet',
          'Northeast India'
        ],
        answer: 'Tibet'
      },
      {
        question: 'Which Assamese festival is famous for its traditional dish "Bihu", which includes a variety of sweets and savory items?',
        options: [
          'Lohri',
          'Onam',
          'Bihu',
          'Durga Puja'
        ],
        answer: 'Bihu'
      },
      {
        question: 'What is the primary method of cooking for the Assamese dish "Tenga," which is known for its tangy flavor?',
        options: [
          'Steaming',
          'Boiling',
          'Grilling',
          'Sautéing'
        ],
        answer: 'Boiling'
      },
      {
        question: 'In the traditional preparation of "Khar," an Assamese dish, what ingredient is used for its unique flavor and aroma?',
        options: [
          'Tamarind',
          'Fermented Fish',
          'Curry Leaves',
          'Coconut'
        ],
        answer: 'Fermented Fish'
      },
      {
        question: 'Which ingredient is used to give "Pakhala Bhata" its characteristic sour taste in Odisha?',
        options: [
          'Lemon Juice',
          'Tamarind',
          'Yogurt',
          'Vinegar'
        ],
        answer: 'Yogurt'
      },
    ],
    'desserts-and-sweets': [
      {
        question: 'Which dessert is known for its syrup-soaked dough balls and is traditionally served warm?',
        options: [
          'Rasgulla',
          'Gulab Jamun',
          'Jalebi',
          'Barfi'
        ],
        answer: 'Gulab Jamun'
      },
      {
        question: 'Which Indian dessert is a type of rice pudding flavored with cardamom and often garnished with nuts and saffron?',
        options: [
          'Kheer',
          'Payasam',
          'Shrikhand',
          'Peda'
        ],
        answer: 'Kheer'
      },
      {
        question: 'Which Indian dessert, made from milk and sugar, was first recorded in the 16th century in the region now known as Rajasthan?',
        options: [
          'Chikki',
          'Rabri',
          'Ghevar',
          'Peda'
        ],
        answer: 'Ghevar'
      },
      {
        question: 'What was the origin of the popular Bengali sweet "Rasgulla," which is believed to have been created in the 19th century in Bengal?',
        options: [
          'Created by the famous Bengali chef, Nobin Chandra Das',
          'Inspired by Portuguese desserts',
          'Developed during the Mughal era',
          'Originated from ancient Indian recipes'
        ],
        answer: 'Created by the famous Bengali chef, Nobin Chandra Das'
      },
      {
        question: 'Which traditional Indian dessert was first made in the 18th century by adding saffron and cardamom to sweetened milk, and has since become a staple at celebrations?',
        options: [
          'Kheer',
          'Moong Dal Halwa',
          'Sandesh',
          'Shrikhand'
        ],
        answer: 'Kheer'
      },
      {
        question: 'Which Indian dessert is made from sweetened curd, often flavored with fruits and nuts?',
        options: [
          'Shrikhand',
          'Ladoo',
          'Rasmalai',
          'Sandesh'
        ],
        answer: 'Shrikhand'
      },
      {
        question: 'What is the main ingredient in "Peda," a dense milk-based sweet often flavored with cardamom or saffron?',
        options: [
          'Paneer',
          'Milk Powder',
          'Condensed Milk',
          'Rice Flour'
        ],
        answer: 'Milk Powder'
      },
      {
        question: 'Which Indian dessert was originally developed by the Mughal emperors and is said to have been served at their royal feasts?',
        options: [
          'Gulab Jamun',
          'Jalebi',
          'Rasgulla',
          'Kheer'
        ],
      answer: 'Gulab Jamun'
      },
      {
        question: 'Which dessert, popular in the northern regions of India, is made from sweetened milk and flavored with saffron, often served during special occasions?',
        options: [
          'Chikki',
          'Kaju Katli',
          'Rabri',
          'Moong Dal Halwa'
        ],
        answer: 'Rabri'
      },
      {
        question: 'Which traditional Kerala sweet is made from jaggery, coconut, and rice flour, often served during festivals?',
        options: [
          'Unniyappam',
          'Payasam',
          'Ada Pradhaman',
          'Puttu'
        ],
        answer: 'Unniyappam'
      },
    ]
    ,
    'west-indian-cuisine': [
    {
      question: 'Which ancient empire is said to have influenced the culinary traditions of Gujarat, a key part of West Indian cuisine?',
      options: [
        'Maurya Empire',
        'Mughal Empire',
        'Maratha Empire',
        'Gupta Empire'
      ],
      answer: 'Maratha Empire'
    },
    {
      question: 'What is the name of the famous Gujarati steamed snack made from fermented rice and chickpea batter?',
      options: [
        'Khandvi',
        'Dhokla',
        'Handvo',
        'Fafda'
      ],
      answer: 'Dhokla'
    },
    {
      question: 'Which of the following is a primary ingredient in the traditional Rajasthani dish "Dal Baati Churma"?',
      options: [
        'Wheat flour',
        'Rice',
        'Lentils',
        'Chickpea flour'
      ],
      answer: 'Wheat flour'
    },
    {
      question: 'What spicy Maharashtrian snack consists of puffed rice, onions, tomatoes, and sev?',
      options: [
        'Misal Pav',
        'Bhel Puri',
        'Vada Pav',
        'Pav Bhaji'
      ],
      answer: 'Bhel Puri'
    },
    {
      question: 'Which state in West India is known for its fusion of Portuguese and Indian flavors due to its colonial past?',
      options: [
        'Goa',
        'Maharashtra',
        'Gujarat',
        'Rajasthan'
      ],
      answer: 'Goa'
    },
    {
      question: 'What is a key ingredient in the famous Goan dish “Prawn Balchão”?',
      options: [
        'Tamarind',
        'Coconut milk',
        'Vinegar',
        'Cardamom'
      ],
      answer: 'Vinegar'
    },
    {
      question: 'Which dish, traditionally from Maharashtra, is made with mixed vegetables and is served with buttered bread rolls?',
      options: [
        'Pav Bhaji',
        'Misal Pav',
        'Sabudana Khichdi',
        'Zunka Bhakri'
      ],
      answer: 'Pav Bhaji'
    },
    {
      question: 'Which fruit is essential in making the Goan dish “Ambot Tik”?',
      options: [
        'Mango',
        'Kokum',
        'Tamarind',
        'Jackfruit'
      ],
      answer: 'Kokum'
    },
    {
      question: 'The Maharashtrian dish “Puran Poli” is commonly prepared during which festival?',
      options: [
        'Diwali',
        'Holi',
        'Gudi Padwa',
        'Makar Sankranti'
      ],
      answer: 'Gudi Padwa'
    },
    {
      question: 'Which of the following spices is a signature component in Maharashtrian Goda Masala?',
      options: [
        'Fennel seeds',
        'Black sesame seeds',
        'Coconut',
        'Nutmeg'
      ],
      answer: 'Black sesame seeds'
    }
    ],
    'beverages': [
      {
        question: 'What is the traditional South Indian beverage made from fermented rice and water, often served as a refreshing drink in coastal areas?',
        options: [
          'Rasam',
          'Buttermilk',
          'Coconut Water',
          'Neer More'
        ],
        answer: 'Neer More'
      },
      {
        question: 'Which popular North Indian drink is made from yogurt, spices, and sometimes fruits, and is often served chilled?',
        options: [
          'Lassi',
          'Chaas',
          'Sattu',
          'Kachumber'
        ],
        answer: 'Chaas'
      },
      {
        question: 'What is the name of the traditional Bengali drink made from fermented rice and known for its slightly sour taste?',
        options: [
          'Aam Panna',
          'Pakhala',
          'Tamarind Juice',
          'Sattu'
        ],
        answer: 'Pakhala'
      },
      {
        question: 'Which West Indian beverage is a popular street food item made from yogurt, chickpea flour, and spices, served cold?',
        options: [
          'Chaas',
          'Shrikhand',
          'Dahi Puri',
          'Buttermilk'
        ],
        answer: 'Dahi Puri'
      },
      {
        question: 'What is the traditional beverage from Tamil Nadu made by mixing buttermilk with spices and curry leaves, often consumed to aid digestion?',
        options: [
          'Lassi',
          'Rasam',
          'Pineapple Juice',
          'Moru'
        ],
        answer: 'Moru'
      },
      {
        question: 'What is the name of the North Indian drink made from roasted barley flour, water, and spices, often consumed for its health benefits?',
        options: [
          'Sattu',
          'Thandai',
          'Rasmalai',
          'Kheer'
        ],
        answer: 'Sattu'
      },
      {
        question: 'Which traditional Assamese drink is made from fermented rice or barley and is often consumed during festivals?',
        options: [
          'Bamboo Shoot Drink',
          'Rice Beer',
          'Chai',
          'Buttermilk'
        ],
        answer: 'Rice Beer'
      },
      {
        question: 'What is the name of the sweet and spiced beverage from Gujarat made from jaggery and often consumed during winter?',
        options: [
          'Petha',
          'Jalebi',
          'Chaas',
          'Gur Ki Chai'
        ],
        answer: 'Gur Ki Chai'
      },
      {
        question: 'Which traditional South Indian drink, often enjoyed during the hot summer months, is made from the juice of the tender coconut?',
        options: [
          'Nannari Sherbet',
          'Tender Coconut Water',
          'Rasam',
          'Filter Coffee'
        ],
        answer: 'Tender Coconut Water'
      },
      {
        question: 'What is the name of the traditional drink made from a mixture of milk, sugar, and various nuts, often enjoyed during festivals in North India?',
        options: [
          'Thandai',
          'Lassi',
          'Kheer',
          'Chaas'
        ],
        answer: 'Thandai'
      }
    ],
  };

  const questions = allQuestions[category as keyof typeof allQuestions] || [];
  return NextResponse.json(questions);
}
