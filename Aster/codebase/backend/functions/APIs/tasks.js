const { admin, db } = require('../util/admin');
const { firebaseConfig } = require('../util/config');
const { initializeApp } = require('firebase/app');


initializeApp(firebaseConfig);

const getTaskDescription = (task) => {
    let data = task.data()
    return {
        id: task.id,
        name: data.name,
        description: data.description,
        total_price: data.total_price,
        number_of_labelers: data.number_of_labelers,
        contract_id: data.contract_address,
        labels: data.labels,
        dataset: data.dataset,
        number_of_submission: data.number_of_submission
    }
}

// GET /task/:task_id
exports.getSingleTask =  async (req, res) => {
    console.log('Fetching individual task')
    db.collection('tasks')
        .doc(req.params.task_id)
        .get()
        .then(doc => {
            if (!doc.exists || doc === undefined) {
                // throw new Error('No such task!')
                res.send("Task does not exist")
            } else {
                res.send(JSON.stringify(getTaskDescription(doc)))
            }
        })
        .catch(err => {
            console.log('Error getting document', err)
            res.send(JSON.stringify(err))
        })
}

// GET /tasks
exports.getAllTasks = async (req, res) => {
    db.collection('tasks')
        .get()
        .then(snapshot => {
            const tasks = []
            snapshot.forEach(doc => {
                tasks.push(getTaskDescription(doc))
            })
            res.send(JSON.stringify(tasks))
        })
        .catch(err => {
            console.log('Error getting documents', err)
            res.send(JSON.stringify(err))
        })
}

// GET /task/data/:task_id/:user_id
exports.getUserTask = async (req, res) => {
    console.log('Getting individual data entries')
    db.collection('tasks')
        .doc(req.params.task_id)
        .get()
        .then(doc => {
            let d = doc.data().dataset
            // TODO FIXME this is returning all data for now!
            // should return an array of {index : image url}
            res.send(JSON.stringify(d))
        }).catch(err => {
            console.log('Error getting document', err)
            res.send(JSON.stringify(err))
        })
}

// GET /task/labels/:task_id
exports.getTaskLabeledDataset = async (req, res) => {
    console.log('Fetching dataset replies')
    db.collection('tasks')
        .doc(req.params.task_id)
        .collection('submissions')
        .get()
        .then(doc => {
            let result = []
            doc.forEach(submission => {
                // console.log(submission.data())
                result.push({
                    id: submission.id,
                    replies: submission.data().answers,
                })
            })

            res.send(JSON.stringify(result))
        })
        .catch(err => {
            console.log('Error getting documents', err)
            res.send(JSON.stringify(err))
        })
}

// POST /task
exports.createTask = async (req, res) => {
    let data = req.body

    let name, description, total_price, number_of_labelers, labels, contract_address;

    // Validate data
    try {
        // alphanumeric name and description
        name = data.name //data.name.match("^[0-9a-zA-Z\\s]+")[0]
        description = data.description
        contract_address = data.contract_id.match("^[0-9a-zA-Z\\s]+")[0]
        total_price = Number(data.total_price)
        if (isNaN(total_price)) {
            throw new Error('Total price is not a number')
        }

        number_of_labelers = parseInt(data.number_of_labelers)
        if (isNaN(number_of_labelers)) {
            throw new Error('Number of labels is not an integer')
        }

        labels = data.labels
        // check if labels is an array of strings
        if (!Array.isArray(labels)) {
            throw new Error('Labels is not an array')
        }
        labels.forEach(label => {
            if (typeof label !== 'string') {
                throw new Error('Labels is not an array of strings')
            }
        })

        let task = {
            name: name,
            description: description,
            total_price: total_price,
            number_of_labelers: number_of_labelers,
            labels: labels,
            contract_address: contract_address,
            number_of_submission: 0
        }

        // Submit the data to the database
        db.collection('tasks')
            .add(task)
            .then(doc => {
                console.log(`Task added with ID: ${doc.id}`)
                res.send(JSON.stringify(doc.id))
            })

    } catch (err) {
        console.log(err)
        res.send(JSON.stringify(err))
        return
    }
}

//NOT USED
// POST /task/:task_id/data
exports.uploadTaskData = async (req, res) => {
    let data = req.body.data

    // Validate the given data is an array of strings
    try {
        if (!Array.isArray(data)) {
            throw new Error(`Data is not an array, but ${data}`)
        }

        data.forEach(label => {
            if (typeof label !== 'string') {
                throw new Error('Data is not an array of strings')
            }
        })

        // Transform data into an ordered sequence with indexes
        let data_with_indexes = {}
        data.forEach((label, index) => {
            data_with_indexes[index] = label
        })


        // Validate task exists
        task = db.collection('tasks')
            .doc(req.params.task_id)
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    throw new Error('Task does not exist')
                }

                // Submit the data to the database
                db.collection('tasks')
                    .doc(req.params.task_id)
                    .update({
                        dataset: data_with_indexes,
                    }).then(() => {
                        res.send(JSON.stringify('Data submitted'))
                    })
            })
    } catch (err) {
        console.log(err)
        res.send(JSON.stringify(err))
        return
    }
}

exports.uploadImage = async (request, response) => {
    const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

	let imageFileName;
	let imageToBeUploaded = {};

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = filename;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
    });

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
				return db.collection('tasks')
                    .doc(request.params.task_id)
                    .update({
                        dataset: admin.firestore.FieldValue.arrayUnion(imageUrl),
                    });
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(request.rawBody);
}

// POST /task/:task_id/submit
exports.userSubmitLabeledData = async (req, res) => {
   // Validate input, should be a map with index number : String
   let data = req.body.data
   console.log(data)


   let reviewer = req.body.reviewer
   console.log("The wallet id is: ", reviewer)

   // Validate task exists
   task = db.collection('tasks')
       .doc(req.params.task_id)
       .get()
       .then(snapshot => {
           if (!snapshot.exists) {
               throw new Error('Task does not exist')
           }

           // check if already submitted
           db.collection('tasks')
               .doc(req.params.task_id)
               .collection('submissions')
               .doc(String(reviewer))
               .get()
               .then(doc => {
                   if (doc.exists) {
                       // throw new Error('Reviewer already submitted')
                       res.send(JSON.stringify('Reviewer already submitted'))
                       return
                   }

                   // Validate if the given indices exist
                   let entries = snapshot.data().dataset

                   Object.keys(data).forEach(index => {
                       if (!entries[index]) {
                           throw new Error(`Index ${index} does not exist`)
                       }
                   })

                   // Validate if the used labels exist
                   let reviewer_labels = new Set(Object.values(data))
                   let task_labels = new Set(Object.values(snapshot.data().labels))

                   reviewer_labels.forEach(label => {
                       if (!task_labels.has(label)) {
                           throw new Error(`Label ${label} does not exist`)
                       }
                   })

                   // Inside collection tasks, in the document task_id, under the submissions label, create a new document with the id reviewer and add this data as the value
                   console.log("Reviewer: ", reviewer)
                   db.collection('tasks')
                       .doc(req.params.task_id)
                       .collection('submissions')
                       .doc(String(reviewer))
                       .set(
                           { "answers": data }
                       ).then(() => {
                           
                           res.send(JSON.stringify('Data submitted'))
                       })
                    db.collection('tasks')
                        .doc(req.params.task_id)
                        .update({
                            number_of_submission: admin.firestore.FieldValue.increment(1),
                        });
               }).catch(err => {
                   console.log('Error getting document', err)
                   res.send(JSON.stringify(err))
               })

       }).catch(err => {
           console.log(err)
           res.send(JSON.stringify(err))
           return
       })


}
