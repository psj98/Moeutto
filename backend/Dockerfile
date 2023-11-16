FROM adoptopenjdk/openjdk11
EXPOSE 8081
ARG JAR_FILE=build/libs/moeutto-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# Tomcat에서 blocking issue 때문에
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
