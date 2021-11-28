from time import sleep

import boto3
from boto3.dynamodb.conditions import Key

from globals import *


def get_positions(portfolioID, status):
    dynamodb = boto3.resource('dynamodb', region_name="eu-central-1")
    TABLE_NAME = "Position-7wo57xakorbmtdphsb64yisw7u-dev"

    table = dynamodb.Table(TABLE_NAME)

    # When adding a global secondary index to an existing table, you cannot query the index until it has been backfilled.
    # This portion of the script waits until the index is in the “ACTIVE” status, indicating it is ready to be queried.
    while True:
        if not table.global_secondary_indexes or table.global_secondary_indexes[0]['IndexStatus'] != 'ACTIVE':
            print('Waiting for index to backfill...')
            sleep(5)
            table.reload()
        else:
            break

    # When making a Query call, you use the KeyConditionExpression parameter to specify the hash key on which you want
    # to query. If you want to use a specific index, you also need to pass the IndexName in our API call.
    response = table.query(
        # Add the name of the index you want to use in your query.
        IndexName="byPortfolioStatus",
        KeyConditionExpression=Key('portfolioID').eq(portfolioID) & Key('status').eq(status),
    )
    return response["Items"]


def add_yield_to_position(position, tbl):
    dly = position["dailyYield"] / 100
    tot = position["total"]
    gains = dly * tot
    newTotal = tot + gains
    newtInterestAc = position["interestAccrued"] + gains

    resp = tbl.update_item(
        Key={"id": position["id"]},
        ExpressionAttributeNames={
            "#total": "total",
            "#interestAccrued": "interestAccrued",
        },
        ExpressionAttributeValues={
            ":newTotal": newTotal,
            ":newtInterestAc": newtInterestAc,
        },
        UpdateExpression="SET #total=:newTotal, #interestAccrued=:newtInterestAc",
    )
    return resp["ResponseMetadata"], gains


def update_position_status(position, tbl, newstatus):    
    resp = tbl.update_item(
        Key={"id": position["id"]},
        ExpressionAttributeNames={
            "#status": "status",
        },
        ExpressionAttributeValues={
            ":newstatus": newstatus,
        },
        UpdateExpression="SET #status=:newstatus",
    )
    return resp["ResponseMetadata"]


def get_portfolio(portfolioID, tbl):
    resp = tbl.get_item(Key={"id": portfolioID})
    return resp["Item"]


# def save_portfolio_value(portfolio, tbl):
#     response = tbl.put_item(
#         Item={
#             'id': "test",
#             'portfolioID': portfolio["id"],
#             'total': portfolio["total"],
#             'accruedInterest': portfolio["accruedInterest"],
#             'principalInvested': portfolio["principalInvested"]
#         }
#     )
#     return response


def update_value_portfolio(portfolio, amount, tbl):
    newTotal = portfolio["total"] + amount
    newtInterestAc = portfolio["accruedInterest"] + amount

    resp = tbl.update_item(
        Key={"id": portfolio["id"]},
        ExpressionAttributeNames={
            "#total": "total",
            "#accruedInterest": "accruedInterest",
        },
        ExpressionAttributeValues={
            ":newTotal": newTotal,
            ":newtInterestAc": newtInterestAc,
        },
        UpdateExpression="SET #total=:newTotal, #accruedInterest=:newtInterestAc",
    )
    return resp["ResponseMetadata"]


def update_user_positions_and_portfolio(portfolioID):
    dynamodb = boto3.resource('dynamodb', region_name="eu-central-1")

    results = get_positions(portfolioID, 'OPENED')
    tbl = dynamodb.Table(POSITION_TABLE_NAME)
    total_gains = 0

    for elm in results:
        resp, gains = add_yield_to_position(elm, tbl)
        if resp["HTTPStatusCode"] == 200:
            total_gains += gains

    tbl_portfolio = dynamodb.Table(PORTFOLIO_TABLE_NAME)
    portfolio = get_portfolio(portfolioID, tbl_portfolio)
    resp = update_value_portfolio(portfolio, total_gains, tbl_portfolio)
    return resp


def update_all_portfolios():
    dynamodb = boto3.resource('dynamodb', region_name="eu-central-1")
    table = dynamodb.Table(PORTFOLIO_TABLE_NAME)
    response = table.scan()
    data = response['Items']
    for elm in data:
        update_user_positions_and_portfolio(elm["id"])
        print(f"Done {elm['id']}")

    print("END update portfolios")


def get_pendingOffer(portfolioID, status):
    dynamodb = boto3.resource('dynamodb', region_name="eu-central-1")
    TABLE_NAME = "PendingOffer-7wo57xakorbmtdphsb64yisw7u-dev"
    table = dynamodb.Table(TABLE_NAME)

    while True:
        if not table.global_secondary_indexes or table.global_secondary_indexes[0]['IndexStatus'] != 'ACTIVE':
            print('Waiting for index to backfill...')
            sleep(5)
            table.reload()
        else:
            break

    response = table.query(
        IndexName="byPortfolioStatus",
        KeyConditionExpression=Key('portfolioID').eq(portfolioID) & Key('status').eq(status),
    )
    return response["Items"]


def print_pendingOffer(PORTFOLIO_ID):
    results2 = get_pendingOffer(PORTFOLIO_ID, "TO CONFIRM")
    for elm in results2:
        print(elm)
    results2 = get_pendingOffer(PORTFOLIO_ID, "PENDING")
    for elm in results2:
        print(elm)
    print("---")


def get_deposit(depositorID):
    dynamodb = boto3.resource('dynamodb', region_name="eu-central-1")
    TABLE_NAME = "Deposit-7wo57xakorbmtdphsb64yisw7u-dev"
    table = dynamodb.Table(TABLE_NAME)

    while True:
        if not table.global_secondary_indexes or table.global_secondary_indexes[0]['IndexStatus'] != 'ACTIVE':
            print('Waiting for index to backfill...')
            sleep(5)
            table.reload()
        else:
            break

    response = table.query(
        IndexName="byIban",
        KeyConditionExpression=Key('depositorID').eq(depositorID),
    )
    return response["Items"]
