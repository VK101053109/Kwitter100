var firebaseConfig = {
      apiKey: "AIzaSyBk-uslWFWXFQMIrH2ECSscG1vCJP-qJ4o",
      authDomain: "kwitter-da6ea.firebaseapp.com",
      databaseURL: "https://kwitter-da6ea-default-rtdb.firebaseio.com",
      projectId: "kwitter-da6ea",
      storageBucket: "kwitter-da6ea.appspot.com",
      messagingSenderId: "896912748739",
      appId: "1:896912748739:web:de0a2b8d7b264412c07276"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names);
                  row = '<div id="' + Room_names + '" class="room_name" onclick="redirecttoroom(this.id)">' + Room_names + '</div><hr>';
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

user_name = localStorage.getItem("user_name_key");
document.getElementById("welcome_name").innerHTML = "Welcome " + user_name;

function addroom() {
      r_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(r_name).update({
            purpose: "room added"
      });
      localStorage.setItem("room_name_key", r_name);
      window.location = "kwitter_message.html";


}

function redirecttoroom(room_id) {
      localStorage.setItem("room_name_key", room_id);
      window.location = "kwitter_message.html";
}

function logout() {
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location = "index.html";
}