#utils for debugging dependency problems and method/class not found exceptions

./gradlew tumicro:dependencies > dep.txt

# for buildscripts dependencies
./gradlew buildEnvironment > depsBuildRoot.txt
./gradlew tumicro:buildEnvironment > depsBuild.txt

# generating a swagger api
./gradlew tumicro:generateTaxiarrivalClientApi --stacktrace
