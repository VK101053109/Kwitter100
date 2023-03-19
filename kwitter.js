function login(){
    user_n=document.getElementById("uname").value;
    localStorage.setItem("user_name_key",user_n);
    window.location="kwitter_room.html";
}