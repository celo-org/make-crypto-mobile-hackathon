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
    const response = await fetch('https://api.projectkelvin.io/uservotes/getProposalPage?pageNumber=1');
    const users = await response.json();
    items = users.data;
    console.log('items 123',items);
    getVotesForTransactions(items);
    setTrasactions(users);
  }

  async function getVotesForTransactions(items) {
    let transactions_request = '';
    for(var i = 0;i<items.length;i++){
        transactions_request = transactions_request+'&proposals='+items[i].proposalId;
    }

    const response = await fetch('https://api.projectkelvin.io/uservotes/getProposalScore?'+transactions_request);
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

 async function AddVote(item,collection) {
    votes = votes - 1;
    console.log('add vote transaction before ',item);
    item.votes = item.votes  + 1;
    console.log('add vote transaction after',item);
    setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForProposal?stampType=stamp&proposer=${item.proposer}&proposerName=null&toIdSource=null&toProposal=${item.proposalId}&fromId=${item.proposer}&fromName=null&collection=${collection}&negative=false`);
    //const users = await response.json();
    //setUsers(users);
  }

async function DownVote(item,collection) {
    votes = votes - 1;
    item.votes = item.votes  - 1;
    setTrasactions(item);
    const response = await fetch(`https://api.projectkelvin.io/uservotes/updateVoteForProposal?stampType=stamp&proposer=${item.proposer}&proposerName=null&toIdSource=null&toProposal=${item.proposalId}&fromId=${item.proposer}&fromName=null&collection=${collection}&negative=true`);
    const users = await response.json();
    
  }

  return (
    <>
    <Header />

    <section class="container mb-3">
        <div class="row">
            <div class="col">
                <nav class="nav nav-pills nav-justified">
                    <a class="nav-link active" aria-current="page" href="#">Proposals</a>
                    <a class="nav-link" href="#">Existing Proposals</a>
                </nav>
            </div>
        </div>
    </section>

     <section class="container text-center ">
        <div class="row mb-3">
            <div class="col">
                <h3 class="text-color">Existing Proposals</h3>
            </div>
        </div>
        </section>
  
    <div class="container page-wrapper text-center" >

        <div>
       <ul class="p-0">
       



        <div class="row">
    {items.map(function(item, index){
                    return (<>

            <div class="col my-block m-2 px-4 flex-column align-items-start">
                <h6 class="mb-1 text-left">{item.description}</h6>
                <div class="d-flex  my-2 w-100 justify-content-between">
                    <div class="d-flex align-items-center ">
                    
                    <h6></h6>
                    </div>
                   <a href={`/inputs?proposal=${item.proposalId}`} > <button class="btn btn-primary btn-color compact-btn my-2" type="button"> Analyse Impact</button></a>
                </div>
                <div class="d-flex justify-content-between w-100 my-2 align-items-center">
                    <div>
                    <h6>{item.votes}</h6>
                    <span class="mylabel">Total Count</span>
                    </div>
                    <div class="d-flex flex-row voting">
                      {/* <div>
                      <a onClick={() => AddVote(item,'temperature')} href="#"><img src="http://saidutt.com/temp/icons/tempUp.svg" class="icon-shadow" alt="" /></a>
                      <a onClick={() => AddVote(item,'time')} href="#"><img src="http://saidutt.com/temp/icons/timeUp.svg" class="icon-shadow" alt="" /></a>
                      <a onClick={() => AddVote(item,'capital')} href="#"><img src="http://saidutt.com/temp/icons/capitalUp.svg" class="icon-shadow" alt="" /></a>
                     
                      </div>
                      <div>
                        <span>Temperature</span>
                        <span>Time</span>
                        <span>Capital</span>
                      </div>
                    <div>
                    <a onClick={() => DownVote(item,'temperature')} href="#"><img src="http://saidutt.com/temp/icons/tempDown.svg" class="icon-shadow" alt="" /></a>
                      <a onClick={() => DownVote(item,'time')} href="#"><img src="http://saidutt.com/temp/icons/timeDown.svg" class="icon-shadow" alt="" /></a>
                      <a onClick={() => DownVote(item,'capital')} href="#"><img src="http://saidutt.com/temp/icons/capitalDown.svg" class="icon-shadow" alt="" /></a>

                    </div> */}
                    <div>
                      <h6>{item.votes}</h6>
                      <div>
                        <a onClick={() => AddVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/tempUp.svg" class="icon-shadow" alt="" /></a>
                        <a onClick={() => DownVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/tempDown.svg" class="icon-shadow" alt="" /></a>
                      </div>
                      <span>Temperature</span>
                    </div>
                    <div>
                      <h6>{item.votes}</h6>
                      <div>
                        <a onClick={() => AddVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/timeUp.svg" class="icon-shadow" alt="" /></a>
                        <a onClick={() => DownVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/timeDown.svg" class="icon-shadow" alt="" /></a>
                      </div>
                      <span>Time</span>
                    </div>
                    <div>
                      <h6>{item.votes}</h6>
                      <div>
                        <a onClick={() => AddVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/capitalUp.svg" class="icon-shadow" alt="" /></a>
                        <a onClick={() => DownVote(item,'temperature')} href="#"><img src="https://cdn.kulfyapp.com/celo/capitalDown.svg" class="icon-shadow" alt="" /></a>
                      </div>
                      <span>Capital</span>
                    </div>

                    </div>
                    
                </div>
            </div>

                    </>);
                  })}

        </div>


      </ul>

        </div>
    </div>
    </>
  );
};

export default Transactions;

