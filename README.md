# **:triangular_flag_on_post: MEN_PORTAL_STARTER** (version )

---

## **:package: Main tools used**

- [x] aws-sdk
- [x] bcrypt
- [x] body-parser
- [x] connect-flash
- [x] cookie-parser
- [x] ejs
- [x] express
- [x] express-session
- [x] mongodb
- [x] mongoose
- [x] monk
- [x] morgan
- [x] multer
- [x] multer-s3
- [x] nodemailer
- [x] otp-generator
- [x] passport
- [x] passport-local
- [x] pdfkit
- [x] razorpay
- [x] url

---

## **:wrench: Developer usage**

### **Set up project**

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder path `git clone git+https://github.com/rohan-uxdev/MEN_portal_starter.git`

---

### **Installation**

In order to install the project and all dependencies, enter in the project folder and run `npm i -also=dev`

---

### Setup the Project

- Make sure you have mongodb installed and running on your computer
  - Connect to your instance using mongodb compass
  - To find out more: https://docs.mongodb.com/manual/administration/install-community/
- Create a DB named 'db_name'
- Create collection: 'users', 'sample_table'
- Import sample_data/sample_users.json into users
- Import sample_data/sample_table.json into sample_table
- Fill in the relevant details in config.js
  - AWS access documentation: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
  - Razorpay documentation: https://razorpay.com/docs/payment-gateway/server-integration/nodejs/usage/

### Start the project

```bash
npm start
```

### Test the project

```bash
npm test
```

---

### Notes on Commiting

- I have setup the project to test itself before committing. This is setup as follows:
    - Commits will fail if test don't pass. Remove this if you would like to deploy your code without running your tests
    - This does not generate tests for you. I have simply written a few sample tests for the purposes of demonstration
```bash
"husky":{
        "hooks":{
            "pre-commit": "npm test"
        }
    }
```

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:anger: Troubleshootings**

This is just a personal project created to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Rohan Krishna*_

---

Copyright © 2020 Rohan Krishna
