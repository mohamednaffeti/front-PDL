
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewChecked {
  constructor(private userService: UserService) {
    this.getMe()
    this.getAllUsers()
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  ngOnInit(): void {
    this.connect()
  }
  me: any
  messages: any = []
  userClick: any
  stompClient: any
  messageInput: any
  users: any
  @ViewChild('myScrollContainer') myScrollContainer: any;

  getAllUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res
      this.users = this.users.filter((i: any) => {
        return i.id !== this.me.id
      })
    })
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  connect() {
    var url = `http://localhost:8081/websocket`;
    var socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    let thats = this;

    thats.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      thats.stompClient.subscribe("/topic/" + thats.me?.id, function (message: any) {
        thats.showMessage(message)
      });






    });
  }

  showMessage(msg: any) {
    console.log('---------', messageSender)
    var messageType = JSON.parse(msg.body).type
    var messageContent = JSON.parse(msg.body).content
    var messageSender = JSON.parse(msg.body).sender
    var messageRec = JSON.parse(msg.body).rec

    console.log('before', this.messages)
    // var Type = JSON.parse(msg.type)
    this.messages.push({ sender: messageSender, content: messageContent, rec: messageRec, lu: false })
    console.log('after', this.messages)
    console.log(this.messages)



  }
  getMe() {
    this.userService.getUserById(sessionStorage.getItem('id')).subscribe(res => {
      console.log('me', res)
      this.me = res
    })
  }
  countMessage(id: any) {
    var nb = 0
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].sender == id && this.messages[i].lu == false) {
        nb = nb + 1
      }
    }

    return nb

  }
  sendMessage() {

    var chatMessage = {
      sender: this.me.id,
      rec: this.userClick.id,
      content: this.messageInput,
      type: 'CHAT'
    };
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    this.messageInput = null
  }

  clickUser(user: any) {


    this.userClick = user
    this.messages.map((i: any) => {
      if (i.sender == user.id) {
        i.lu = true
      }
    })
    console.log(this.messages)
  }

  capitalizeFirstLetter(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
