
const config = {
    development: {
        localUrl: 'http://localhost:3000/story_telling/reset-password/',
        // serverUrl: 'http://hybrid.srishticampus.in/story_telling/reset-password/',
    },
  
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];