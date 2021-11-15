/**
 * UservotesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { MongoClient } = require('mongodb');
const stampy_id = "stampy";



const database_path = "mongodb+srv://admin:jellynightfatherwheel@cluster0.7phke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let client = new MongoClient(database_path, { useNewUrlParser: true, useUnifiedTopology: true });//TODO: implement the database; modify queries to it accordingly.

const {Matrix, solve} = require('ml-matrix'); //npm install this
const readline = require('readline');
const f = require('fs');

const admin_usernames = []; //Either fill with admins, or remove

const PAGE_SIZE = 5;




class Utilities {

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
	static timeUsers = null;
	static temperatureUsers = null;
	static capitalUsers = null;
    static ids = null;
    static index = null;
	static tempindex = null;
	static capitalindex = null;
    static scores = null;
	static temperaturescores = null;
	static capitalscores = null;

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
        this.TimeVotes = client.db("Kelvin").collection("uservotes");
		this.Transactions = client.db("Kelvin").collection("transactions");
		this.TemperatureVotes = client.db("Kelvin").collection("temperaturevotes");
		this.CapitalVotes = client.db("Kelvin").collection("capitalvotes");
		this.Proposals = client.db("Kelvin").collection("proposals");
		this.Models = client.db("Kelvin").collection("models");
    }

    async clearVotes() {
        await this.TimeVotes.deleteMany({});
		await this.TemperatureVotes.deleteMany({});
		await this.CapitalVotes.deleteMany({});
    }

    update_ids_list() {
        this.ids = this.users.sort();
		this.timeids = this.timeUsers.sort();
		this.tempids = this.temperatureUsers.sort();
		this.capitalids = this.capitalUsers.sort();
		console.log(this.ids);
		console.log(this.timeids);
		console.log(this.tempids);
		console.log(this.capitalids);
        this.index = {0: 0};
		this.tempindex = {0: 0};
		this.capitalindex = {0: 0};
		for(let i = 0; i < this.timeids.length; i++) {
            let userid = this.timeids[i];
            this.index[userid] = this.timeids.indexOf(userid);
        }
		for(let i = 0; i < this.tempids.length; i++) {
            let userid = this.tempids[i];
            this.tempindex[userid] = this.tempids.indexOf(userid);
        }
		for(let i = 0; i < this.capitalids.length; i++) {
            let userid = this.capitalids[i];
            this.capitalindex[userid] = this.capitalids.indexOf(userid);
        }
		
		
    }

    index_dammit(user, collection) {
		
		let targetIndex = null;
		
		if (collection == "temperature") {
			targetIndex = this.tempindex;
		} else if (collection == "capital") {
			targetIndex = this.capitalindex;
		} else {
			targetIndex = this.index;
		}
		
		console.log(user);
        //get an index into the scores array from whatever you get.
        if (user in targetIndex) {
            //maybe we got a valid ID?
            return targetIndex[user];
        } else if (user.toString() in targetIndex) {
            return targetIndex[user.toString()];
        }
        //Maybe we got a User or Member object that has an ID?
        let uid = user.id ? user.id : null;
        console.log(uid);
        console.log(targetIndex);
        if (uid) {
            return this.index_dammit(uid);
        }

        return null;
    }

    get_user_score(user, collection) {
        let userIndex = this.index_dammit(user);
        if (userIndex) {
			if (collection == "temperature") {
				return this.temperaturescores[userIndex];
			} else if (collection == "capital") {
				return this.capitalscores[userIndex];
			} 
            return this.scores[userIndex];
        }
        return 0.0;
    }
    //A series of databse functions follow. Modify based on db implementation.
    async update_vote(userwallet, user_name, voted_for, voted_for_transaction, voted_for_proposal, vote_quantity, collection) {
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let insertedObj = {
            user: userwallet,
            sourceName: user_name,
            votedFor: voted_for,
            targetTransaction: voted_for_transaction,
            votecount: vote_quantity,
            targetProposal: voted_for_proposal			
        };
        await targetTable.insertOne(insertedObj);
    }
	
	
	async add_transaction(id, amount_sent, fromId, toId, desc) {
		let insertedObj = {
			transactionId: id,
			amountSent: parseFloat(amount_sent),
			from: fromId,
			to: toId,
			description: desc,
			timestamp: new Date().getTime()
		};
		await this.Transactions.insertOne(insertedObj);
		return true;
	}
	
	async add_proposal(id, proposing_user, desc) {
		let insertedObj = {
			proposalId: id,
			proposer: proposing_user,
			description: desc,
			timestamp: new Date().getTime()
		};
		await this.Proposals.insertOne(insertedObj);
		return true;
	}

    async get_votes_by_user(userwallet, collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let allUserVotes = await targetTable.find({user: userwallet}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_votes_for_user(userwallet, collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let allUserVotes = await targetTable.find({votedFor: userwallet}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_votes_by_transaction(transaction, collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let allUserVotes = await targetTable.find({targetTransaction: transaction}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }
	
	async get_votes_by_proposal(proposal, collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let allUserVotes = await targetTable.find({targetProposal: proposal}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }
	
	async get_average_impact_by_proposal(proposal) {
		let all_impact_votes = await this.Models.find({proposalId: proposal}).toArray();
		let total = 0;
		if (all_impact_votes.length < 1) {
			return 0;
		}
		for (let i = 0; i < all_impact_votes.length; i++) {
            total += all_impact_votes[i].score;
        }
        return total/all_impact_votes.length;
	}
	
	async get_average_impact_by_user(userwallet) {
		let proposals_by_user = await this.Proposals.find({proposer: userwallet}).toArray();
		let total = 0;
		if (proposals_by_user.length < 1) {
			return 0;
		}
		for (let i = 0; i < proposals_by_user.length; i++) {
			total += await get_average_impact_by_proposal(proposals_by_user[i].proposalId);
		}
		return total/proposals_by_user.length;
	}

    async get_total_votes(collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let allUserVotes = await targetTable.find({}).toArray();
        let total = 0;
        for (let i = 0; i < allUserVotes.length; i++) {
            total += allUserVotes[i].votecount;
        }
        return total;
    }

    async get_all_user_votes(collection){
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        return await targetTable.find({}).toArray();
    }

    async get_users(collection) {
		let targetTable = null;
		if(collection == "temperature") {
			targetTable = this.TemperatureVotes;
		} else if(collection == "capital") {
			targetTable = this.CapitalVotes;
		} else {
			targetTable = this.TimeVotes;
		}
        let users = [];
        let allUserVotes = await targetTable.find({}).toArray();
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
	
	async get_transaction_page(page_number) {
		let offset = PAGE_SIZE * (page_number - 1);
		return (await this.Transactions.aggregate([{$sort: {timestamp: -1}}, {$skip: offset}, {$limit: PAGE_SIZE}])).toArray();
	}
	
	async get_proposal_page(page_number) {
		let offset = PAGE_SIZE * (page_number - 1);
		return (await this.Proposals.aggregate([{$sort: {timestamp: -1}}, {$skip: offset}, {$limit: PAGE_SIZE}])).toArray();
	}

}

class StampsModule {
    toString() {
        return "Stamps module";
    }

    constructor() {
        this.utils = Utilities.get_instance();
        this.red_stamp_value = 1;
        this.gold_stamp_value = this.red_stamp_value * 5;
		this.half_red_stamp_value = .5;
		this.half_gold_stamp_value = 2.5;
		this.zero_stamp_value = 0;
		
        this.user_karma = 1.0;
    }

    async init() {
        await this.utils.init()
        this.total_votes = await this.utils.get_total_votes("time");
		this.total_temperature_votes = await this.utils.get_total_votes("temperature");
		this.total_capital_votes = await this.utils.get_total_votes("capital");
        await this.calculate_stamps("time");
        await this.calculate_stamps("temperature");
        await this.calculate_stamps("capital");		
    }

    reset_stamps() {
        console.log("WIPING STAMP RECORDS");
        this.utils.clearVotes()
        this.utils.update_vote('alice', 'alice_name', 'bob', 'seed_transaction', null, 7, "time"); //Generate start set IDs and replace these
		this.utils.update_vote('alphonse', 'alphonse_name', 'barry', 'seed_transaction', null, 7, "temperature"); //Generate start set IDs and replace these
		this.utils.update_vote('paul', 'paul_name', 'carl', 'seed_transaction', null, 7, "capital"); //Generate start set IDs and replace these
    }

    async update_vote(stamp_type, from_id, from_name, to_id, to_transaction, to_proposal, collection, negative=false, recalculate=true){
        if (to_id == stampy_id) {
            //votes for stampy do nothing
            return false;
        }
        if(to_id == from_id) {
            //votes for yourself do nothing
            return false;
        }

        let vote_strength = 0;

        if (stamp_type == "stamp") {
            vote_strength = this.red_stamp_value;
        } else if (stamp_type == "goldstamp") {
            vote_strength = this.gold_stamp_value;
        } else if (stamp_type == "halfstamp") {
			vote_strength = this.half_red_stamp_value
		} else if (stamp_type == "halfgoldstamp") {
			vote_strength = this.half_gold_stamp_value;
		}

        if (negative) {
            vote_strength = -vote_strength;
        }
		

        if (collection == "temperature") {
			this.total_temperature_votes += vote_strength;
		} else if (collection == "capital") {
			this.total_capital_votes += vote_strength;
		} else {
			this.total_votes += vote_strength;
		}
        await this.utils.update_vote(from_id, from_name, to_id, to_transaction, to_proposal, vote_strength, collection);
        this.utils.users = await this.utils.get_users();
        this.utils.update_ids_list();
        if (recalculate) {
            this.calculate_stamps(collection);
        }
        return true;
    }

    async calculate_stamps(collection) {
        //set up and solve the system of linear equations
        console.log("RECALCULATING STAMP SCORES");

        let timeUsers = await this.utils.get_users("time");
		let temperatureUsers = await this.utils.get_users("temperature");
		let capitalUsers = await this.utils.get_users("capital");
		let timeTempUsers = [...new Set([...timeUsers, ...temperatureUsers])];
		this.utils.users = [...new Set([...timeTempUsers, ...capitalUsers])];
		this.utils.timeUsers = timeUsers;
		this.utils.temperatureUsers = temperatureUsers;
		this.utils.capitalUsers = capitalUsers;
        this.utils.update_ids_list();
		
		let user_count = this.utils.users.length;
		let targetIndex = null;


        if (collection == "temperature") {
			user_count = temperatureUsers.length;
			targetIndex = this.utils.tempindex;
		} else if (collection == "capital") {
			user_count = capitalUsers.length;
			targetIndex = this.utils.capitalindex;
		} else {
			user_count = timeUsers.length;
			targetIndex = this.utils.index;
		}
        let users_matrix = Matrix.zeros(user_count, user_count);

        let votes = await this.utils.get_all_user_votes(collection);
		

        for(let i = 0; i < votes.length; i++) {
            let from_id = votes[i]['user']; //This may change depending on the database implementation and what objects returned from the database look like
            let to_id = votes[i]['votedFor'];
            let votes_for_user = votes[i]['votecount'];
            let from_id_index = targetIndex[from_id];
            let toi = targetIndex[to_id];
            let total_votes_by_user = await this.utils.get_votes_by_user(from_id, collection);
            if (total_votes_by_user != 0) {
                let score = (this.user_karma * votes_for_user) / total_votes_by_user;
                users_matrix.set(toi, from_id_index, users_matrix.get(toi, from_id_index) + score); 
            }

        }

        for (let i = 1; i < user_count; i++) {
            users_matrix.set(i, i, -1.0);
        }

        users_matrix.set(0, 0, 1.0);

        let user_count_matrix = Matrix.zeros(user_count, 1);
        user_count_matrix.set(0, 0, 1.0); //God has 1 karma
		
		
		if (collection == "temperature") {
			this.utils.temperaturescores = solve(users_matrix, user_count_matrix).to1DArray();
		    console.log(this.utils.temperaturescores);
		} else if (collection == "capital"){
			this.utils.capitalscores = solve(users_matrix, user_count_matrix).to1DArray();
			console.log(this.utils.capitalscores);
		} else {
	        this.utils.scores = solve(users_matrix, user_count_matrix).to1DArray();
		    console.log(this.utils.scores);		
		}
        //this.print_all_scores(collection);
        //done
    }

    async get_user_scores(collection) {
        const message = "Here are the users and how many stamps they're worth:\n";
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            message += name + ": \t" + String(stamps) + "\n";
        }
        return message;
    }

    async print_all_scores(collection) {
        let total_stamps = 0;
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            total_stamps += stamps;
            console.log(name + "\t" + String(stamps));
        }
        console.log("Total votes:" + String(this.total_votes));
        console.log("Total stamps:" + String(total_stamps));
    }

    get_user_stamps(user, collection) {
		if (!user) {
			return 0;
		}
        let index = this.utils.index_dammit(user, collection);
        console.log("get_user_stamps for " + String(user)+ ", index=" + String(index) + ", collection=" + collection);
        let stamps = 0.0; //Maybe readd nonzero predicate when seed users are figured out?
		if (collection == "temperature") {
	        stamps = this.utils.temperaturescores[index] * this.total_temperature_votes;
		} else if (collection == "capital") {
			stamps = this.utils.capitalscores[index] * this.total_capital_votes
		} else {
			stamps = this.utils.scores[index] * this.total_votes;
		}
		if (collection == "temperature") {
			console.log(this.utils.temperaturescores[index]);
		    console.log(this.utils.temperaturescores);
            console.log(this.total_temperature_votes);
		} else if (collection == "capital") {
			console.log(this.utils.capitalscores[index]);
		    console.log(this.utils.capitalscores);
            console.log(this.total_capital_votes);
		} else {
			console.log(this.utils.scores[index]);
		    console.log(this.utils.scores);
            console.log(this.total_votes);
		}
        return stamps;
    }

    load_votes_from_csv(collection, filename="stamps.csv") {
        let rl = readLine.createInterface({
            input : f.createReadStream(file),
            output : process.stdout,
            terminal: false
        });
        let headerSkipped = false;
        rl.on('line', function (line) {
            if (! headerSkipped) {
                headerSkipped = true;
            } else {
                let line_contents = line.split(",");
                let msg_id =line_contents[0];
                let react_type = line_contents[1];
                let from_id = line_contents[2];
                let to_id = line_contents[3];
                this.update_vote(react_type, from_id, to_id, collection, false, false);
            }
        });
        this.calculate_stamps(collection);
    }



    static user_is_admin(username) {
        for(let i = 0; i < admin_usernames.length; i++) {
            if (username == admin_usernames[i]) {
                return true;
            }
            return false;
        }
    } 

}
 

module.exports = {
	
	getUservotes: async (req, res) => {
		const client = new MongoClient(database_path, { useNewUrlParser: true, useUnifiedTopology: true });
    //const employees = await Employees.find({});
	    await client.connect();
		const collection = client.db("Kelvin").collection("uservotes");
        const filteredDocs = await collection.find({}).toArray();
		console.log(filteredDocs);
		client.close();
		return res.json({data: filteredDocs});
    },
	
	getTemperaturevotes: async (req, res) => {
		const client = new MongoClient(database_path, { useNewUrlParser: true, useUnifiedTopology: true });
    //const employees = await Employees.find({});
	    await client.connect();
		const collection = client.db("Kelvin").collection("temperaturevotes");
        const filteredDocs = await collection.find({}).toArray();
		console.log(filteredDocs);
		client.close();
		return res.json({data: filteredDocs});
    },
	
	getCapitalvotes: async (req, res) => {
		const client = new MongoClient(database_path, { useNewUrlParser: true, useUnifiedTopology: true });
    //const employees = await Employees.find({});
	    await client.connect();
		const collection = client.db("Kelvin").collection("capitalvotes");
        const filteredDocs = await collection.find({}).toArray();
		console.log(filteredDocs);
		client.close();
		return res.json({data: filteredDocs});
    },
	
	getVotesByTransaction: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		
		let resultData = [];
		for (let i = 0; i < req.query.transactions.length; i++) {
			resultData.push(await stamps.utils.get_votes_by_transaction(req.query.transactions[i], req.query.collection));
		}
		return res.json({data: resultData});
	},
	
	getVotesByProposal: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		
		let resultData = [];
		for (let i = 0; i < req.query.transactions.length; i++) {
			resultData.push(await stamps.utils.get_votes_by_proposal(req.query.proposals[i], req.query.collection));
		}
		return res.json({data: resultData});
	},
	
	updateVote: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		if (! req.query.toTransaction) {
		    req.query.toTransaction = null;
		}
		if (! req.query.toProposal) {
			req.query.toProposal = null;
		}
		const success = await stamps.update_vote(req.query.stampType, req.query.fromId, req.query.fromName, req.query.toId, req.query.toTransaction, req.query.toProposal, req.query.collection, req.query.negative); //req.query.negative is true in the case of a downvote, and false otherwise.
	    return res.json({data: success});
	},
	
	updateVoteForTransaction: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		const successSource = await stamps.update_vote(req.query.stampType, req.query.fromId, req.query.fromName, req.query.toIdSource, req.query.toTransaction, null, req.query.collection, req.query.negative);
	    const successDest = await stamps.update_vote(req.query.stampType, req.query.fromId, req.query.fromName, req.query.toIdDest, req.query.toTransaction, null, req.query.collection, req.query.negative);
	    return res.json({data: successSource && successDest});
	},
	
	updateVoteForProposal: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		const success = await stamps.update_vote(req.query.stampType, req.query.proposer, req.query.proposerName, req.query.toIdSource, null, req.query.toProposal, req.query.collection, req.query.negative);
	    return res.json({data: success});
	},
	
	getUserStamps: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		let resultData = await stamps.get_user_stamps(req.query.user, req.query.collection);
		return res.json({data: resultData});
	},
	
	addNewTransaction: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		const successAdd = await stamps.utils.add_transaction(req.query.transactionId, req.query.amountSent, req.query.source, req.query.dest, req.query.description);
		const successSource = await stamps.update_vote("zerostamp", "placeholder_user", "placeholder_name", req.query.source, req.query.transactionId, "uservotes", false);
        const successDest = await stamps.update_vote("zerostamp", "placeholder_user", "placeholder_name", req.query.dest, req.query.transactionId, "uservotes", false);
        return res.json({data: successAdd && successSource && successDest});		
	},
	
	addNewProposal: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		const successAdd = await stamps.utils.add_proposal(req.query.proposalId, req.query.proposer, req.query.description);
		const successVote = await stamps.update_vote("zerostamp", "placeholder_user", "placeholder_name", req.query.proposer, null, req.query.proposalId, "uservotes", false);
        return res.json({data: successAdd && successVote});		
	},
	
	getTransactionPage: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		let resultData = await stamps.utils.get_transaction_page(req.query.pageNumber);
		return res.json({data: resultData});
	},
	
	getProposalPage: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		let resultData = await stamps.utils.get_proposal_page(req.query.pageNumber);
		return res.json({data: resultData});
	},
	
	getProposalScore: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		let resultData = [];
		
		for (let i = 0; i < req.query.proposals.length; i++) {
			let total_proposal_votes = (await stamps.utils.get_votes_by_proposal(req.query.proposals[i], "time")) + (await stamps.utils.get_votes_by_proposal(req.query.proposals[i], "temperature")) + (await stamps.utils.get_votes_by_proposal(req.query.proposals[i], "capital"));
		    let average_impact_rating = await stamps.utils.get_average_impact_by_proposal(req.query.proposals[i]);
			resultData.push(average_impact_rating + total_proposal_votes);
		}

		return res.json({data: resultData});
	},
	
	getUserScore: async (req, res) => {
		const stamps = new StampsModule();
		await stamps.init();
		let total_user_votes = (await stamps.utils.get_votes_for_user(req.query.user, "time")) + (await stamps.utils.get_votes_for_user(req.query.user, "temperature")) + (await stamps.utils.get_votes_for_user(req.query.user, "capital"));
		let average_impact_rating = await stamps.utils.get_average_impact_by_user(req.query.user);
		return res.json({data: average_impact_rating + total_user_votes});
	}
};

