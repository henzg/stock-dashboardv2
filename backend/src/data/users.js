export const users = [
    { id: 1, username: 'demo', email: 'demo@example.com' },
    { id: 2, username: 'zac', email: 'zac@example.com'},
];

export const portfolios = [
    {
        userId: 1,
        holdings: [
            { symbol: 'AAPL', quantity: 10 },
            { symbol: 'TSLA', quantity: 5 },
        ],
    },
    {
        userId: 2,
        holdings: [
            { symbol: 'GOOG', quantity: 20 },
        ],
    },
];