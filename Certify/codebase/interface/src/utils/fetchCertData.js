import { retrieve } from "../utils/crypt";

const getData = async (ipfsHash, certkey, contract) => {
	let ipfsData, certData;
	if (!!ipfsHash & !!certkey) {
		await contract.methods
			.verify(ipfsHash)
			.call()
			.then((res) => (certData = res))
			.catch((error) => console.log(error));
		ipfsData = JSON.parse(await retrieve(ipfsHash, certkey));
	}
	return {
		...certData,
		...ipfsData,
	};
};
const fetchCertData = (ipfsHash, certkey, contract) => {
	return wrapPromise(getData(ipfsHash, certkey, contract));
};
function wrapPromise(promise) {
	let status = "pending";
	let result;
	let suspender = promise.then(
		(r) => {
			status = "success";
			result = r;
		},
		(e) => {
			status = "error";
			result = e;
		}
	);
	return {
		read() {
			if (status === "pending") {
				throw suspender;
			} else if (status === "error") {
				throw result;
			} else if (status === "success") {
				return result;
			}
		},
	};
}

export default fetchCertData;
