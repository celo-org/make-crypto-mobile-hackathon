# Important:

https://stackoverflow.com/questions/35128229/error-no-toolchains-found-in-the-ndk-toolchains-folder-for-abi-with-prefix-llv#:~:text=If%20you%20see%20an%20error,Android%20Studio%203.1%20or%20newer.

# TuRuta notes

Each time you modify/create/delete a file inside the folders api or model, you must run:
```
flutter pub run build_runner watch --delete-conflicting-outputs
```


### About routes

After creating new routes we need to rebuild the app in order to recognize the routes correctly.

### About assets

Sometimes after adding assets (images or icons) we need to rebuild the app in order to be able to use them.


# How to copy POJOs (or value objects) from java

1. Use this website to generate the dart code: http://sma.github.io/stuff/java2dartweb/java2dartweb.html
2. Use this regex to generate the boilerplate in android studio
```
class (\w+)\s*\{([^}]+)\}
```
```
@JsonSerializable(explicitToJson: true)\nclass $1 {\n$2\n  $1();\n\n  factory $1.fromJson(Map json) => _\$$1FromJson(json);\n  Map<String, dynamic> toJson() => _\$$1ToJson(this);\n}
```
3. Generate code, check the first command in this guide.

# BuildConfig.DEBUG equivalent0

import 'package:flutter/foundation.dart' as Foundation;
!Foundation.kReleaseMode

# Debug analytics

Use [this guide](https://support.google.com/firebase/answer/7201382?hl=en&utm_id=ad&authuser=0) and then open the debug view in the [firebase console](https://console.firebase.google.com/u/0/project/tumicro-1203/analytics/app/android:pe.tumicro.android/debugview~2F%3Ft=1576113840389&fpn=341269335857&swu=1&sgu=1&sus=upgraded&cs=app.m.debugview.overview&g=1)

For being able to use debugView in IOS you must build and run the app with xcode.


# Some common IOS problems:

If errors with linker or clang: error: linker command failed with exit code 1, remember this guy forever:
https://github.com/OneSignal/OneSignal-Flutter-SDK/issues/42#issuecomment-459476383

Sometimes vscode doesn't reload code (after I compiled with xcode), so you need to use xcode to compile, debug.

PD: to add libraries just click the "plus" button in xcode and choose the libraries

## The important bits

### `/widgets/search_bar.dart`

An example of how to construct an Cupertino-style search bar. The
Flutter team [is working on an official widget](https://github.com/flutter/flutter/issues/9784)
for this. Once that effort is complete, developers will not need to roll
their own search bars, so to speak.
