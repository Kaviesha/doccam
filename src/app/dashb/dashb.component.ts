import { Component, OnInit, ViewChild, ViewChildren, ElementRef} from '@angular/core';
import Peer from 'peerjs';
import swal from 'sweetalert';


import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';




// this.peer = new Peer({host:'peerjs-server.herokuapp.com',secure:true, port:443});
@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.css']
})
export class DashbComponent implements OnInit {

  callConnected;
  user;

  peer;
  call;

  myPeerId;
  rPeerId;

  readyStat;
  vidEl;

  myStream;
  rStream;
 
  mediaConnection;
  constrains={audio:true,video:true}
  constructor() {
  }
  
  ngAfterViewInit(){

  }
  ngOnInit() {
    
    swal("Camera access", "Please allow camera and microphone access to use the website");
    
    navigator.mediaDevices.getUserMedia(this.constrains).then(
      stream=>{
        this.myStream = stream;
      });
   
       
  }

  ready(video){

    this.readyStat = true;
    this.vidEl = video;
    
    var user = firebase.auth().currentUser.uid;
    console.log(user)

    if(user=="wAOlJLp25yghPMqvo4GYCMpdbqF3"){
      this.rPeerId = "odc8OuNvXENIYDRMMQlb4Oedbeq1"
      this.user = "Doctor"
    }
    else{
      this.rPeerId = "wAOlJLp25yghPMqvo4GYCMpdbqF3"
      this.user = "patient"
    }

    this.peer = new Peer(user,{host:'peerjs-server.herokuapp.com',secure:true, port:443, config: 
    {'iceServers': [{ urls: 'stun:numb.viagenie.ca:3489',username:'doccamraspi@gmail.com', credential: 'doccam123' },
    { urls: 'turn:numb.viagenie.ca',username:'doccamraspi@gmail.com', credential: 'doccam123' },
    { urls: 'turn:numb.viagenie.ca',username:'webrtc@live.com', credential: 'muazkh' }]} });
    // this.peer = new Peer()
    

    setTimeout(() => {
      this.myPeerId = this.peer.id;
      console.log(this.myPeerId)
     
      // var conn = this.peer.connect(this.rPeerId);
    },2000);

    

    this.peer.on('call', function(call) {
      setTimeout(() => {
      call.answer(this.myStream);
      console.log(this.myStream)
    },1000);
      call.on('stream', function(stream){
        this.vidEl = video;
        this.rStream = stream;
        this.vidEl.srcObject = stream;
        console.log("call answerd")
      })
      },function(err) {
        console.log('Failed to get stream', err); 
      });

    console.log(this.vidEl)

    
  }
  callActive(video){
   
    this.mediaConnection  = this.peer.call(this.rPeerId,this.myStream)
    console.log(this.myStream)
    swal("Calling..","Tring to connect the call");
    setTimeout(() => {
    if(this.mediaConnection.open == false){
      swal("Connection failed", "The person you are trying to connect maybe offline!");
      this.callConnected = false;
    }
    else{
      swal("Call Connected","You are sharing your camera and microphone feed now. please press stop sharing to end the call","sucsess");
      this.callConnected = true;
    }
    },5000);
  
    
  }
  
    
  disconnect(){
      this.mediaConnection.close()
      swal("Call disconnected","please click share my feed to connect again","sucsess");
  }

  // ngOnDestroy() {
  //   console.log('destroy test')
  //   swal("Disconnected","Connectin has been terminated. please select share to start sharing the feed again","sucsess");
  // }
}
