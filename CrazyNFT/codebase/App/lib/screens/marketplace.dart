import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/screens/mint.dart';
import 'package:mobile_app/screens/nft.dart';
import 'package:mobile_app/services/api_call.dart';
import 'package:modal_progress_hud_nsn/modal_progress_hud_nsn.dart';
import 'package:shimmer/shimmer.dart';
import 'package:cached_network_image/cached_network_image.dart';

class MarketplacePage extends StatefulWidget {
  const MarketplacePage({Key? key}) : super(key: key);

  @override
  _MarketplacePageState createState() => _MarketplacePageState();
}

class _MarketplacePageState extends State<MarketplacePage> {
  bool _loading = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryBackgroundColor,
      floatingActionButton: FloatingActionButton(
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => MintPage(),
            ),
          );
        },
      ),
      body: SafeArea(
        child: ModalProgressHUD(
          inAsyncCall: _loading,
          child: RefreshIndicator(
            onRefresh: () async {
              await Future.delayed(Duration(microseconds: 10000)).then((value) {
                setState(() {});
                return;
              });
            },
            child: SingleChildScrollView(
              child: Column(
                children: [
                  FutureBuilder(
                    future: getWithdrawBalance(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Container(
                            padding: const EdgeInsets.all(10),
                            width: double.infinity,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: Colors.white,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.grey.withOpacity(0.25),
                                  spreadRadius: 5,
                                  blurRadius: 7,
                                  offset: Offset(1, 3),
                                ),
                              ],
                            ),
                            child: Column(
                              children: [
                                Text(
                                  'Available to Withdraw: ',
                                  style: TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      color: primaryColor),
                                ),
                                SizedBox(
                                  height: 5,
                                ),
                                Text(
                                  snapshot.data!.toString() + ' CELO',
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                snapshot.data!.toString() == "0"
                                    ? const TextButton(
                                        child: Text('Withdraw'),
                                        onPressed: null,
                                      )
                                    : Padding(
                                        padding: const EdgeInsets.all(5.0),
                                        child: TextButton(
                                          style: ButtonStyle(
                                            foregroundColor:
                                                MaterialStateProperty.all<
                                                    Color>(Colors.white),
                                            backgroundColor:
                                                MaterialStateProperty.all<
                                                    Color>(primaryColor),
                                            shape: MaterialStateProperty.all<
                                                RoundedRectangleBorder>(
                                              RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(100),
                                              ),
                                            ),
                                          ),
                                          child: Text('Withdraw'),
                                          onPressed: () {
                                            setState(() {
                                              _loading = true;
                                            });
                                            withdraw().then((value) {
                                              setState(() {
                                                _loading = false;
                                              });
                                            });
                                          },
                                        ),
                                      )
                              ],
                            ),
                          ),
                        );
                      } else {
                        return Container();
                      }
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: FutureBuilder(
                      future: getNFTs(),
                      builder: (context, snapshot) {
                        if (snapshot.hasData) {
                          final val = snapshot.data as List<dynamic>;
                          final nfts = val
                              .map((title) => title as Map<String, dynamic>)
                              .toList();
                          if (nfts.length == 0) {
                            return Center(
                              child:
                                  Text('No NFTs published on the marketplace'),
                            );
                          } else {
                            return GridView.count(
                                shrinkWrap: true,
                                physics: ClampingScrollPhysics(),
                                crossAxisCount: 2,
                                childAspectRatio: 1 / 1.1,
                                children: nfts.map((nft) {
                                  return FutureBuilder(
                                      future: getNFT(nft['uri']),
                                      builder: (context, snapshot) {
                                        if (snapshot.hasData) {
                                          final metadata = snapshot.data
                                              as Map<String, dynamic>;
                                          return Padding(
                                            padding: const EdgeInsets.all(5.0),
                                            child: GestureDetector(
                                              child: Container(
                                                decoration: BoxDecoration(
                                                  borderRadius:
                                                      BorderRadius.circular(10),
                                                  color: Colors.white,
                                                  boxShadow: [
                                                    BoxShadow(
                                                      color: Colors.grey
                                                          .withOpacity(0.25),
                                                      spreadRadius: 5,
                                                      blurRadius: 7,
                                                      offset: Offset(1, 3),
                                                    ),
                                                  ],
                                                ),
                                                child: Column(
                                                  children: [
                                                    Expanded(
                                                      child: ClipRRect(
                                                        borderRadius:
                                                            BorderRadius.vertical(
                                                                top: Radius
                                                                    .circular(
                                                                        10)),
                                                        child:
                                                            CachedNetworkImage(
                                                          width:
                                                              double.infinity,
                                                          height:
                                                              double.infinity,
                                                          imageUrl:
                                                              metadata['image'],
                                                          fit: BoxFit.fill,
                                                          placeholder:
                                                              (context, url) {
                                                            return Spacer();
                                                          },
                                                        ),
                                                      ),
                                                    ),
                                                    Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              5.0),
                                                      child: AutoSizeText(
                                                        metadata['title'],
                                                        maxLines: 1,
                                                        overflow: TextOverflow
                                                            .ellipsis,
                                                        minFontSize: 15,
                                                        style: TextStyle(
                                                            fontWeight:
                                                                FontWeight.w700,
                                                            color:
                                                                primaryColor),
                                                      ),
                                                    ),
                                                    Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              5.0),
                                                      child: Text(
                                                        nft['minPrice'] +
                                                            " CELO",
                                                        style: TextStyle(
                                                            fontWeight:
                                                                FontWeight
                                                                    .bold),
                                                      ),
                                                    )
                                                  ],
                                                ),
                                              ),
                                              onTap: () {
                                                Navigator.of(context).push(
                                                  MaterialPageRoute(
                                                    builder: (context) =>
                                                        NFTPage(
                                                      doc: metadata,
                                                      minPrice: nft['minPrice'],
                                                      id: nft['id'],
                                                    ),
                                                  ),
                                                );
                                              },
                                            ),
                                          );
                                        } else {
                                          return Shimmer.fromColors(
                                            baseColor: Colors.grey[300]!,
                                            highlightColor: Colors.grey[100]!,
                                            child: Card(
                                                clipBehavior: Clip.antiAlias,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          10.0),
                                                ),
                                                child: ClipRRect(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          10.0),
                                                )),
                                          );
                                        }
                                      });
                                }).toList());
                          }
                        } else {
                          return Center(child: CircularProgressIndicator());
                        }
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
