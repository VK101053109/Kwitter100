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

user_name = localStorage.getItem("user_name_key");
room_name = localStorage.getItem("room_name_key");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_id = childKey;
                        subfolder_data = childData;
                        
                        u_name=subfolder_data["name"];
                        u_message=subfolder_data["message"];
                        u_like=subfolder_data["like"];
                        //close_button="";
                        //if(u_name==user_name){
                             // close_button='<button class="btn btn-warning" style="float:right" id="'+subfolder_id+'" onclick="close(this.id)" >X </button>';

                        //}
                        name_tag='<h4>'+u_name+'<img src="tick.png" class="user_tick"></h4>';
                        message_tag='<h4 class="message_h4">'+u_message+'</h4>';
                        start_tag='<button class="btn btn-warning" id="'+subfolder_id+'" onclick="likeplus(this.id)" value="'+u_like+'">';
                        end_tag='<span class="glyphicon glyphicon-thumbs-up"> like:'+u_like+'</span> </button> <hr>';
                        row=close_button+name_tag+message_tag+start_tag+end_tag;
                        document.getElementById("output").innerHTML+=row;

                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("user_name_key");
      localStorage.removeItem("room_name_key");
      window.location = "index.html";
}

function send() {
      msg = document.getElementById("message_input").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("message_input").value="";
}
function likeplus(button_id){
      likes=document.getElementById(button_id).value;
      likes=Number(likes)+1;
      firebase.database().ref(room_name).child(button_id).update({
            like:likes
      });
}
//function close(close_id){
      
//}