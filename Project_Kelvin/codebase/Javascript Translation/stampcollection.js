
import Utilities from "./utilities";
const {Matrix, solve} = require('ml-matrix'); //npm install this
const readline = require('readline');
const f = require('fs');
const stampy_id = "stampy";

const admin_usernames = []; //Either fill with admins, or remove

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
		
        this.user_karma = 1.0;
    }

    async init() {
        await this.utils.init()
        this.total_votes = await this.utils.get_total_votes();
        await this.calculate_stamps(); 
    }

    reset_stamps() {
        console.log("WIPING STAMP RECORDS");
        this.utils.clear_votes()
        this.utils.update_vote(god_id, rob_id); //Generate start set IDs and replace these
    }

    async update_vote(stamp_type, from_id, from_name, to_id, to_transaction, negative=false, recalculate=true){
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

        this.total_votes += vote_strength;
        await this.utils.update_vote(from_id, from_name, to_id, to_transaction, vote_strength);
        this.utils.users = await this.utils.get_users();
        this.utils.update_ids_list();
        if (recalculate) {
            this.calculate_stamps();
        }
        return true;
    }

    async calculate_stamps() {
        //set up and solve the system of linear equations
        console.log("RECALCULATING STAMP SCORES");

        this.utils.users = await this.utils.get_users();
        this.utils.update_ids_list();

        let user_count = this.utils.users.length;

        let users_matrix = Matrix.zeros(user_count, user_count);

        let votes = await this.utils.get_all_user_votes();
        console.log(votes);

        for(let i = 0; i < votes.length; i++) {
            let from_id = votes[i][0]; //This may change depending on the database implementation and what objects returned from the database look like
            let to_id = votes[i][1];
            let votes_for_user = votes[i][2];
            let from_id_index = this.utils.index[from_id];
            let toi = this.utils.index[to_id];
            let total_votes_by_user = await this.utils.get_votes_by_user(from_id);
            if (total_votes_by_user != 0) {
                score = (this.user_karma * votes_for_user) / total_votes_by_user;
                users_matrix.set(toi, from_id_index, score); 
            }

        }

        for (let i = 1; i < user_count; i++) {
            users_matrix.set(i, i, -1.0);
        }

        users_matrix.set(0, 0, 1.0);

        let user_count_matrix = Matrix.zeros(user_count, 1);
        user_count_matrix.set(0, 0, 1.0); //God has 1 karma

        this.utils.scores = solve(users_matrix, user_count_matrix).to1DArray();

        this.print_all_scores();
        //done
    }

    async get_user_scores() {
        const message = "Here are the users and how many stamps they're worth:\n";
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id);
            message += name + ": \t" + String(stamps) + "\n";
        }
        return message;
    }

    async print_all_scores() {
        let total_stamps = 0;
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id);
            total_stamps += stamps;
            console.log(name + "\t" + String(stamps));
        }
        console.log("Total votes:" + String(this.total_votes));
        console.log("Total stamps:" + String(total_stamps));
    }

    get_user_stamps(user) {
		if (!user) {
			return 0;
		}
        let index = this.utils.index_dammit(user);
        console.log("get_user_stamps for " + String(user)+ ", index=" + String(index));
        let stamps = 0.0; //Maybe readd nonzero predicate when seed users are figured out?
        stamps = this.utils.scores[index] * this.total_votes;
        console.log(stamps);
        console.log(this.utils.scores[index]);
        console.log(this.total_votes);
        return stamps;
    }

    load_votes_from_csv(filename="stamps.csv") {
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
                this.update_vote(react_type, from_id, to_id, false, false);
            }
        });
        this.calculate_stamps();
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

let testStamp = new StampsModule();

let test = async function() {
    await testStamp.init();

    await testStamp.update_vote("goldstamp", "alice_near_id", "alice_name", "bob_near_id", "bob_transaction");
    await testStamp.update_vote("goldstamp", "alice_near_id", "alice_name", "bob_near_id", "bob_transaction2");

    await testStamp.print_all_scores();

    const allVotes = await testStamp.utils.UserVotes.findAll();
    console.log(JSON.stringify(allVotes));
    client.close();
}

test().catch(
    error => console.log(error.stack)
);

