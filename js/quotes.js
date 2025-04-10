const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers"
    },
    {
        text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        author: "Unknown"
    },
    {
        text: "It's not whether you get knocked down, it's whether you get up.",
        author: "Vince Lombardi"
    },
    {
        text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
        author: "Steve Jobs"
    },
    {
        text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
        author: "Jordan Belfort"
    },
    {
        text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        author: "Albert Schweitzer"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        author: "Roy T. Bennett"
    },
    {
        text: "The only limit to the height of your achievements is the reach of your dreams and your willingness to work for them.",
        author: "Michelle Obama"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },
    {
        text: "You don't have to be great to start, but you have to start to be great.",
        author: "Zig Ziglar"
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh"
    },
    {
        text: "Success is not in what you have, but who you are.",
        author: "Bo Bennett"
    }
];

export function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
} 