# lambda-site

An uber minimalistic setup for hosting a website on a single AWS lambda with express and static files.

To setup:
```bash
npm install
```

To run:
```bash
npm run start
```

To build:
```bash
npm run build
```

To deploy:

* after building, zip the files inside of the dist folder into a single zip. 
* create a lambda from the zip file with api gateway
* delete the api gateway and make sure the root resource for ANY methods and a a proxy resource for all ANY methods point to the lambda.

