import 'package:dio/dio.dart';
import 'package:pixcripto/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PixCriptoAPI {
  final SharedPreferences sharedPreferences;
  late Dio dio;

  PixCriptoAPI(this.sharedPreferences) {
    BaseOptions options = new BaseOptions(
      baseUrl: "https://celounidade.herokuapp.com/v1",
      connectTimeout: 5000,
    );

    this.dio = new Dio(options);

    this.dio.interceptors.add(
          InterceptorsWrapper(
            onRequest: (options, handler) {
              options.headers['authorization'] =
                  this.sharedPreferences.getString(LocalStorageKeys.jwt);
              return handler.next(options); //continue
            },
            onResponse: (response, handler) {
              return handler.next(response); // continue
            },
            onError: (DioError e, handler) {
              return handler.next(e); //continue
            },
          ),
        );
  }
}
