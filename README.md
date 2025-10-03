ELCOM Task


API Key envirment file layout 
export const environment: IApiKey = {
  apiKey: '',
};

Due to getting cors error from the API not sure if this is becasue of the backend or my brwoer on my mahcine its linux so can get some odd errors 
I have set up a proxy in the project what is as follows :
{
  "/api": {
    "target": "https://test.evolve-s2p.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug"
  }
}

Inside of the API service i have commented out the code for the normal url so if this is not a problem on your machine use //private url = 'http://test.evolve-s2p.com/CRUDExample/'; and use  "start": "ng serve" in the package.json

Used materual ui
npm install
ng serve
