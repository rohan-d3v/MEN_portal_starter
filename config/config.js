module.exports = {
    'dbURI' : 'mongodb://localhost:27017/db_name?authSource=admin',
    'awsConfig': {
        secretAccessKey: '',
        accessKeyId: '',
        region: 'us-east-2'
    },

    'mailerConfig': {
        host: 'smtp.gmail.com', port: 465, secure: true,
        auth: {
            user: "",
            pass: ""
        }
    },
    'rzpConfig': { key_id: '', key_secret: '' },
    'passportClientSecret': '2181616A8D5AD45EE3A64BE1B325F',
};
