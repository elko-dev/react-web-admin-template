const key: string | undefined = process.env.REACT_APP_ENV;

export const env = key || 'local';

type urlOptions = {
    [key: string]: string
}
const urlMap: urlOptions = {
    'local': 'https://freethrow-api-dev.herokuapp.com',
    'dev': '<DEV_BASE_URL>',
    'stage': '<STAGE_BASE_URL>',
    'prod': '<PROD_BASE_URL>'
};


export const environment = {
    apiBase: getUrl(),
};

function getUrl(): string{
    if(!key){
        console.error('REACT_APP_ENV variable was undefined.  We need this to select the correct environment specific variables');
        process.exit(1);
    }
    console.log(key);
    return urlMap[key];
}
