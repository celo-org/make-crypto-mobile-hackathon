import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/constants.dart';

final uid = FirebaseAuth.instance.currentUser?.uid;

Future<String> getBalance() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/getBalance?uid=' + uid!));

  if (response.statusCode == 200) {
    final Map parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return "";
  }
}

Future login() async {
  final response = await http.get(Uri.parse(apiUrl + '/api/login?uid=' + uid!));

  if (response.statusCode == 200) {
  } else {
    print(response.body);
  }
}

Future<String> getAddress() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/address?uid=' + uid!));

  if (response.statusCode == 200) {
    final Map parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return "";
  }
}

Future<String> lazyMint(String uri, String minPrice) async {
  final response = await http.get(Uri.parse(apiUrl +
      '/api/lazymint?uid=' +
      uid! +
      '&minPrice=' +
      minPrice +
      '&uri=' +
      uri));

  if (response.statusCode == 200) {
    final Map parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    throw 'Error';
    return "";
  }
}

Future<Map<String, dynamic>> getNFT(String uri) async {
  final response = await http.get(Uri.parse(uri));

  if (response.statusCode == 200) {
    final parsed = json.decode(response.body);
    return parsed;
  } else {
    print(response.body);
    return {"result": ""};
  }
}

Future<String> getWithdrawBalance() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/getWithdrawBalance?uid=' + uid!));

  if (response.statusCode == 200) {
    final Map parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return "";
  }
}

Future withdraw() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/withdraw?uid=' + uid!));

  if (response.statusCode == 200) {
  } else {
    print(response.body);
  }
}

Future<List<dynamic>> getNFTs() async {
  final response = await http.get(Uri.parse(apiUrl + '/api/marketplace'));
  if (response.statusCode == 200) {
    final parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return [
      {'result': ''}
    ];
  }
}

Future<String> getURI(String tokenId) async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/getURI?id=' + tokenId));
  if (response.statusCode == 200) {
    final parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return "";
  }
}

Future<List<dynamic>> getOwned() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/ownednft?uid=' + uid!));
  if (response.statusCode == 200) {
    final parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return [
      {'result': ''}
    ];
  }
}

Future<List<dynamic>> getOwnedURI() async {
  List<dynamic> owned = await getOwned();
  List<Map<String, dynamic>> nfts = [];
  List<Future<Map<String, dynamic>>> futureNfts = owned.map((e) {
    return getURI(e['tokenId'].toString())
        .then((value) => {'uri': value, 'tokenId': e['tokenId'].toString()});
  }).toList();
  for (Future<Map<String, dynamic>> nft in futureNfts) {
    Map<String, dynamic> val = await nft;
    nfts.add({'uri': val['uri'], 'tokenId': val['tokenId']});
  }
  return nfts;
}

Future<List<dynamic>> tokenTransfers() async {
  final response =
      await http.get(Uri.parse(apiUrl + '/api/tokenTransfers?uid=' + uid!));
  if (response.statusCode == 200) {
    final parsed = json.decode(response.body);
    return parsed['result'];
  } else {
    print(response.body);
    return [
      {'result': ''}
    ];
  }
}

Future redeem(String doc) async {
  final response = await http
      .get(Uri.parse(apiUrl + '/api/redeem?uid=' + uid! + '&doc=' + doc));
  print(apiUrl + '/api/redeem?uid=' + uid! + '&doc=' + doc);

  if (response.statusCode == 200) {
    print(response.body);
  } else {
    final parsed = json.decode(response.body);
    throw parsed['result'];
  }
}

Future sendCelo(String address, String amount) async {
  final response = await http.get(Uri.parse(apiUrl +
      '/api/sendCelo?uid=' +
      uid! +
      '&address=' +
      address +
      '&amount=' +
      amount));
  if (response.statusCode == 200) {
  } else {
    final parsed = json.decode(response.body);
    throw parsed['result'];
  }
}

Future tokenTransfer(String address, String id) async {
  final response = await http.get(Uri.parse(apiUrl +
      '/api/transfer?uid=' +
      uid! +
      '&address=' +
      address +
      '&id=' +
      id));
  if (response.statusCode == 200) {
  } else {
    final parsed = json.decode(response.body);
    throw parsed['result'];
  }
}

Future<String> uploadPhoto(String path) async {
  Uri uri = Uri.parse('https://ipfs.infura.io:5001/api/v0/add');
  http.MultipartRequest request = http.MultipartRequest('POST', uri);
  request.files.add(await http.MultipartFile.fromPath('files', path));
  http.StreamedResponse response = await request.send();
  var responseBytes = await response.stream.toBytes();
  var responseString = utf8.decode(responseBytes);
  if (response.statusCode == 200) {
    final Map parsed = json.decode(responseString);
    print('https://ipfs.infura.io/ipfs/' + parsed['Hash']);
    return 'https://ipfs.infura.io/ipfs/' + parsed['Hash'];
  } else {
    throw 'Error';
  }
}

Future<String> uploadJSON(Map<String, dynamic> value) async {
  Uri uri = Uri.parse('https://ipfs.infura.io:5001/api/v0/add');
  http.MultipartRequest request = http.MultipartRequest('POST', uri);
  request.files.add(http.MultipartFile.fromBytes(
    'files',
    utf8.encode(json.encode(value)),
  ));
  http.StreamedResponse response = await request.send();
  var responseBytes = await response.stream.toBytes();
  var responseString = utf8.decode(responseBytes);
  if (response.statusCode == 200) {
    final Map parsed = json.decode(responseString);
    print('https://ipfs.infura.io/ipfs/' + parsed['Hash']);
    return 'https://ipfs.infura.io/ipfs/' + parsed['Hash'];
  } else {
    throw 'Error';
  }
}
