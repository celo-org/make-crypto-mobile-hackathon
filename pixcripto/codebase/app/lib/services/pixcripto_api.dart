import 'package:dio/dio.dart';

class PixCriptoAPI {
  late Dio dio;

  PixCriptoAPI() {
    BaseOptions options = new BaseOptions(
      baseUrl: "https://celounidade.herokuapp.com/v1",
      connectTimeout: 5000,
    );

    this.dio = new Dio(options);
  }
}
