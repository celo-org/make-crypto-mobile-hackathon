import json
import pathlib
import timeit
from pprint import pprint

import pandas as pd
from tabulate import tabulate

from cadCAD.configuration import Experiment
from cadCAD.engine import ExecutionMode, ExecutionContext, Executor
from testing.tests.a_b_tests import param_sweep
from testing.models import policy_aggregation

exp = Experiment()
exp.append_model(
    model_id="sys_model_A",
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
# exp.append_model(
#     model_id="sys_model_B",
#     sim_configs=policy_aggregation.sim_config,
#     initial_state=policy_aggregation.genesis_states,
#     partial_state_update_blocks=policy_aggregation.partial_state_update_block,
#     policy_ops=[lambda a, b: a + b, lambda y: y * 2] # Default: lambda a, b: a + b
# )

exec_mode = ExecutionMode()
local_mode_ctx = ExecutionContext(context=exec_mode.local_mode)
simulation = Executor(exec_context=local_mode_ctx, configs=exp.configs)

# duration = timeit.Timer(simulation.execute).timeit(number=1)
# print(duration)
# # print(len(exp.configs))
# # pprint(param_sweep.sim_config)
# print(len(exp.configs))
# print(len(param_sweep_0_4_24.sim_config))

raw_result, _, _ = simulation.execute()
result = pd.DataFrame(raw_result)
# print(tabulate(result, headers='keys', tablefmt='psql'))
duration = timeit.Timer(simulation.execute).timeit(number=1)
file_path = pathlib.Path(__file__).parent.absolute()
with open(f'{file_path}/0_4_24_performance.json', 'w') as json_file:
    performance = {'duration_sec': duration, 'record_count': len(raw_result)}
    json.dump(performance, json_file)

print(tabulate(result, headers='keys', tablefmt='psql'))