// Navbar Toggle
$('#toggle').click(function () {
  $(this).toggleClass('active');
  $('#overlay').toggleClass('open');
});

$('.overlay ul li a').click(function () {
  $("#toggle").toggleClass("active");
  $('#overlay').toggleClass('open');
});
// TypeWritter Effect
//Initializing typewritter
var type = new Typed('.typing', {
  strings: [
    // "<span class='fa fa-music'> This is for YOU ..........</span>",
    "Mobile",
    "Console",
    "Gaming Accessories",
    "Headset",
    "and many more....."


  ],
  typeSpeed: 65,
  backSpeed: 25,
  loop: true,
  smartBackspace: true,
  showCursor: false,
  startDelay: 1000
});

//Submitting Form to FireBase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfxE_LZMS_0yidwpveklMP0X-yYxBZn6w",
  authDomain: "magicbaksho-9ad7d.firebaseapp.com",
  databaseURL: "https://magicbaksho-9ad7d.firebaseio.com",
  projectId: "magicbaksho-9ad7d",
  storageBucket: "gs://magicbaksho-9ad7d.appspot.com/",
  messagingSenderId: "896094188422",
  appId: "1:896094188422:web:cfb6c0b15e720256"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
var usersRef = firebase.database().ref('users');

// Listen for form submit
document.getElementById('contactform').addEventListener('submit', submitForm);


// Submit form ------------------------------------------------------>
function submitForm(e) {
  e.preventDefault();

  // To get select element value
  var getDevice = document.getElementById('DeviceType');

  // Get values
  var name = getInputVal('FullName');
  var email = getInputVal('Email');
  var phone = getInputVal('PhnNumber');
  var deviceType = getDevice.options[getDevice.selectedIndex].value;
  var wantTo = document.querySelector('input[name="WantTo"]:checked').value;
  var ModelNumber = getInputVal('ModelNumber');
  var message = getInputVal('Message');


  //Getting file name from File Upload
  var devicePhoto = document.getElementById('DevicePhoto');
  //Get the File
  var file = devicePhoto.files[0];


  if (name != "" && email != "" && phone != "" && deviceType != "Select Device Type *" && wantTo != "") {
    if (file != null ) {

      // Create a Storage ref
      var storageRef = firebase.storage().ref('DevicePhotos/' + name + file.name);

      //Upload File
      storageRef.put(file);
    }

    saveMessage(name, email, phone, deviceType, wantTo, ModelNumber, message);

    // Clear form
    document.getElementById('contactform').reset();

  } else {
    //Sweat Alert about required field
    Swal.fire({
      title: 'Error',
      text: 'Please fill up the required fields!',
      type: 'error',
      confirmButtonText: 'Sure, will do.'
    });
  }

}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, deviceType, wantTo, ModelNumber, message) {
  var newusersRef = usersRef.push();
  newusersRef.set({
    name: name,
    email: email,
    phone: phone,
    deviceType: deviceType,
    wantTo: wantTo,
    ModelNumber: ModelNumber,
    message: message
  }, function (error) {

    if (error) {
      //If any error
      var errorCode = error.code;
      var errorMsg = error.message;

      console.log(errorCode);
      console.log(errorMsg);
    } else {
      // If not

      Swal.fire({
        title: 'Success',
        text: 'We will soon contact you.',
        type: 'success',
        confirmButtonText: 'Cool'
      });


      // Sending Mail using SMTP server to customer
      Email.send({
        SecureToken: "2c210288-84b0-44b0-bf4a-1b32942e9bee",
        To: email,
        From: "magicbaksho@gmail.com",
        Subject: "Greetings From MagicBaksho",
        Body: "Hello " + name +", \r\n" + "We recieved your mail.We will soon contact you.\r\n" + "Thank you for choosing Magicbaksho Services.\r\n \r\n \r\n" + "Regards,\r\n" + "magicbaksho@gmail.com\r\n" + "+8801768008843"
      }).then(
        message => alert(message)
      );

      // Sending Mail using SMTP server to Us
      Email.send({
        SecureToken: "2c210288-84b0-44b0-bf4a-1b32942e9bee",
        To: "magicbaksho@gmail.com",
        From: "magicbaksho@gmail.com",
        Subject: "New order from " + email,
        Body: "Name : " + name + "\r\nEmail : " + email + "\r\nPhone : " + phone + "\r\nDevice Type : " + deviceType + "\r\nWant to: " + wantTo + "\r\nModel Number: " + ModelNumber + "\r\nReason : \r\n" + message
      }).then(
        message => alert(message)
      );

    }

  });
}
