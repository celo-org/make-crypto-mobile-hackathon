import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import ReactDOM from "react-dom";
import { Dropdown } from 'react-bootstrap';
import Header from './Header';


let items=[];
let itemList=[];
let votes=0;
items.forEach((item,index)=>{
  itemList.push( 
)
})

const Transactions = () => {
  const [trasactions, setTrasactions] = useState([]);


  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    // 
    // 
    // 
    
    console.log('items ',trasactions);
        getTransactions();
        getUserStamps();

    
  }, []);

  async function getTransactions() {
    const response = await fetch('https://api.projectkelvin.io/uservotes/getTransactionPage?pageNumber=1');
    const users = await response.json();
    items = users.data;
    console.log('items 123',items);
    getVotesForTransactions(items);
    setTrasactions(users);
  }

  async function getVotesForTransactions(items) {
    let transactions_request = '';
    for(var i = 0;i<items.length;i++){
        transactions_request = transactions_request+'&transactions[]='+items[i].transactionId;
    }

    const response = await fetch('https://api.projectkelvin.io/uservotes/getVotesByTransaction?'+transactions_request);
    let transaction_votes = await response.json();
    transaction_votes = transaction_votes.data;

    for(var i = 0;i<transaction_votes.length;i++){
        items[i].votes = transaction_votes[i];
    }

    console.log('transaction_votes 123',transaction_votes);
    setTrasactions(transaction_votes);
  }

  async function getUserStamps() {

    const response = await fetch('https://api.projectkelvin.io/uservotes/getUserStamps?user=gkolluri.testnet');
    const response_body = await response.json();
    votes = response_body.data;
    
   setTrasactions(votes);
  }

 async function AddVote(item) {
    votes = votes - 1;
    console.log('add vote transaction before ',item);
    item.votes = item.votes  + 1;
    console.log('add vote transaction after',item);
    setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForTransaction?stampType=halfstamp&fromId=gkolluri.testnet&fromName=Girish Kolluri&toIdSource=${item.from}&toIdDest=${item.to}&toTransaction=${item.transactionId}&negative=false`);
    //const users = await response.json();
    //setUsers(users);
  }

async function DownVote(item) {
    votes = votes - 1;
    item.votes = item.votes  - 1;
    setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForTransaction?stampType=halfstamp&fromId=gkolluri.testnet&fromName=Girish Kolluri&toIdSource=${item.from}&toIdDest=${item.to}&toTransaction=${item.transactionId}&negative=true`);
    const users = await response.json();
    
  }

  return (
    <>
    <Header />
    <div class="container page-wrapper text-center" >

        <div>
       <ul class="p-0">
        <h3 class="text-center m-3">Votes Left :{votes.toFixed()}</h3>

           <div>

    </div>

    {items.map(function(item, index){
                    return (<>


                        <div class="content-wrapper" >
                <div class="content-component col-5 me-1">
                    <div class="content-body"  >
                        <img src="https://cdn.kulfyapp.com/kelvin/dp.png" alt="" width="48" height="48" />
                        <img class="image-set" src="https://cdn.kulfyapp.com/kelvin/arrow.svg" alt="" width="18.01" height="13.72" />
                        <img src="https://cdn.kulfyapp.com/kelvin/dp.png" alt="" width="48" height="48"/>
                    </div>
                    <p class=" color-text word-break"><b class="b-text text-white">{item.from}</b> paid <b class="b-text text-white">{item.to}</b></p>
                    <p><b class="b-text color-text">Total - <img src="https://cdn.kulfyapp.com/kelvin/near_icon_wht.png" alt="" width="24" height="24"/>{item.amountSent} </b></p>
                </div>
                <div class="content-impact col-5" >
                    <p class="content-uber" >{item.description}</p>
                    <a href={`/flow?id=${item.transactionId}`}  class="btn-small analyse-impact">Analyse Impact</a>
                </div>
                <div class="text-center col-2">
                    <a onClick={() => AddVote(item)} href="#"><img src="https://cdn.kulfyapp.com/kelvin/up-arrow.svg" width="8.37" height="19" alt="" /></a>
                    <p class="content-margin b-text" >{item.votes}</p>
                    <p class="content-margin b-text color-text" >Rewards</p><p><img src="https://cdn.kulfyapp.com/kelvin/near_icon_wht.png" alt="" width="24" height="24"/>{((item.amountSent*0.009)*item.votes).toFixed(2)}</p>
                    <a onClick={() => DownVote(item)}   href="#"><img src="https://cdn.kulfyapp.com/kelvin/down_arrow.svg" width="8.37" height="19" alt=""/></a>
                </div>
            </div>
                    </>);
                  })}

    


      </ul>

        </div>
    </div>
    </>
  );
};

export default Transactions;

