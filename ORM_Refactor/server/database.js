/////////////////////////////////////////////////////
//SET UP DATABASE CONNECTION
/////////////////////////////////////////////////////

var Sequelize = require("sequelize");
var sequelize = new Sequelize("blackopps3", "root", null);


/////////////////////////////////////////////////////
//SET UP TABLE STRUCTURE
/////////////////////////////////////////////////////
var User = sequelize.define('User', {
  user_name: {type: Sequelize.STRING, unique: true}
});

var Message = sequelize.define('Message', {
  text: Sequelize.STRING
});

var Room = sequelize.define('Room', {
  room_name: Sequelize.STRING
});

/////////////////////////////////////////////////////
//DEFINE RELATIONSHIPS
/////////////////////////////////////////////////////
Message.belongsTo(User, { foreignKey: 'user_id'});
Message.belongsTo(Room, { foreignKey: 'room_id'});

/////////////////////////////////////////////////////
//INITIALIZE ROOMS
/////////////////////////////////////////////////////
// User.sync();
// Room.sync();
// Message.sync();

// User.build({user_name: 'user1'}).save();
// Room.build({room_name: 'room1'}).save();


var user = 'user2';
var roomname = 'room1';
var text = 'abc123';

var buildMessage  = function(user_name, room_name, text) {
  //get user ID
  User.find({where: {user_name: user_name} }).success(function(user) {
    console.log(user);
    console.log(user.id);
    var user_id = user.id;
    //get room ID
    Room.find({where: {room_name: room_name} }).success(function(room) {
      var room_id = room.id;
      //compose message
      Message.build({text: text, user_id: user_id, room_id: room_id}).save().success(function(){
        console.log('message saved!');
      });
    });
  });
};

buildMessage(user, roomname, text);







// drop table Messages; drop table Rooms; drop table Users;

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// User.sync().success(function() {
  // User.find({where: {user_name: 'Jean Paul'} }).success(function(user) {
  //   var user_id = user.id;
  //   Message.build({user_id: user_id, text: 'abc123', })
  // });


  // //instantiate an object and save it:
  // var newUser = User.build({user_name: "Jean Paul"});
  // newUser.save().success(function() {

  //   var newMessage = Message.build({text: 'Hello world'});

  //   /* This callback function is called once saving succeeds. */

  //   // Retrieve objects from the database:
  //   User.findAll({ where: {user_name: "Jean Paul"} }).success(function(usrs) {
  //     // This function is called back with an array of matches.
  //     for (var i = 0; i < usrs.length; i++) {
  //       console.log(usrs[i].user_name + " exists");
  //     }
  //   });
  // });





