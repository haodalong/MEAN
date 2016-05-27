var crypto = require('crypto');
var mongoose = require('mongoose');
var contactSchema = require('./routes/contactSchema.js');

mongoose.connect('mongodb://localhost/test');

function hashPW(userName, pwd){
  var hash = crypto.createHash('md5');
  hash.update(userName + pwd);
  return hash.digest('hex');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var count = 11;

function checkClose(){
  count = count - 1;
  if(count==0) mongoose.disconnect();
}

function saveCallback(err, doc){
    if(err)console.log(err);
    else console.log(doc.name + ' saved');
    checkClose();
}

db.once('open', function() {
  console.log('mongoose opened!');
  var User = mongoose.model('user', contactSchema.userSchema);

  var doc = new User({
	card_id: '19901126', 
    name: '大龙',
    phone: 7613,
    birthday: Date(),
    description: '测试一下'
  });
  doc.save(saveCallback); 
  
  var doc = new User({
	card_id: '19910704', 
    name: '依依',
    phone: 5203,
    birthday: Date(),
    description: '测试二下'
  });
  doc.save(saveCallback);  
  
  
});

