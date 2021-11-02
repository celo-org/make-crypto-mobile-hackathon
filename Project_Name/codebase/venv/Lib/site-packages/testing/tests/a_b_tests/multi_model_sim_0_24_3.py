import pathlib
import timeit
from pprint import pprint

import pandas as pd
import json
from tabulate import tabulate

from cadCAD import configs
from cadCAD.configuration import Experiment
from cadCAD.engine import ExecutionMode, ExecutionContext, Executor
from testing.models import param_sweep, policy_aggregation


del configs[:]
exp = Experiment()
exp.append_configs(
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
exp.append_model(
    model_id="sys_model_B",
    sim_configs=param_sweep.sim_config,
    initial_state=param_sweep.genesis_states,
    env_processes=param_sweep.env_process,
    partial_state_update_blocks=param_sweep.partial_state_update_blocks
)
exp.append_model(
    model_id="sys_model_C",
    sim_configs=policy_aggregation.sim_config,
    initial_state=policy_aggregation.genesis_states,
    partial_state_update_blocks=policy_aggregation.partial_state_update_block,
    policy_ops=[lambda a, b: a + b, lambda y: y * 2] # Default: lambda a, b: a + b
)


exec_mode = ExecutionMode()
local_mode_ctx = ExecutionContext(context=exec_mode.local_mode)
simulation = Executor(exec_context=local_mode_ctx, configs=configs)

raw_result, _, _ = simulation.execute()
duration = timeit.Timer(simulation.execute).timeit(number=1)
file_path = pathlib.Path(__file__).parent.absolute()
with open(f'{file_path}/0_4_23_performance.json', 'w') as json_file:
    performance = {'duration_sec': duration, 'record_count': len(raw_result)}
    json.dump(performance, json_file)




# print(duration)
# # print()
# print(len(configs))
# print(len(param_sweep.sim_config))
# # pprint(configs)
# for c in configs:
#     print()
#     pprint(c.__dict__)


result = pd.DataFrame(raw_result)
# print(len(raw_result))
# print(len(result.index))
print(tabulate(result, headers='keys', tablefmt='psql'))
# help(exp.append_configs)
# pprint(param_sweep.sim_config)