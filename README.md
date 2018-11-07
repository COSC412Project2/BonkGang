#Bonk Gang Webpage

## First time set up
* [install node.js](https://nodejs.org/en/)
* [install MySQL server and workbench](https://dev.mysql.com/downloads/installer/) [^1]
* edit **config.json** to set mySQL credentials
* `npm install` to install dependencies
* run **mySQL_setup.sql** from mySQL workbench


## usage
1. run `node server.js` on server
2. browse to **127.0.0.1:8080**

---
## errors
### `ER_NOT_SUPPORTED_AUTH_MODE:`
issue with MySQL authentication when the server tried to query the database.

* run **mySQL\_AUTH\_FIX.sql** from mySQL workbench to fix