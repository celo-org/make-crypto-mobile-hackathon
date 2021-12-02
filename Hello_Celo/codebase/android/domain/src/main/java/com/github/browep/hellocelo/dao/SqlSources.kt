package com.github.browep.hellocelo.dao

const val CREATE_POSTS_TABLE = """
    CREATE TABLE "posts" (
	"userName"	TEXT NOT NULL,
	"timestamp"	INTEGER NOT NULL,
	"message"	TEXT,
	"metaData"	TEXT,
	"uuid"      TEXT NOT NULL UNIQUE
);
"""

const val CREATE_INDEX_USER_NAME_TIMESTAMP =  """
    CREATE INDEX "userName_timestamp_index" ON "posts" (
	"timestamp"	DESC,
	"userName"	ASC
);
"""

const val CREATE_INDEX_TIMESTAMP = """
    CREATE INDEX "timestamp_index" ON "posts" (
	"timestamp"	DESC
);
"""

const val CREATE_USERS_TABLE = """
    CREATE TABLE "users" (
	"userName"	TEXT NOT NULL UNIQUE,
	"metaData"	TEXT,
	PRIMARY KEY("userName")
);
"""

val SQL_SOURCES = listOf(CREATE_POSTS_TABLE, CREATE_INDEX_USER_NAME_TIMESTAMP, CREATE_INDEX_TIMESTAMP, CREATE_USERS_TABLE)