use actix;

use near_indexer::near_primitives::views::ExecutionStatusView;
use near_indexer::near_primitives::types::BlockReference;
use near_indexer::near_primitives::types::FunctionArgs;
use near_indexer::near_primitives::views::QueryRequest;
use near_client::Query;
use near_client::ViewClientActor;

use clap::Clap;
use tokio::sync::mpsc;

use actix::Addr;

use configs::{init_logging, Opts, SubCommand};
use near_indexer;

use serde::{Serialize, Deserialize};

use near_sdk::json_types::{ValidAccountId,U128};

use reqwest::StatusCode;
use reqwest::Error;
use std::collections::HashMap;


mod configs;

//use this struct to store information that we want to pass to database
#[derive(Debug)] //derive debug so that we can print
struct ExecutionDetails {
    method_name: String,
    args: serde_json::Value,
    signer_id: String,
    deposit: String,
    success_value: bool,
    predecessor_id: String,
    receipt_id: String,
}

//declare struct for the return type of the blockchain view call
#[derive(Serialize, Deserialize, Debug)]
pub struct JsonToken {
    pub owner_id: String, //only declaring the field we care about
}

// data structures used by near_sdk::json
#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Price {
    pub ft_token_id: ValidAccountId,
    pub price: Option<U128>,
}
#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct SaleArgs {
    pub sale_conditions: Vec<Price>,
}

async fn remove_token_forsale_database(tok_id: String, contr_id: String) -> Result<(), Error> { 

    // cleaning up rust strings --> sometimes rust strings will have additional characters that may not be wanted and should be cleaned up
    let clean_token_id = str::replace(&tok_id,'"', "");
    let clean_contract_id = str::replace(&contr_id,'"', "");
    
    // This will POST a body defined by the hashmap
    let mut map = HashMap::new();
    map.insert("token_id", format!("token_{}",clean_token_id));
    map.insert("contract_id", clean_contract_id);
    // ... include any other relevant items for the request body here
   
    // make POST request
    let client = reqwest::Client::new();
    eprintln!("Please Add a Valid URL and uncomment lines 72-84");
    // let url = //YOUR API'S URL HERE !!!
    // let res = client.post(url.to_string())
    //     .json(&map)
    //     .send()
    //     .await?;
                                    
    //     match res.status() {
    //         StatusCode::OK => println!("Received status of success from response!"),
                                  
    //         s => println!("Received response status: {:?}", s),
    //     };
        Ok(())
}

async fn insert_token_forsale_database(tok_id: String, contr_id: String, price: String) -> Result<(), Error> { 

    // cleaning up rust strings --> sometimes rust strings will have additional characters that may not be wanted and should be cleaned up
    let clean_token_id = str::replace(&tok_id,'"', "");
    let clean_contract_id = str::replace(&contr_id,'"', "");
    
    // This will POST a body defined by the hashmap
    let mut map = HashMap::new();
    map.insert("token_id", format!("token_{}",clean_token_id));
    map.insert("contract_id", clean_contract_id);
    map.insert("price_near", price);
    // ... include any other relevant items for the request body here

    //make POST request
    let client = reqwest::Client::new();
    eprintln!("Please Add a Valid URL and uncomment lines 103-114");
    // let url = //YOUR API'S URL HERE !!!
    // let res = client.post(url.to_string())
    //     .json(&map)
    //     .send()
    //     .await?;
                                                                        
    //     match res.status() {
    //         StatusCode::OK => println!("Received status of success from response!"),
                                  
    //         s => println!("Received response status: {:?}", s),
    //     };
         Ok(())
}

async fn update_token_forsale_database(tok_id: String, contr_id: String, price: String) -> Result<(), Error> { 

    // cleaning up rust strings --> sometimes rust strings will have 
    // additional characters that may not be wanted and should be cleaned up
    let clean_token_id = str::replace(&tok_id,'"', "");
    let clean_contract_id = str::replace(&contr_id,'"', "");
    
    // This will POST a body defined by the hashmap
    let mut map = HashMap::new();
    map.insert("token_id", format!("token_{}",clean_token_id));
    map.insert("contract_id", clean_contract_id);
    map.insert("price_near", price);
    // ... include any other relevant items for the request body here
   
    // make POST request
    let client = reqwest::Client::new();
    eprintln!("Please Add a Valid URL and uncomment lines 134-145");
    // let url = //YOUR API'S URL HERE !!!
    // let res = client.post(url.to_string())
    //     .json(&map)
    //     .send()
    //     .await?;
                                    
    //     match res.status() {
    //         StatusCode::OK => println!("Received status of success from response!"),
                                  
    //         s => println!("Received response status: {:?}", s),
    //     };
         Ok(())
}

async fn add_new_transaction(from: String, to: String, tokens: String, receipt_id: String) -> Result<(), Error> {
	let client = reqwest::Client::new();
	let url = format!("https://wallet-demo.kulfyapp.com/uservotes/addNewTransaction?transactionId={}&source={}&dest={}&amountSent={}&description=blahblahblah", receipt_id, from, to, tokens);
    let res = client.post(url.to_string()).send().await?;
	match res.status() {
             StatusCode::OK => println!("Received status of success from response!"),
                                  
             s => println!("Received response status: {:?}", s),
         };
        Ok(())
} 

async fn listen_blocks(mut stream: mpsc::Receiver<near_indexer::StreamerMessage>, view_client: Addr<ViewClientActor>) {
    //listen for streams
    while let Some(streamer_message) = stream.recv().await {
        //iterate through each shard in the incoming stream
        for shard in streamer_message.shards {
            //for each receipt and execution outcome pair in the shard
            for receipt_and_execution_outcome in shard.receipt_execution_outcomes {
                // Check if receipt is related to Fayyr
                if is_fayyr_receipt(&receipt_and_execution_outcome.receipt) {
                    //get the execution outcome from the receipt and execution outcome pair from the shard
                    let execution_outcome = receipt_and_execution_outcome.execution_outcome;

                    //declare the execution details that will hold specific wanted information
                    let mut execution_details = ExecutionDetails {
                        method_name: "".to_string(),
                        args: serde_json::Value::String("".to_string()),
                        signer_id: "".to_string(),
                        deposit: "".to_string(),
                        success_value: matches!(execution_outcome.outcome.status, ExecutionStatusView::SuccessValue(_) | ExecutionStatusView::SuccessReceiptId(_)),
                        predecessor_id: "".to_string(),
                        receipt_id: "".to_string(),
                    };
                    
                    //get the signer id from the receipt
                    let signer_id = if let near_indexer::near_primitives::views::ReceiptEnumView::Action { ref signer_id, .. } = receipt_and_execution_outcome.receipt.receipt {
                        Some(signer_id)
                    } else {
                        None
                    };
				
                    //if there is some signer id, set the execution detail's signer equal to it
                    match signer_id {
                        Some(signer_id) => {
                            execution_details.signer_id = signer_id.to_string();
                        },
                        _ => {},
                    };
					
					//get the receipt id from the receipt
                    let receipt_id = if let near_indexer::near_primitives::views::ReceiptView { ref receipt_id, .. } = receipt_and_execution_outcome.receipt {
                        Some(receipt_id)
                    } else {
                        None
                    };
				
                    //if there is some receipt id, set the execution detail's receipt id equal to it
                    match receipt_id {
                        Some(receipt_id) => {
                            execution_details.receipt_id = receipt_id.to_string();
                        },
                        _ => {},
                    };

                    //get the predecessor_id from the receipt
                    let predecessor_id = if let near_indexer::near_primitives::views::ReceiptView { ref predecessor_id, .. } = receipt_and_execution_outcome.receipt {
                        Some(predecessor_id)
                    } else {
                        None
                    };
                    //if there is some predecessor_id, set the execution detail's predecessor_id equal to it
                    match predecessor_id {
                        Some(predecessor_id) => {
                            execution_details.predecessor_id = predecessor_id.to_string();
                        },
                        _ => {},
                    };

                    //print the entire execution outcome for the current receipt
                    eprintln!("Entire Execution Outcome ---> {:#?}", execution_outcome);   

                    //get the actions from the receipt
                    if let near_indexer::near_primitives::views::ReceiptEnumView::Action {
                        actions,
                        ..
                    } = receipt_and_execution_outcome.receipt.receipt
                    {   
                        //go through each action
                        for action in actions.iter() {
                            //get the args from the action
                            if let near_indexer::near_primitives::views::ActionView::FunctionCall {
                                args,
                                ..
                            } = action
                            {   
                                //decode the args
                                if let Ok(decoded_args) = base64::decode(args) {
                                    //turn args into json and populate execution details
                                    if let Ok(args_json) = serde_json::from_slice::<serde_json::Value>(&decoded_args) {
                                        execution_details.args = args_json;
                                    }
                                }
                            }
                            //get the method name 
                            if let near_indexer::near_primitives::views::ActionView::FunctionCall {
                                method_name,
                                ..
                            } = action
                            {
                                execution_details.method_name = method_name.to_string();
                            }
                            //get the deposit
                            if let near_indexer::near_primitives::views::ActionView::FunctionCall {
                                deposit,
                                ..
                            } = action
                            {
                                execution_details.deposit = deposit.to_string();
                            }
                        }
                    }

                    //only do stuff with the receipts if the outcome was successful
                    if execution_details.success_value == true {
                        //different cases based on the method that was called
                        match execution_details.method_name.as_str() {
                            //if remove_sale was called
                            /*"remove_sale" => {
                                eprintln!("Beginning API Call to remove sale.");
                                let token_id_for_api = execution_details.args.get("token_id").unwrap();
                                let contract_id_for_api = execution_details.args.get("nft_contract_id").unwrap();

                                let result = remove_token_forsale_database(token_id_for_api.to_string(), contract_id_for_api.to_string()).await;
                                match result {
                                    Err(e) => eprintln!("API call failure. {}",e),
                                    Ok(_)  => eprintln!("API call completed successfully!"),
                                }
                            },*/
                            //if update_price was called
                            /*"update_price" => {
                                eprintln!("Update Price Has Been Called");
                                let token_id_for_api = execution_details.args.get("token_id").unwrap();
                                let contract_id_for_api = execution_details.args.get("nft_contract_id").unwrap();
                                let price_for_api = execution_details.args.get("price").unwrap();

                                let result = update_token_forsale_database(token_id_for_api.to_string(), contract_id_for_api.to_string(), price_for_api.to_string()).await;
                                match result {
                                    Err(e) => eprintln!("API call failure. {}",e),
                                    Ok(_)  => eprintln!("API call completed successfully!"),
                                }
                            },*/
							
							"ft_transfer" => {
                                eprintln!("Hit?");
								let target_id = execution_details.args.get("to").unwrap();
								let token_amt = execution_details.args.get("tokens").unwrap();
								let receipt_num = execution_details.receipt_id;
                                add_new_transaction(execution_details.signer_id, target_id.to_string(), token_amt.to_string(),receipt_num).await;
								eprintln!("Hit!");
                                /*match result {
                                //    Err(e) => eprintln!("API call failure. {}",e),
                                    Ok(_)  => eprintln!("API call completed successfully!"),
                                }*/
							},
							
                            //if offer was called
                            /*"offer" => {
                                //build the function arguments to get passed into nft_tokens_batch
                                let function_args = serde_json::json!({
                                    "token_ids": [execution_details.args.get("token_id").unwrap()],
                                });
                                
                                //call nft_tokens_batch in order to get access to the current token owner
                                let block_reference = BlockReference::latest();
                                let request = QueryRequest::CallFunction {
                                    //contract to call
                                    account_id: "test.near".parse().unwrap(),
                                    //method to view 
                                    method_name: "nft_tokens_batch".to_string(),
                                    //passed in arguments
                                    args: FunctionArgs::from(function_args.to_string().into_bytes()),
                                };
                                let query = Query::new(block_reference, request);
                                //get the response
                                let response = view_client.send(query).await.unwrap().unwrap();

                                if let near_indexer::near_primitives::views::QueryResponseKind::CallResult(call_result) = response.kind {
                                    let result = call_result.result;

                                    //set the output (of type vec<JsonToken>) equal to the result
                                    let output: Vec<JsonToken> = serde_json::from_slice(&result).unwrap();
                                    eprintln!("Current Token Owner {:?}", output[0].owner_id);

                                    //check if the owner is the signer
                                    if output[0].owner_id == execution_details.signer_id {
                                        eprintln!("Signer Is Owner! Transaction Successful!");

                                        eprintln!("Beginning API Call.");
                                        let token_id_for_api = execution_details.args.get("token_id").unwrap();
                                        let contract_id_for_api = execution_details.args.get("nft_contract_id").unwrap();

                                        let result = remove_token_forsale_database(token_id_for_api.to_string(), contract_id_for_api.to_string()).await;
                                        match result {
                                            Err(e) => eprintln!("API call failure. {}",e),
                                            Ok(_)  => eprintln!("API call completed successfully!"),
                                        }
                                    } else {
                                        eprintln!("Signer Is Not Owner... Transaction Failed.");
                                    }
                                }
                            },*/
                            //nft_on_approve was called
                            /*"nft_on_approve" => {

                                let token_id_for_api = execution_details.args.get("token_id").unwrap();
                                //since NFT_on_approve is a cross-contract call, the contract id will be the predecessor id...necessary since the contract id is not passed into the args of this call
                                let contract_id_for_api = execution_details.predecessor_id.to_string(); 

                                // making use of NEAR SDK structures for parsing the sales condition string
                                // the sales conditions are stored in the execution details as a serde_json::Value string, which then needs to be converted to a regular serde_json::Value object
                                let SaleArgs { sale_conditions } = near_sdk::serde_json::from_str(execution_details.args.get("msg").unwrap().as_str().unwrap()).unwrap();

                                for Price { price, ft_token_id } in sale_conditions {
                                    //currently only performs the API call for the near price, ignoring other fungible tokens
                                    if ft_token_id.as_ref() == "near" {
                                        
                                        // converting price from Yocto NEAR to NEAR
                                        let price_for_api = u128::from(price.unwrap_or(U128(0))).checked_div(1000000000000000000000000).unwrap_or(0); 

                                        eprintln!("Beginning API call to put up for sale.");
                                        let result = insert_token_forsale_database(token_id_for_api.to_string(), contract_id_for_api.to_string(), price_for_api.to_string()).await;
                                        match result {
                                            Err(e) => eprintln!("API call failure. {}",e),
                                            Ok(_)  => eprintln!("API call completed successfully!"),
                                        }
                                    }
                                }
                            },*/
                            //some other transaction was called
                            _ => {
                                eprintln!("Other Transaction Called...")
                            }
                        }
                        //print execution details (SUCCESSFUL)
                       // eprintln!("Successful Execution Details {:?} related to Fayyr", execution_details);
                    } else {
                        //print execution details (FAILED)
                        eprintln!("Unsuccessful Execution Details {:?} related to Fayyr", execution_details);
                    }
                }
            }
        }
    }
}

// Assuming contract deployed to account id market.test.near
// Checks if receipt receiver is equal to the account id we care about
fn is_fayyr_receipt(receipt: &near_indexer::near_primitives::views::ReceiptView) -> bool {
    receipt.receiver_id.as_ref() == "97db500303c219fb11ffded8eadaa8945663d2a5.factory.goerli.testnet"
}

fn main() {

    let args: Vec<String> = std::env::args().collect();
    let home_dir = std::path::PathBuf::from(near_indexer::get_default_home());

    
    // We use it to automatically search the for root certificates to perform HTTPS calls
    // (sending telemetry and downloading genesis)
    openssl_probe::init_ssl_cert_env_vars();
    init_logging();

    let opts: Opts = Opts::parse();

    let home_dir = opts
        .home_dir
        .unwrap_or(std::path::PathBuf::from(near_indexer::get_default_home()));

    match opts.subcmd {

        SubCommand::Init(_) => {
            let config_args = near_indexer::InitConfigArgs {
                chain_id: Some("testnet".to_string()),
                account_id: None,
                test_seed: None,
                num_shards: 1,
                fast: false,
                genesis: Some("/home/halffull/.near/genesis.json".to_string()),
                download_genesis: false,
                download_genesis_url: None,
                max_gas_burnt_view: None,
                download_config: false,
                download_config_url: None,
                boot_nodes: None, 
            };
            near_indexer::indexer_init_configs(&home_dir, config_args);
        }
        //if we run cargo run -- runs
        SubCommand::Run => {
            eprintln!("Starting...");

            //get the indexer config from the home directory
            let indexer_config = near_indexer::IndexerConfig {
                home_dir: std::path::PathBuf::from(near_indexer::get_default_home()),
                sync_mode: near_indexer::SyncModeEnum::FromInterruption,
                await_for_node_synced: near_indexer::AwaitForNodeSyncedEnum::StreamWhileSyncing,
            };
            let sys = actix::System::new();
            sys.block_on(async move {
                let indexer = near_indexer::Indexer::new(indexer_config);
                let stream = indexer.streamer();
                let view_client = indexer.client_actors().0; //returns tuple, second is another client actor - we only care about first value
                actix::spawn(listen_blocks(stream, view_client));
            });
            sys.run().unwrap();
        }
        //if we run cargo run -- init
        //initialize configs in the home directory (~./near)
        SubCommand::Init(config) => near_indexer::indexer_init_configs(&home_dir, config.into()),
    }
}
