const {Sequelize, DataTypes, QueryTypes} = require("sequelize");
let sqlite3 = require("sqlite3").verbose();
const { MongoClient } = require('mongodb');


const database_path = "mongodb+srv://admin:jellynightfatherwheel@cluster0.7phke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let client = new MongoClient(database_path, { useNewUrlParser: true, useUnifiedTopology: true });

export default class Utilities {

    static DB_PATH = null;

    static __instance = null;
    static db = null;
    static client = null;
    
    static last_message_was_youtube_question = null;
    static latest_comment_timestamp = null;
    static last_check_timestamp = null;
    static youtube_cooldown = null;
    static last_timestamp = null;
    static last_question_asked_timestamp = null;
    static latest_question_posted = null;

    static users = null;
    static ids = null;
    static index = null;
    static scores = null;

    static modules_dict = {};

    static get_instance () {
        if(Utilities.__instance == null) {
            new Utilities();
        }
        return Utilities.__instance;
    }

    constructor() {
        if(Utilities.__instance != null) {
            throw "This class is a singleton!"
        } else {
            this.client = client;
            Utilities.__instance = this;
            this.start_time = Date.now();
        }

    }

    async init() {
        await client.connect();
        this.UserVotes = client.db("Kelvin").collection("uservotes");
    }

    async clearVotes() {
        await this.UserVotes.deleteMany({});
    }

    update_ids_list() {
        this.ids = this.users.sort();;
        this.index = {0: 0};
        for(let i = 0; i < this.ids.length; i++) {
            let userid = this.ids[i];
            this.index[userid] = this.ids.indexOf(userid);
        }
    }

    index_dammit(user) {
		console.log(user);
        //get an index into the scores array from whatever you get.
        if (user in this.index) {
            //maybe we got a valid ID?
            return this.index[user];
        } else if (user.toString() in this.index) {
            return this.index[user.toString()];
        }
        //Maybe we got a User or Member object that has an ID?
        let uid = user.id ? user.id : null;
        console.log(uid);
        console.log(this.index);
        if (uid) {
            return this.index_dammit(uid);
        }

        return null;
    }

    get_user_score(user) {
        let userIndex = this.index_dammit(user);
        if (userIndex) {
            return this.scores[index];
        }
        return 0.0;
    }
    //A series of databse functions follow. Modify based on db implementation.
    async update_vote(userwallet, user_name, voted_for, voted_for_transaction, vote_quantity) {
        let insertedObj = {
            user: userwallet,
            sourceName: user_name,
            votedFor: voted_for,
            targetTransaction: voted_for_transaction,
            votecount: vote_quantity 
        };
        await this.UserVotes.insertOne(insertedObj);
    }

    async get_votes_by_user(userwallet){
        let allUserVotes = await this.UserVotes.find({user: userwallet}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_votes_for_user(userwallet){
        let allUserVotes = await this.UserVotes.find({votedFor: userwallet}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_votes_by_transaction(transaction){
        let allUserVotes = await this.UserVotes.find({targetTransaction: transaction}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_total_votes(){
        let allUserVotes = await this.UserVotes.find({}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_all_user_votes(){
        return await this.UserVotes.find({}).toArray();
    }

    async get_users() {
        let users = [];
        let allUserVotes = await this.UserVotes.find({}).toArray();
        for (let i = 0; i < allUserVotes.length; i++) {
            if(! users.includes(allUserVotes[i].user)) {
                users.push(allUserVotes[i].user);
            }
            if(! users.includes(allUserVotes[i].votedFor)) {
                users.push(allUserVotes[i].votedFor);
            }
        }
        return users;
    }

}