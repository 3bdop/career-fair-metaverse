import cors from 'cors';

const allowedOrigins = [
    "https://nexusplus.vercel.app",
    /https:\/\/nexusplus-.*-3bdop\.vercel\.app/,
    /https:\/\/.*\.readyplayer\.me$/,
    "http://localhost:5173",
    "http://localhost:5050"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const originIsAllowed = allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') return origin === allowedOrigin;
            return allowedOrigin.test(origin);
        });
        originIsAllowed
            ? callback(null, true)
            : callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
};

// Create the actual CORS middleware
const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
