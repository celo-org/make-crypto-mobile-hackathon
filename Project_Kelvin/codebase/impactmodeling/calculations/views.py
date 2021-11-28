from django.http import HttpResponse
from cadCAD.configuration import Experiment
from cadCAD.engine import ExecutionMode, ExecutionContext, Executor
from scipy.stats import norm
import numpy as np
from impactmodeling.utils import db
from django.views.decorators.csrf import csrf_exempt
import json


TOTAL_RANDOM_SAMPLES = 100000

def index(request):
    return HttpResponse("Hello, world. You're at the calculations index.")

@csrf_exempt
def model(request):

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = body["user"]
    proposal_id = body["proposal_id"]
    param1 = body["param1"]
    operator = body["operator"]
    param2 = body["param2"]
    collection = body["collection"]

    if isinstance(param1, str) and param1.__contains__(","):
        param1 = param1.split(",")
    if isinstance(param2, str) and param2.__contains__(","):
        param2 = param2.split(",")

    def generate_mean_stddev(lower_bound, upper_bound):
        lower_bound = float(lower_bound)
        upper_bound = float(upper_bound)
        mean = lower_bound + ((upper_bound - lower_bound)/2.0)
        stddev = np.sqrt(TOTAL_RANDOM_SAMPLES) * (upper_bound - lower_bound)/3.29
        return mean, stddev


    init_state = {
        "average_result": 0
    }

    lists_of_samples = [None, None]

    loc1 = None
    loc2 = None
    scale1 = None
    scale2 = None

    if isinstance(param1, list):
        loc1, scale1 = generate_mean_stddev(param1[0], param1[1])
    if isinstance(param2, list):
        loc2, scale2 = generate_mean_stddev(param2[0], param2[1])

    exp = Experiment()

    def take_a_sample(_params, substep, sH, s, _input, **kwargs):
        current_avg = s["average_result"]
        leftValue = float(param1) if loc1 == None else norm.rvs(loc=loc1, scale=scale1)
        rightValue = float(param2) if loc2 == None else norm.rvs(loc=loc2, scale=scale2)
        if operator == "+":
            current_avg += (leftValue + rightValue)/TOTAL_RANDOM_SAMPLES
        elif operator == "-":
            current_avg += (leftValue - rightValue)/TOTAL_RANDOM_SAMPLES
        elif operator == "*":
            current_avg += (leftValue * rightValue)/TOTAL_RANDOM_SAMPLES
        elif operator == "/":
            current_avg += (leftValue/ rightValue)/TOTAL_RANDOM_SAMPLES
        return "average_result", current_avg

    PSUBs = [{"policies": {}, "variables" : {"s_1": take_a_sample}}]

    exp.append_model(initial_state=init_state,partial_state_update_blocks=PSUBs, policy_ops=[lambda _: None], sim_configs=[{'N': 1, 'T': range(TOTAL_RANDOM_SAMPLES), 'M': []}])

    exec_mode = ExecutionMode()
    local_mode_ctx = ExecutionContext(context=exec_mode.local_mode)
    simulation = Executor(exec_context=local_mode_ctx, configs=exp.configs)
    raw_system_events, tensor_field, sessions = simulation.execute()
    final_result = raw_system_events[len(raw_system_events) - 1]['average_result']
    db.models.update_one({"user": user, "proposalId": proposal_id, "collection": collection}, {"$set": {"user": user, "proposalId": proposal_id, "score": final_result, "collection": collection}}, True)
    print(final_result)
    return HttpResponse(final_result)