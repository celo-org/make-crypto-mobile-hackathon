const abi = {
	contactName: "Certi",
	abi: [
		{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
		{
			inputs: [{ internalType: "string", name: "", type: "string" }],
			name: "certificates",
			outputs: [
				{ internalType: "string", name: "ipfs", type: "string" },
				{ internalType: "uint256", name: "issuer", type: "uint256" },
				{ internalType: "uint256", name: "issuetime", type: "uint256" },
				{ internalType: "uint256", name: "validtill", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "address", name: "_newaddress", type: "address" },
			],
			name: "changeaddress",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_ipfs", type: "string" },
				{ internalType: "uint256", name: "_validtill", type: "uint256" },
				{ internalType: "string", name: "_cerdID", type: "string" },
			],
			name: "generateCert",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "institutes",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "", type: "address" }],
			name: "institutes_reverse",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "string", name: "_cerdID", type: "string" },
				{ internalType: "uint256", name: "_validtill", type: "uint256" },
			],
			name: "reinstate",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "string", name: "_cerdID", type: "string" }],
			name: "revoke",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "string", name: "_cerdID", type: "string" }],
			name: "verify",
			outputs: [
				{ internalType: "string", name: "ipfs", type: "string" },
				{ internalType: "address", name: "issuer", type: "address" },
				{ internalType: "uint256", name: "issuetime", type: "uint256" },
				{ internalType: "uint256", name: "validtill", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
	],
};
export default abi;
