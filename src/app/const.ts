export const API_URL = 'https://opentdb.com/api.php';
export const REQUEST_TIMEOUT = 5000;

export enum QuestionsCount {
  Min = 1,
  Max = 50,
  Default = 5,
}

export const ApiCategoryMap = {
  "any": "Any",
  "9": 'General Knowledge',
  "10": 'Entertainment: Books',
  "11": 'Entertainment: Film',
  "12": 'Entertainment: Music',
  "13": 'Entertainment: Musicals & Theatres',
  "14": 'Entertainment: Television',
  "15": 'Entertainment: Video Games',
  "16": 'Entertainment: Board Games',
  "17": 'Science & Nature',
  "18": 'Science: Computers',
  "19": 'Science: Mathematics',
  "20": 'Mythology',
  "21": 'Sports',
  "22": 'Geography',
  "23": 'History',
  "24": 'Politics',
  "25": 'Art',
  "26": 'Celebrities',
  "27": 'Animals ',
  "28": 'Vehicles',
  "29": 'Entertainment: Comics',
  "30": 'Science: Gadgets',
  "31": 'Entertainment: Japanese Anime & amp; Manga',
  "32": 'Entertainment: Cartoon &amp; Animations',
} as const;

export const DifficultySortMap: Record<string, number> = {
  "easy": 0,
  "medium": 1,
  "hard": 2,
} as const;

export const BUTTON_START_COLORS = ['#40e495', '#30dd8a', '#2bb673'];
export const BUTTON_NEXT_COLORS = ['#6253E1', '#04BEFE'];
export const BUTTON_AGAIN_COLORS = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
