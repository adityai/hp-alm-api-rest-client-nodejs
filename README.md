- Enter HP ALM REST API URL: http://youralmserver:port/qcbin/api/authentication/sign-in
- Enter your ALM User Name and Password in the prompt that you get on navigating to the above URL.
- Once successful authentication has occurred you will get a blank page.
- Now enter the URL to get domains in the same browser window: http://youralmserver:port/qcbin/api/domains
- Once you enter this URL and press enter you will get domain list you have access to in XML format.

WARN: For ALM Versions prior to 12.53, in URLs, replace api with rest
e.g. http://youralmserver:port/qcbin/rest/domains


referencias:
> https://aneejian.com/hp-alm-rest-api-alm-domains/
> https://aneejian.com/hp-alm-rest-api-alm-domains-projects/
> https://community.microfocus.com/t5/ALM-QC-User-Discussions/Cannot-access-any-entity-in-ALM-12-2-via-REST/m-p/944762

requirements:
> npm install --global windows-build-tools
> npm install xml2json

