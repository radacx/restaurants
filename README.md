# How to deploy

1. Install node modules in client and server folders
2. Run `npm start build` commands first in client then in server folder
3. Modify `manifest.yml` name to match your IBM Cloud service name
4. Connect Cloudant NoSQL DB to your service
5. Create credentials for that DB
6. Make sure cloudant url is available in enviroment variables
7. Be logged in cloud foundry
8. `bx cf push`

# How to log in

7. Install Bluemix CLI from `https://console.bluemix.net/docs/cli/reference/bluemix_cli/download_cli.html#download_install`
8. bx login -> \<email\> + \<password\>
9. bx target -o \<email\> -s dev 